const db = require('../config/db');

// Ganeshotsav Event Schedule Data for Mumbai Central Cha Raja
const scheduleData = [
  {
    day: 1,
    title: 'Padya Pujan & Mandal Sankalp Sohala',
    date: 'Day 1 (Ganeshotsav Countdown)',
    halt_location: 'BIT Chawl Central Ground, Mumbai Central',
    facilities: ['Vedic Mantra Chanting', 'Floral Arch Decoration', 'Modak Prasad Distribution'],
    emergency_contact: '+91 98765 11111'
  },
  {
    day: 2,
    title: 'Grand Aagman Sohala (Arrival Procession)',
    date: 'Day 2 (Aagman Day)',
    halt_location: 'Belasis Road to BIT Chawl Mandap',
    facilities: ['Nashik Dhol & Tasha Pathak', 'Gulal & Flower Rain', 'Security & Crowd Assistance'],
    emergency_contact: '+91 98765 22222'
  },
  {
    day: 3,
    title: 'Pratishthapana & First Maha Aarti',
    date: 'Day 3 (Ganesh Chaturthi)',
    halt_location: 'Mumbai Central Cha Raja Royal Mandap',
    facilities: ['Morning 8:00 AM Aarti', 'General Darshan Queue', 'Evening 8:00 PM Maha Aarti'],
    emergency_contact: '+91 98765 33333'
  },
  {
    day: 4,
    title: 'Annadan Mahaprasad Seva',
    date: 'Day 4',
    halt_location: 'BIT Chawl Seva Ground',
    facilities: ['Hot Mahaprasad Meals', 'Drinking Water Booths', 'Medical First Aid Desk'],
    emergency_contact: '+91 98765 44444'
  },
  {
    day: 5,
    title: 'Cultural & Bhajan Sandhya',
    date: 'Day 5',
    halt_location: 'Cultural Stage, BIT Chawl Complex',
    facilities: ['Traditional Folk Performances', 'Karyakarta Assistance Desk', 'Wheelchair Support'],
    emergency_contact: '+91 98765 55555'
  },
  {
    day: 6,
    title: 'Special Health & Blood Donation Camp',
    date: 'Day 6',
    halt_location: 'Community Hall, Mumbai Central',
    facilities: ['Free Health Checkup', 'Blood Donation Drive', 'Devotee Welfare Desk'],
    emergency_contact: '+91 98765 66666'
  },
  {
    day: 7,
    title: 'Gauri Ganpati Visarjan & Evening Aarti',
    date: 'Day 7',
    halt_location: 'Royal Mandap Stage',
    facilities: ['Special Flower Decoration', 'Prasad Distribution', '24/7 Security Patrol'],
    emergency_contact: '+91 98765 77777'
  },
  {
    day: 8,
    title: 'Grand Deepotsav & Chappan Bhog',
    date: 'Day 8',
    halt_location: 'Mumbai Central Cha Raja Garbhagriha',
    facilities: ['1008 Diya Deepotsav', 'Traditional Bhog Offering', 'Live Camera Stream Desk'],
    emergency_contact: '+91 98765 88888'
  },
  {
    day: 9,
    title: 'Senior Citizen & Child Special Darshan',
    date: 'Day 9',
    halt_location: 'Mandap Main Entrance',
    facilities: ['Priority Senior Queue', 'Assisted Shuttle', 'Emergency Ambulance'],
    emergency_contact: '+91 98765 99999'
  },
  {
    day: 10,
    title: 'Anant Chaturdashi Uttarpuja & Visarjan Miravand',
    date: 'Day 10 (Grand Farewell)',
    halt_location: 'Mumbai Central to Girgaon Chowpatty',
    facilities: ['Grand Procession Chariot', 'Lifeguard Team', 'Girgaon Visarjan Seva'],
    emergency_contact: '+91 98765 00000'
  }
];

// Glimpses over a Decade (10+ Years Historical Retrospective Data)
const glimpsesData = [
  {
    year: '2025',
    category: 'idols',
    title: 'काष्ठ सिंहासन व राजेशाही सुवर्ण शृंगार (Royal Wooden Throne)',
    theme: 'Peshwa Era Palace Mandap Architecture',
    height: '18 Feet',
    artist: 'Master Sculptor Shri Santosh Kambli',
    image: '/images/raja_real_1.png',
    desc: 'The magnificent wooden throne form dressed in royal pink and maroon silk robes.'
  },
  {
    year: '2024',
    category: 'idols',
    title: 'सुवर्ण सिंहासन व तेज:पुंज पीत पितांबर (Golden Throne)',
    theme: 'Golden Temple Carvings & Lotus Arch',
    height: '18 Feet',
    artist: 'Mandal Artisans & Sculptors',
    image: '/images/raja_real_2.png',
    desc: 'Radiant idol in yellow pitambar seated on handcrafted gold-leaf throne.'
  },
  {
    year: '2023',
    category: 'visarjan',
    title: 'मयूरपंख कमान आगमन सोहळा (Peacock Feather Arch)',
    theme: 'Royal Heritage Court Decor',
    height: '18 Feet',
    artist: 'Mandal Karyakartas',
    image: '/images/raja_real_3.png',
    desc: 'Grand procession throne featuring peacock feather arches during Aagman Sohala.'
  },
  {
    year: '2022',
    category: 'aarti',
    title: 'श्री मुख दर्शन व सुवर्ण मुकुट (Divine Face & Gold Crown)',
    theme: 'Tradition of Pure Devotion',
    height: '18 Feet',
    artist: 'Sculptor Shri Santosh Kambli',
    image: '/images/raja_real_4.png',
    desc: 'Mesmerizing facial smile with gold crown and Modak blessing hand posture.'
  },
  {
    year: '2021',
    category: 'decor',
    title: 'गर्भगृह पुष्प शृंगार दर्शन (Floral Sanctuary Decor)',
    theme: 'Royal Velvet & Lotus Geometry',
    height: '18 Feet',
    artist: 'Mandal Design Team',
    image: '/images/raja_real_5.png',
    desc: 'Idol adorned in purple pitambar with backdrop of 5000+ fresh orchid & marigold flowers.'
  },
  {
    year: '2020',
    category: 'aarti',
    title: 'आरोग्य संकल्प व सुवर्ण पदकमयी रूप (Arogya Sankalp)',
    theme: 'Eco-Friendly Clay & Silver Throne',
    height: '12 Feet',
    artist: 'Master Sculptor Shri Santosh Kambli',
    image: '/images/gallery_padya_pujan.png',
    desc: 'Sacred silver throne during pandemic health drive and blood donation initiative.'
  },
  {
    year: '2019',
    category: 'decor',
    title: 'राजवाडा महामंडप व सुवर्ण मेघडंबरी (Royal Palace Dome)',
    theme: 'Fort Raigad & Palace Architecture',
    height: '18 Feet',
    artist: 'Mandal Artisans & Sculptors',
    image: '/images/gallery_aagman.png',
    desc: 'Grand traditional Maratha palace setup with ornate golden arches.'
  },
  {
    year: '2018',
    category: 'visarjan',
    title: 'भव्य विसर्जन मिरवणूक व तुतारी शंखनाद (Grand Visarjan)',
    theme: 'Traditional Dhol Tasha & Gulal Rain',
    height: '18 Feet',
    artist: 'Mandal Karyakartas',
    image: '/images/gallery_mandap.png',
    desc: 'Royal chariot procession from Belasis Road to Girgaon Chowpatty beach.'
  },
  {
    year: '2017',
    category: 'idols',
    title: 'रत्नजडित मुकुट व पीतांबर शृंगार (Jeweled Crown & Silk)',
    theme: 'Classic Temple Carvings',
    height: '18 Feet',
    artist: 'Sculptor Shri Santosh Kambli',
    image: '/images/gallery_pushpa_alankar.png',
    desc: 'Classic 18ft idol embellished with traditional Kolhapuri gold jewelry.'
  },
  {
    year: '2016',
    category: 'decor',
    title: 'रौप्य कमान व प्रथम दीप सोहळा (Silver Arch Deepotsav)',
    theme: 'Heritage Chawl Jubilee Decor',
    height: '18 Feet',
    artist: 'Mandal Team',
    image: '/images/raja_real_1.png',
    desc: 'Illuminated 1008 lamps ceremony and silver backdrop arch.'
  },
  {
    year: '2015',
    category: 'idols',
    title: 'दशकपूर्ती आगमन व राजेशाही पदचिन्ह (Decade Milestone)',
    theme: 'Traditional Heritage Crafts',
    height: '18 Feet',
    artist: 'Master Sculptor Shri Santosh Kambli',
    image: '/images/raja_real_2.png',
    desc: 'Iconic historic idol sculpture marking 27th grand year of Mandal establishment.'
  }
];

// Social Work Data
const socialWorkData = [
  {
    id: 'annadan',
    title: 'अन्नदान महाप्रसाद सेवा (Annadan Mahaprasad Drive)',
    category: 'Food Security',
    image: '/images/gallery_padya_pujan.png',
    desc: 'Serving over 50,000+ hot nutritious meals, fresh breakfast, tea, and packaged water to visiting devotees and local community daily during Ganeshotsav.'
  },
  {
    id: 'blood-donation',
    title: 'भव्य रक्तदान व आरोग्य शिबीर (Blood Donation & Health Camp)',
    category: 'Healthcare',
    image: '/images/gallery_aagman.png',
    desc: 'Organizing annual blood donation drives in association with KEM & Nair Hospitals, collecting 500+ blood units every festival season.'
  },
  {
    id: 'education',
    title: 'विद्यार्थी शैक्षणिक सहाय्य (Student Educational Aid)',
    category: 'Education',
    image: '/images/gallery_mandap.png',
    desc: 'Providing notebooks, school bags, e-learning tablets, and scholarships to underprivileged students residing in Mumbai Central area.'
  },
  {
    id: 'csr-environment',
    title: 'पर्यावरणपूरक गणेशोत्सव व वृक्षारोपण (Green Ganeshotsav & Tree Plantation)',
    category: 'Environment',
    image: '/images/gallery_pushpa_alankar.png',
    desc: 'Promoting eco-friendly clay idols, zero plastic mandap premises, and planting 1,000+ saplings annually across Mumbai.'
  }
];

// Committee Members Data
const committeeData = [
  {
    name: 'श्री. प्रकाश आर. सावंत',
    designation: 'अध्यक्ष (President)',
    phone: '+91 98200 11111',
    role: 'Overall Mandal Administration & Management'
  },
  {
    name: 'श्री. विजय एस. मोर',
    designation: 'कार्याध्यक्ष (Executive Chairman)',
    phone: '+91 98200 22222',
    role: 'Festival Coordination & Public Relations'
  },
  {
    name: 'श्री. नितीन डी. पाटील',
    designation: 'प्रमुख सरचिटणीस (General Secretary)',
    phone: '+91 98200 33333',
    role: 'Government Permissions & Secretariat Ops'
  },
  {
    name: 'श्री. सुहास एम. कदम',
    designation: 'खजिनदार (Treasurer)',
    phone: '+91 98200 44444',
    role: 'Financial Accounts & 80G Donation Desk'
  },
  {
    name: 'श्री. गणेश के. परब',
    designation: 'सल्लागार प्रमुख (Chief Advisory Board)',
    phone: '+91 98200 55555',
    role: 'Senior Trustee Guidance'
  },
  {
    name: 'श्री. अमित बी. शिंदे',
    designation: 'युवा विभाग प्रमुख (Youth Wing Head)',
    phone: '+91 98200 66666',
    role: 'Volunteer Force & Security Operations'
  }
];

module.exports = {
  // Render Home Page
  renderHomePage(req, res) {
    const status = db.getYatraStatus();
    res.render('index', {
      title: 'Mumbai Central Cha Raja | Belasis Road B.I.T. Chawl Sarvajanik Shri Ganeshotsav Mandal',
      activeTab: 'home',
      yatraStatus: status,
      scheduleData: scheduleData.slice(0, 4),
      glimpsesData,
      socialWorkData
    });
  },

  // Render About Us Page
  renderAboutPage(req, res) {
    res.render('about', {
      title: 'आमच्याबद्दल | Mumbai Central Cha Raja Official',
      activeTab: 'about'
    });
  },

  // Render Schedule Page
  renderSchedulePage(req, res) {
    const status = db.getYatraStatus();
    res.render('schedule', {
      title: 'गणेशोत्सव कार्यसूची व आरती वेळ | Mumbai Central Cha Raja',
      activeTab: 'schedule',
      yatraStatus: status,
      scheduleData
    });
  },

  // Render Glimpses Page
  renderGlimpsesPage(req, res) {
    res.render('glimpses', {
      title: 'वर्षभरातील क्षणचित्रे | Mumbai Central Cha Raja',
      activeTab: 'glimpses',
      glimpsesData
    });
  },

  // Render Decade Gallery (Renamed from Photo Booth)
  renderPhotoBoothPage(req, res) {
    res.render('photo-booth', {
      title: 'दशकातील क्षणचित्रे (२०१५-२०२५) | Mumbai Central Cha Raja',
      activeTab: 'photobooth',
      glimpsesData
    });
  },

  // Render Social Work Page
  renderSocialWorkPage(req, res) {
    res.render('social-work', {
      title: 'सामाजिक कार्य व सेवा | Mumbai Central Cha Raja',
      activeTab: 'socialwork',
      socialWorkData
    });
  },

  // Render Committee Page
  renderCommitteePage(req, res) {
    res.render('committee', {
      title: 'कार्यकारिणी समिती | Mumbai Central Cha Raja',
      activeTab: 'committee',
      committeeData
    });
  },

  // Live Status API
  getLiveStatusApi(req, res) {
    const status = db.getYatraStatus();
    res.json({ success: true, status });
  }
};
