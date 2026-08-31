const express = require('express');
const router = express.Router();
const yatraController = require('../controllers/yatraController');
const tshirtController = require('../controllers/tshirtController');
const seo = require('../config/seo');

// Home & About Routes
router.get('/', yatraController.renderHomePage);
router.get('/about', yatraController.renderAboutPage);

// Festival Schedule & API Routes
router.get('/schedule', yatraController.renderSchedulePage);
router.get('/api/live-status', yatraController.getLiveStatusApi);

// Glimpses & Decade Gallery Combined
router.get('/glimpses', yatraController.renderGlimpsesPage);
router.get('/photo-booth', (req, res) => res.redirect(301, '/glimpses'));

// Memories & Notable Personalities
router.get('/memories', (req, res) => {
  res.render('memories', {
    title: seo.pageMetadata.memories.title,
    description: seo.pageMetadata.memories.description,
    activeTab: 'memories'
  });
});

// Social Work Page (Separate Page & Photos)
router.get('/social-work', yatraController.renderSocialWorkPage);

// Executive Committee Page (Public - Separate from Admin Login)
router.get('/committee', yatraController.renderCommitteePage);

// Contact Us Page (With Embedded Google Maps)
router.get('/contact', (req, res) => {
  res.render('contact', {
    title: seo.pageMetadata.contact.title,
    description: seo.pageMetadata.contact.description,
    activeTab: 'contact'
  });
});
router.post('/api/contact', yatraController.submitContactForm);

// Official T-Shirt Booking Routes (Renamed from Tshirt Store)
router.get('/tshirt', tshirtController.renderTshirtPage);
router.post('/tshirt/create-order', tshirtController.createPaymentOrder);
router.post('/tshirt/confirm', tshirtController.confirmTshirtOrder);
router.get('/download-tshirt-receipt/:receiptNo', tshirtController.downloadTshirtReceipt);

module.exports = router;
