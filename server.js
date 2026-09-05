const express = require('express');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const db = require('./config/db');
const { initCronJobs } = require('./config/cron');

const indexRoutes = require('./routes/indexRoutes');
const donationRoutes = require('./routes/donationRoutes');
const adminRoutes = require('./routes/adminRoutes');
const excelRoutes = require('./routes/excelRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Ensure directories exist
['views', 'public', 'receipts', 'logs', 'modules'].forEach(dir => {
  const dirPath = path.join(__dirname, dir);
  try {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  } catch (err) {}
});

// View Engine Setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const seo = require('./config/seo');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// SEO & i18n Middleware
app.use((req, res, next) => {
  let lang = 'en';
  const cookieHeader = req.headers.cookie || '';
  const match = cookieHeader.match(/mcc_lang=(mr|en)/);
  if (match) {
    lang = match[1];
  } else if (req.query.lang === 'mr' || req.query.lang === 'en') {
    lang = req.query.lang;
  }
  res.locals.lang = lang;

  const siteUrl = seo.getSiteUrl(req);
  res.locals.siteUrl = siteUrl;
  res.locals.canonicalUrl = `${siteUrl}${req.path === '/' ? '' : req.path}`;
  res.locals.seo = seo;
  next();
});

// Ensure DB is initialized (crucial for Serverless environments like Vercel)
app.use(async (req, res, next) => {
  await db.initDB();
  next();
});

// Dynamic robots.txt
app.get('/robots.txt', (req, res) => {
  const siteUrl = res.locals.siteUrl;
  res.type('text/plain');
  res.send(`User-agent: *
Allow: /

# Private Administration & Data Export Endpoints
Disallow: /admin
Disallow: /admin/*
Disallow: /api/*
Disallow: /download-*

Sitemap: ${siteUrl}/sitemap.xml
`);
});

// Dynamic XML Sitemap
app.get('/sitemap.xml', (req, res) => {
  const siteUrl = res.locals.siteUrl;
  const lastmod = '2026-08-31';
  
  const publicPaths = [
    { path: '/', priority: '1.0', changefreq: 'daily' },
    { path: '/about', priority: '0.9', changefreq: 'monthly' },
    { path: '/schedule', priority: '0.9', changefreq: 'weekly' },
    { path: '/glimpses', priority: '0.8', changefreq: 'monthly' },
    { path: '/social-work', priority: '0.8', changefreq: 'monthly' },
    { path: '/committee', priority: '0.7', changefreq: 'monthly' },
    { path: '/memories', priority: '0.7', changefreq: 'monthly' },
    { path: '/contact', priority: '0.8', changefreq: 'monthly' },
    { path: '/tshirt', priority: '0.8', changefreq: 'weekly' },
    { path: '/donate', priority: '0.9', changefreq: 'weekly' }
  ];

  const urlsXml = publicPaths.map(p => `  <url>
    <loc>${siteUrl}${p.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join('\n');

  res.type('application/xml');
  res.send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlsXml}
</urlset>`);
});

// Mount Routes
app.use('/', indexRoutes);
app.use('/', donationRoutes);
app.use('/', adminRoutes);
app.use('/', excelRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err.stack);
  res.status(500).send(`
    <div style="font-family: sans-serif; padding: 40px; text-align: center;">
      <h2>Ganpati Bappa Morya - Server Encountered an Unexpected Issue</h2>
      <p style="color: #64748b;">${err.message}</p>
      <a href="/" style="display: inline-block; margin-top: 15px; background: #800020; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 6px;">Return to Home</a>
    </div>
  `);
});

// 404 Handler
app.use((req, res) => {
  res.status(404).render('index', {
    title: '404 - Page Not Found | Mumbai Central Cha Raja',
    activeTab: 'home',
    yatraStatus: db.getYatraStatus(),
    scheduleData: [],
    glimpsesData: [],
    socialWorkData: []
  });
});

// Export Express app for Vercel Serverless Functions
module.exports = app;

// Start Server & Database when running locally
if (process.env.VERCEL !== '1') {
  app.listen(PORT, async () => {
    console.log(`=======================================================`);
    console.log(`🌺 Mumbai Central Cha Raja Official Web Server Started`);
    console.log(`🌐 URL: http://localhost:${PORT}`);
    console.log(`=======================================================`);
    
    await db.initDB();
    initCronJobs();
  });
}
