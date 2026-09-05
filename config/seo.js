const path = require('path');

const DEFAULT_SITE_URL = process.env.PUBLIC_SITE_URL || 'https://mcrexcel.vercel.app';

/**
 * Metadata configuration for all public pages
 */
const pageMetadata = {
  home: {
    title: 'Mumbai Central Cha Raja | Official Ganeshotsav Mandal, Mumbai',
    description: 'Official Portal of Mumbai Central Cha Raja - Belasis Road, B.I.T. Chawl Sarvajanik Shri Ganeshotsav Mandal (Est. 1929). Live Darshan, 10-day event schedule, 80G tax exempt online donation & social work.',
    path: '/'
  },
  about: {
    title: 'Mumbai Central Cha Raja | Mandal History & Legacy (Est. 1929)',
    description: 'Discover the 98-year glorious history of Belasis Road, B.I.T. Chawl Sarvajanik Shri Ganeshotsav Mandal, established in 1929. Highlighted by Swatantra Veer Savarkar and freedom struggle heritage.',
    path: '/about'
  },
  schedule: {
    title: 'Mumbai Central Cha Raja | Ganeshotsav 2026 Schedule & Aarti Timings',
    description: 'Official 10-Day Ganeshotsav 2026 Event Schedule for Mumbai Central Cha Raja starting 12th September 2026. Daily Maha Aarti timings (8:00 AM & 8:00 PM), Visarjan Miravand & cultural programs.',
    path: '/schedule'
  },
  glimpses: {
    title: 'Mumbai Central Cha Raja | 10-Year Photo Archive & Glimpses (2015–2025)',
    description: 'Explore the 10-year historical photo gallery and glimpses of Mumbai Central Cha Raja from 2015 to 2025. Iconic idol photos, Aagman Sohala, and cultural celebrations.',
    path: '/glimpses'
  },
  socialwork: {
    title: 'Mumbai Central Cha Raja | Social Work & Community Welfare Seva',
    description: 'Mandal social work initiatives including annual Blood Donation drives, free Health Checkup camps, Educational Student Scholarships, and Environmental Awareness drives by Mumbai Central Cha Raja.',
    path: '/social-work'
  },
  committee: {
    title: 'Mumbai Central Cha Raja | Executive Committee & Office Bearers',
    description: 'Meet the executive committee office bearers of Belasis Road, B.I.T. Chawl Sarvajanik Shri Ganeshotsav Mandal leading Mandal administration and devotee services.',
    path: '/committee'
  },
  memories: {
    title: 'Mumbai Central Cha Raja | Memories & Notable Personalities',
    description: 'Cherished memories and notable national personalities who visited Mumbai Central Cha Raja including Swatantra Veer Savarkar, Lata Mangeshkar, Balasaheb Thackeray, and Sachin Tendulkar.',
    path: '/memories'
  },
  contact: {
    title: 'Mumbai Central Cha Raja | Mandap Location, Contact & Google Maps',
    description: 'Mandap address and contact details for Mumbai Central Cha Raja (Belasis Road, B.I.T. Chawl, Mumbai - 400008). Official phone numbers, help desk, and embedded Google Maps directions.',
    path: '/contact'
  },
  tshirt: {
    title: 'Mumbai Central Cha Raja | Official T-Shirt Store & Pickup Tokens',
    description: 'Book official Mumbai Central Cha Raja T-Shirts & Mandal Merchandise. Secure online payment with instant downloadable PDF pickup tokens for mandap counter collection.',
    path: '/tshirt'
  },
  donate: {
    title: 'Mumbai Central Cha Raja | Online 80G Tax Exempt Donation Portal',
    description: 'Support Mandal Seva & Social Welfare. Donate online securely to Mumbai Central Cha Raja with instant downloadable 80G tax exemption PDF receipt (Reg No: A/3141/Mumbai/77).',
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
  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'NGO',
    '@id': `${siteUrl}/#organization`,
    'name': 'Belasis Road, B.I.T. Chawl Sarvajanik Shri Ganeshotsav Mandal',
    'alternateName': 'Mumbai Central Cha Raja',
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

  const eventSchema = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    '@id': `${siteUrl}/#event-2026`,
    'name': 'Mumbai Central Cha Raja Ganeshotsav 2026',
    'startDate': '2026-09-12T12:00:00+05:30',
    'endDate': '2026-09-23T22:00:00+05:30',
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

  return JSON.stringify([orgSchema, eventSchema, breadcrumbSchema]);
}

module.exports = {
  pageMetadata,
  getSiteUrl,
  getJsonLdSchemas,
  DEFAULT_SITE_URL
};
