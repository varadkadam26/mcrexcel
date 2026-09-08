const path = require('path');

const DEFAULT_SITE_URL = process.env.PUBLIC_SITE_URL || 'https://mumbaicentralcharaja.com';

/**
 * Metadata configuration for all public pages
 */
const pageMetadata = {
  home: {
    title: 'Mumbai Central Cha Raja | Mumbai Central Ganpati & Ganeshotsav 2026',
    description: 'Official Portal of Mumbai Central Cha Raja - Belasis Road, B.I.T. Chawl Sarvajanik Shri Ganeshotsav Mandal (Est. 1929). Live Darshan, 10-day Ganeshotsav schedule, photo archive, online donations & social work.',
    path: '/'
  },
  about: {
    title: 'About Us | Mumbai Central Cha Raja (Est. 1929) History & Savarkar Heritage',
    description: 'Discover the 98-year glorious history of Belasis Road, B.I.T. Chawl Sarvajanik Shri Ganeshotsav Mandal, established in 1929 under Swatantra Veer Savarkar\'s presidency and blessings.',
    path: '/about'
  },
  schedule: {
    title: 'Ganeshotsav 2026 Schedule & Aarti Timings | Mumbai Central Cha Raja',
    description: 'Official 10-Day Ganeshotsav 2026 event schedule for Mumbai Central Cha Raja starting 12th September 2026. Daily Maha Aarti timings (8:00 AM & 8:00 PM), Visarjan Miravand & cultural programs.',
    path: '/schedule'
  },
  glimpses: {
    title: '10-Year Photo Archive & Glimpses | Mumbai Central Cha Raja',
    description: 'Explore the 10-year historical photo gallery and glimpses of Mumbai Central Cha Raja from 2015 to 2025. Iconic idol photos, Aagman Sohala, and Ganeshotsav celebrations.',
    path: '/glimpses'
  },
  socialwork: {
    title: 'Social Work & Community Welfare Seva | Mumbai Central Cha Raja',
    description: 'Mandal social work initiatives including annual Blood Donation drives, free Health Checkup camps, Educational Scholarships, and Tribal Relief by Mumbai Central Cha Raja.',
    path: '/social-work'
  },
  committee: {
    title: 'Executive Committee & Office Bearers | Mumbai Central Cha Raja',
    description: 'Meet the executive committee office bearers of Belasis Road, B.I.T. Chawl Sarvajanik Shri Ganeshotsav Mandal leading Mandal administration and devotee services for 2026-2027.',
    path: '/committee'
  },
  memories: {
    title: 'Historical Memories & Notable Personalities | Mumbai Central Cha Raja',
    description: 'Cherished historical memories and national personalities who visited Mumbai Central Cha Raja, including Swatantra Veer Savarkar, Lata Mangeshkar, Balasaheb Thackeray, and Sachin Tendulkar.',
    path: '/memories'
  },
  contact: {
    title: 'Contact Us & Mandap Location Maps | Mumbai Central Cha Raja',
    description: 'Mandap address and contact details for Mumbai Central Cha Raja (Belasis Road, B.I.T. Chawl, Mumbai - 400008). Official phone numbers (+91 76666 95958), help desk, and embedded Google Maps directions.',
    path: '/contact'
  },
  tshirt: {
    title: 'Official T-Shirt Store & Pickup Tokens | Mumbai Central Cha Raja',
    description: 'Book official Mumbai Central Cha Raja T-Shirts & Mandal Merchandise. Secure online payment with instant downloadable PDF pickup tokens for mandap counter collection.',
    path: '/tshirt'
  },
  donate: {
    title: 'Online Donation & Seva Receipt Portal | Mumbai Central Cha Raja',
    description: 'Support Mandal Seva & Social Welfare. Donate online securely to Mumbai Central Cha Raja with instant downloadable PDF receipt (Reg No: A/3141/Mumbai/77).',
    path: '/donate'
  }
};

/**
 * Get dynamic site URL based on environment configuration
 */
function getSiteUrl(req) {
  if (process.env.PUBLIC_SITE_URL) {
    return process.env.PUBLIC_SITE_URL.replace(/\/$/, '');
  }
  if (req) {
    const protocol = req.headers['x-forwarded-proto'] || req.protocol || 'https';
    const host = req.headers['x-forwarded-host'] || req.headers.host;
    if (host && !host.includes('localhost') && !host.includes('127.0.0.1')) {
      return `${protocol}://${host}`;
    }
  }
  return DEFAULT_SITE_URL;
}

/**
 * Generate Structured JSON-LD Schemas for Schema.org validation
 */
function getJsonLdSchemas(siteUrl, pageKey = 'home') {
  const webSiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    'url': siteUrl,
    'name': 'Mumbai Central Cha Raja',
    'alternateName': 'मुंबई सेंट्रलचा राजा',
    'publisher': {
      '@id': `${siteUrl}/#organization`
    },
    'inLanguage': ['en-IN', 'mr-IN']
  };

  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'NGO'],
    '@id': `${siteUrl}/#organization`,
    'name': 'Belasis Road, B.I.T. Chawl Sarvajanik Shri Ganeshotsav Mandal',
    'alternateName': ['Mumbai Central Cha Raja', 'मुंबई सेंट्रलचा राजा', 'Mumbai Central Ganpati Mandal'],
    'url': siteUrl,
    'logo': {
      '@type': 'ImageObject',
      'url': `${siteUrl}/images/logo.png`,
      'width': 200,
      'height': 200
    },
    'image': `${siteUrl}/images/raja_real_1.png`,
    'foundingDate': '1929',
    'identifier': 'A/3141/Mumbai/77',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'BIT Chawl Belasis Road Sarvajanik Shree Ganeshutsav Mandal, Mumbai Central Cha Raja Sabhagruh',
      'addressLocality': 'Mumbai',
      'addressRegion': 'Maharashtra',
      'postalCode': '400008',
      'addressCountry': 'IN'
    },
    'telephone': ['+917666695958', '+919967638687'],
    'email': 'mumbaicentralcharaja@gmail.com',
    'sameAs': [
      'https://www.instagram.com/mumbaicentralcharajaofficial',
      'https://www.youtube.com/channel/UCrijB5WpQhGLfWQT1WSySNg',
      'https://mumbaicharaja.co/'
    ]
  };

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${siteUrl}/#place`,
    'name': 'Mumbai Central Cha Raja Mandap',
    'url': siteUrl,
    'telephone': '+917666695958',
    'image': `${siteUrl}/images/raja_real_1.png`,
    'priceRange': 'Free / Devotional',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'BIT Chawl Belasis Road, Mumbai Central',
      'addressLocality': 'Mumbai',
      'addressRegion': 'Maharashtra',
      'postalCode': '400008',
      'addressCountry': 'IN'
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': 18.9669,
      'longitude': 72.8230
    }
  };

  const eventSchema = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    '@id': `${siteUrl}/#event-2026`,
    'name': 'Mumbai Central Cha Raja Ganeshotsav 2026',
    'startDate': '2026-09-12T16:00:00+05:30',
    'endDate': '2026-09-25T22:00:00+05:30',
    'eventStatus': 'https://schema.org/EventScheduled',
    'eventAttendanceMode': 'https://schema.org/MixedEventAttendanceMode',
    'location': {
      '@type': 'Place',
      'name': 'Mumbai Central Cha Raja Mandap',
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': 'BIT Chawl Belasis Road Sarvajanik Shree Ganeshutsav Mandal, Mumbai Central Cha Raja Sabhagruh',
        'addressLocality': 'Mumbai',
        'postalCode': '400008',
        'addressCountry': 'IN'
      },
      'geo': {
        '@type': 'GeoCoordinates',
        'latitude': 18.9669,
        'longitude': 72.8230
      }
    },
    'image': [`${siteUrl}/images/raja_real_1.png`],
    'description': 'Grand 98th Year Ganeshotsav Celebration of Mumbai Central Cha Raja. Live Aarti, Cultural Darshan, and Social Welfare.',
    'organizer': {
      '@type': 'Organization',
      'name': 'Belasis Road, B.I.T. Chawl Sarvajanik Shri Ganeshotsav Mandal',
      'url': siteUrl
    }
  };

  const meta = pageMetadata[pageKey] || pageMetadata.home;
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Home',
        'item': siteUrl
      },
      ...(meta.path !== '/' ? [{
        '@type': 'ListItem',
        'position': 2,
        'name': meta.title.split('|')[0].trim(),
        'item': `${siteUrl}${meta.path}`
      }] : [])
    ]
  };

  const schemas = [webSiteSchema, orgSchema, localBusinessSchema, eventSchema, breadcrumbSchema];

  // Add FAQ schema for Contact, Schedule, or Home pages
  if (pageKey === 'contact' || pageKey === 'home' || pageKey === 'schedule') {
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': 'Where is Mumbai Central Cha Raja mandap located?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Mumbai Central Cha Raja mandap is located at Belasis Road, B.I.T. Chawl, Mumbai Central, Mumbai, Maharashtra 400008.'
          }
        },
        {
          '@type': 'Question',
          'name': 'What are the daily Aarti timings during Ganeshotsav?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Daily Maha Aarti is performed twice every day: Morning Aarti at 8:00 AM and Evening Maha Aarti at 8:00 PM.'
          }
        },
        {
          '@type': 'Question',
          'name': 'When are the Ganeshotsav 2026 festival dates for Mumbai Central Cha Raja?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Grand Aagman is on 12th September 2026 (4:00 PM), Shri Pranpratishtha is on 14th September 2026, and Visarjan procession is on 25th September 2026.'
          }
        },
        {
          '@type': 'Question',
          'name': 'How can devotees donate online to Mumbai Central Cha Raja?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Devotees can donate online securely via UPI QR Code or direct Bank of India transfer with instant downloadable official PDF receipts.'
          }
        }
      ]
    };
    schemas.push(faqSchema);
  }

  return JSON.stringify(schemas);
}

module.exports = {
  pageMetadata,
  getSiteUrl,
  getJsonLdSchemas,
  DEFAULT_SITE_URL
};
