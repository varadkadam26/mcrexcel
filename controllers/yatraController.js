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
    height: '12 Feet',
    artist: 'Master Sculptor Shri Santosh Kambli',
    image: '/images/raja_real_1.png',
    desc: 'The magnificent wooden throne form dressed in royal pink and maroon silk robes.'
  },
  {
    year: '2024',
    category: 'idols',
    title: 'सुवर्ण सिंहासन व तेज:पुंज पीत पितांबर (Golden Throne)',
    theme: 'Golden Temple Carvings & Lotus Arch',
    height: '12 Feet',
    artist: 'Mandal Artisans & Sculptors',
    image: '/images/raja_real_2.png',
    desc: 'Radiant idol in yellow pitambar seated on handcrafted gold-leaf throne.'
  },
  {
    year: '2023',
    category: 'visarjan',
    title: 'मयूरपंख कमान आगमन सोहळा (Peacock Feather Arch)',
    theme: 'Royal Heritage Court Decor',
    height: '12 Feet',
    artist: 'Mandal Karyakartas',
    image: '/images/raja_real_3.png',
    desc: 'Grand procession throne featuring peacock feather arches during Aagman Sohala.'
  },
  {
    year: '2022',
    category: 'aarti',
    title: 'श्री मुख दर्शन व सुवर्ण मुकुट (Divine Face & Gold Crown)',
    theme: 'Tradition of Pure Devotion',
    height: '12 Feet',
    artist: 'Sculptor Shri Santosh Kambli',
    image: '/images/raja_real_4.png',
    desc: 'Mesmerizing facial smile with gold crown and Modak blessing hand posture.'
  },
  {
    year: '2021',
    category: 'decor',
    title: 'गर्भगृह पुष्प शृंगार दर्शन (Floral Sanctuary Decor)',
    theme: 'Royal Velvet & Lotus Geometry',
    height: '12 Feet',
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
    height: '12 Feet',
    artist: 'Mandal Artisans & Sculptors',
    image: '/images/gallery_aagman.png',
    desc: 'Grand traditional Maratha palace setup with ornate golden arches.'
  },
  {
    year: '2018',
    category: 'visarjan',
    title: 'भव्य विसर्जन मिरवणूक व तुतारी शंखनाद (Grand Visarjan)',
    theme: 'Traditional Dhol Tasha & Gulal Rain',
    height: '12 Feet',
    artist: 'Mandal Karyakartas',
    image: '/images/gallery_mandap.png',
    desc: 'Royal chariot procession from Belasis Road to Girgaon Chowpatty beach.'
  },
  {
    year: '2017',
    category: 'idols',
    title: 'रत्नजडित मुकुट व पीतांबर शृंगार (Jeweled Crown & Silk)',
    theme: 'Classic Temple Carvings',
    height: '12 Feet',
    artist: 'Sculptor Shri Santosh Kambli',
    image: '/images/gallery_pushpa_alankar.png',
    desc: 'Classic 18ft idol embellished with traditional Kolhapuri gold jewelry.'
  },
  {
    year: '2016',
    category: 'decor',
    title: 'रौप्य कमान व प्रथम दीप सोहळा (Silver Arch Deepotsav)',
    theme: 'Heritage Chawl Jubilee Decor',
    height: '12 Feet',
    artist: 'Mandal Team',
    image: '/images/raja_real_1.png',
    desc: 'Illuminated 1008 lamps ceremony and silver backdrop arch.'
  },
  {
    year: '2015',
    category: 'idols',
    title: 'दशकपूर्ती आगमन व राजेशाही पदचिन्ह (Decade Milestone)',
    theme: 'Traditional Heritage Crafts',
    height: '12 Feet',
    artist: 'Master Sculptor Shri Santosh Kambli',
    image: '/images/raja_real_2.png',
    desc: 'Iconic historic idol sculpture marking 27th grand year of Mandal establishment.'
  }
];

// Social Work Data
const socialWorkData = [
  {
    id: 'social-1',
    title: 'समाजसेवा पुरस्कार व सन्मान (Social Service Awards)',
    category: 'Awards & Recognition',
    image: '/images/social_1.png',
    desc: 'मंडळाच्या सामाजिक कार्याची दखल घेत देण्यात आलेले विविध पुरस्कार व सन्मान. (Various awards and honors received by the Mandal for its social service initiatives.)'
  },
  {
    id: 'social-2',
    title: 'रुग्णवाहिका सेवा व वैद्यकीय मदत (Ambulance & Medical Aid)',
    category: 'Medical',
    image: '/images/social_2.png',
    desc: 'गरजू रुग्णांसाठी मोफत रुग्णवाहिका सेवा आणि तातडीची वैद्यकीय मदत उपलब्ध करून दिली जाते. (Providing free ambulance services and urgent medical aid to the needy patients.)'
  },
  {
    id: 'social-3',
    title: 'भव्य रक्तदान शिबीर (Blood Donation Camp)',
    category: 'Healthcare',
    image: '/images/social_3.png',
    desc: 'सामाजिक बांधिलकी जपत आयोजित केलेले भव्य रक्तदान शिबीर, ज्यामध्ये शेकडो रक्तदात्यांचा उत्स्फूर्त सहभाग. (Mega blood donation camp organized with spontaneous participation of hundreds of donors.)'
  },
  {
    id: 'social-4',
    title: 'मोफत आरोग्य तपासणी शिबीर (Free Health Checkup Camp)',
    category: 'Healthcare',
    image: '/images/social_4.png',
    desc: 'परिसरातील नागरिकांसाठी मोफत आरोग्य तपासणी शिबीर. (Free health checkup camp organized for the local citizens.)'
  },
  {
    id: 'social-5',
    title: 'गुणवंत सत्कार व सन्मान (Felicitation & Honors)',
    category: 'Social Impact',
    image: '/images/social_5.png',
    desc: 'परिसरातील गुणवंत विद्यार्थी आणि समाजसेवकांचा विशेष सन्मान व सत्कार. (Special felicitation and honors for meritorious students and social workers from the area.)'
  }
];

// Committee Members Data - 2025-26
const committeeData = [
  {
    number: 1,
    nameMr: 'श्री. मुरारी प्रदीप तावडे',
    nameEn: 'Shri Murari Pradip Tawde',
    designationMr: 'अध्यक्ष',
    designationEn: 'President',
    image: '/images/committee_1.png'
  },
  {
    number: 2,
    nameMr: 'श्री. महेश रामचंद्र जगताप',
    nameEn: 'Shri Mahesh Ramchandra Jagtap',
    designationMr: 'सरचिटणीस',
    designationEn: 'General Secretary',
    image: '/images/committee_2.png'
  },
  {
    number: 3,
    nameMr: 'श्री. उर्वेश राजेंद्र शिंदे',
    nameEn: 'Shri Urvesh Rajendra Shinde',
    designationMr: 'सहचिटणीस',
    designationEn: 'Joint Secretary',
    image: '/images/committee_3.png'
  },
  {
    number: 4,
    nameMr: 'श्री. अविनाश चंद्रकांत पाथरे',
    nameEn: 'Shri Avinash Chandrakant Pathare',
    designationMr: 'सहचिटणीस',
    designationEn: 'Joint Secretary',
    image: '/images/committee_4.png'
  },
  {
    number: 5,
    nameMr: 'श्री. प्रसाद विष्णू चव्हाण',
    nameEn: 'Shri Prasad Vishnu Chavan',
    designationMr: 'अंतर्गत हिशोब तपासणीस',
    designationEn: 'Internal Auditor',
    image: '/images/committee_5.png'
  },
  {
    number: 6,
    nameMr: 'श्री. सत्यजित बाळासाहेब शिंदे',
    nameEn: 'Shri Satyajit Balasaheb Shinde',
    designationMr: 'उपाध्यक्ष',
    designationEn: 'Vice President',
    image: '/images/committee_6.png'
  },
  {
    number: 7,
    nameMr: 'श्री. निलेश पांडुरंग कांबळे',
    nameEn: 'Shri Nilesh Pandurang Kamble',
    designationMr: 'खजिनदार',
    designationEn: 'Treasurer',
    image: '/images/committee_7.png'
  },
  {
    number: 8,
    nameMr: 'श्री. यश दिनेश पयेर',
    nameEn: 'Shri Yash Dinesh Payer',
    designationMr: 'सहचिटणीस',
    designationEn: 'Joint Secretary',
    image: '/images/committee_8.png'
  },
  {
    number: 9,
    nameMr: 'श्री. दर्शन मंगेश येलवे',
    nameEn: 'Shri Darshan Mangesh Yelave',
    designationMr: 'सह अंतर्गत हिशोब तपासणीस',
    designationEn: 'Joint Internal Auditor',
    image: '/images/committee_9.png'
  },
  {
    number: 10,
    nameMr: 'श्री. विराज विनोद कांबळे',
    nameEn: 'Shri Viraj Vinod Kamble',
    designationMr: 'सहचिटणीस',
    designationEn: 'Joint Secretary',
    image: '/images/committee_10.png'
  }
];

module.exports = {
  // Render Home Page
  renderHomePage(req, res) {
    const status = db.getYatraStatus();
    res.render('index', {
      title: 'Mumbai Central Cha Raja | B.I.T Chawl Belasis Road Sarvajanik Shri Ganeshotsav Mandal',
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
