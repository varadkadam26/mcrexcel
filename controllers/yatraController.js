const db = require('../config/db');

// Ganeshotsav Event Schedule Data for Mumbai Central Cha Raja
const scheduleData = [
  {
    day: 1,
    titleMr: 'पाद्यपूजन व मंडळ संकल्प सोहळा',
    titleEn: 'Padya Pujan & Mandal Sankalp Sohala',
    dateMr: 'दिवस १ (गणेशोत्सव काऊंटडाऊन)',
    dateEn: 'Day 1 (Ganeshotsav Countdown)',
    halt_locationMr: 'बीआयटी चाळ मध्यवर्ती मैदान, मुंबई सेंट्रल',
    halt_locationEn: 'BIT Chawl Central Ground, Mumbai Central',
    facilitiesMr: ['वेदिक मंत्र पठण', 'पुष्प कमान सजावट', 'मोदक प्रसाद वाटप'],
    facilitiesEn: ['Vedic Mantra Chanting', 'Floral Arch Decoration', 'Modak Prasad Distribution'],
    emergency_contact: '+91 98765 11111'
  },
  {
    day: 2,
    titleMr: 'भव्य आगमन सोहळा',
    titleEn: 'Grand Aagman Sohala (Arrival Procession)',
    dateMr: 'दिवस २ (आगमन दिवस)',
    dateEn: 'Day 2 (Aagman Day)',
    halt_locationMr: 'बेलासिस रोड ते बीआयटी चाळ मंडप',
    halt_locationEn: 'Belasis Road to BIT Chawl Mandap',
    facilitiesMr: ['नाशिक ढोल व ताशा पथक', 'गुलाल व पुष्पवृष्टी', 'सुरक्षा व गर्दी नियंत्रण'],
    facilitiesEn: ['Nashik Dhol & Tasha Pathak', 'Gulal & Flower Rain', 'Security & Crowd Assistance'],
    emergency_contact: '+91 98765 22222'
  },
  {
    day: 3,
    titleMr: 'प्रतिष्ठापना व प्रथम महाआरती',
    titleEn: 'Pratishthapana & First Maha Aarti',
    dateMr: 'दिवस ३ (गणेश चतुर्थी)',
    dateEn: 'Day 3 (Ganesh Chaturthi)',
    halt_locationMr: 'मुंबई सेंट्रलचा राजा राजेशाही मंडप',
    halt_locationEn: 'Mumbai Central Cha Raja Royal Mandap',
    facilitiesMr: ['सकाळी ८:०० वाजता आरती', 'सामान्य दर्शन रांग', 'संध्याकाळी ८:०० वाजता महाआरती'],
    facilitiesEn: ['Morning 8:00 AM Aarti', 'General Darshan Queue', 'Evening 8:00 PM Maha Aarti'],
    emergency_contact: '+91 98765 33333'
  },
  {
    day: 4,
    titleMr: 'अन्नदान महाप्रसाद सेवा',
    titleEn: 'Annadan Mahaprasad Seva',
    dateMr: 'दिवस ४',
    dateEn: 'Day 4',
    halt_locationMr: 'बीआयटी चाळ सेवा मैदान',
    halt_locationEn: 'BIT Chawl Seva Ground',
    facilitiesMr: ['गरम महाप्रसाद भोजन', 'पिण्याचे पाणी', 'वैद्यकीय प्रथमोपचार'],
    facilitiesEn: ['Hot Mahaprasad Meals', 'Drinking Water Booths', 'Medical First Aid Desk'],
    emergency_contact: '+91 98765 44444'
  },
  {
    day: 5,
    titleMr: 'सांस्कृतिक व भजन संध्या',
    titleEn: 'Cultural & Bhajan Sandhya',
    dateMr: 'दिवस ५',
    dateEn: 'Day 5',
    halt_locationMr: 'सांस्कृतिक मंच, बीआयटी चाळ संकुल',
    halt_locationEn: 'Cultural Stage, BIT Chawl Complex',
    facilitiesMr: ['पारंपारिक लोककला सादरीकरण', 'कार्यकर्ते मदत कक्ष', 'व्हीलचेअर सुविधा'],
    facilitiesEn: ['Traditional Folk Performances', 'Karyakarta Assistance Desk', 'Wheelchair Support'],
    emergency_contact: '+91 98765 55555'
  },
  {
    day: 6,
    titleMr: 'विशेष आरोग्य व रक्तदान शिबीर',
    titleEn: 'Special Health & Blood Donation Camp',
    dateMr: 'दिवस ६',
    dateEn: 'Day 6',
    halt_locationMr: 'कम्युनिटी हॉल, मुंबई सेंट्रल',
    halt_locationEn: 'Community Hall, Mumbai Central',
    facilitiesMr: ['मोफत आरोग्य तपासणी', 'रक्तदान मोहीम', 'भाविक कल्याण कक्ष'],
    facilitiesEn: ['Free Health Checkup', 'Blood Donation Drive', 'Devotee Welfare Desk'],
    emergency_contact: '+91 98765 66666'
  },
  {
    day: 7,
    titleMr: 'गौरी गणपती विसर्जन व संध्या आरती',
    titleEn: 'Gauri Ganpati Visarjan & Evening Aarti',
    dateMr: 'दिवस ७',
    dateEn: 'Day 7',
    halt_locationMr: 'राजेशाही मंडप मंच',
    halt_locationEn: 'Royal Mandap Stage',
    facilitiesMr: ['विशेष पुष्प सजावट', 'प्रसाद वाटप', '२४/७ सुरक्षा रक्षक'],
    facilitiesEn: ['Special Flower Decoration', 'Prasad Distribution', '24/7 Security Patrol'],
    emergency_contact: '+91 98765 77777'
  },
  {
    day: 8,
    titleMr: 'भव्य दीपोत्सव व छप्पन भोग',
    titleEn: 'Grand Deepotsav & Chappan Bhog',
    dateMr: 'दिवस ८',
    dateEn: 'Day 8',
    halt_locationMr: 'मुंबई सेंट्रलचा राजा गर्भगृह',
    halt_locationEn: 'Mumbai Central Cha Raja Garbhagriha',
    facilitiesMr: ['१००८ दिव्यांचा दीपोत्सव', 'पारंपारिक भोग अर्पण', 'थेट प्रक्षेपण कक्ष'],
    facilitiesEn: ['1008 Diya Deepotsav', 'Traditional Bhog Offering', 'Live Camera Stream Desk'],
    emergency_contact: '+91 98765 88888'
  },
  {
    day: 9,
    titleMr: 'ज्येष्ठ नागरिक व बालकांसाठी विशेष दर्शन',
    titleEn: 'Senior Citizen & Child Special Darshan',
    dateMr: 'दिवस ९',
    dateEn: 'Day 9',
    halt_locationMr: 'मंडप मुख्य प्रवेशद्वार',
    halt_locationEn: 'Mandap Main Entrance',
    facilitiesMr: ['प्राधान्य रांग', 'सहाय्यक शटल सेवा', 'आपत्कालीन रुग्णवाहिका'],
    facilitiesEn: ['Priority Senior Queue', 'Assisted Shuttle', 'Emergency Ambulance'],
    emergency_contact: '+91 98765 99999'
  },
  {
    day: 10,
    titleMr: 'अनंत चतुर्दशी उत्तरपूजा व विसर्जन मिरवणूक',
    titleEn: 'Anant Chaturdashi Uttarpuja & Visarjan Miravand',
    dateMr: 'दिवस १० (भव्य निरोप)',
    dateEn: 'Day 10 (Grand Farewell)',
    halt_locationMr: 'मुंबई सेंट्रल ते गिरगाव चौपाटी',
    halt_locationEn: 'Mumbai Central to Girgaon Chowpatty',
    facilitiesMr: ['भव्य मिरवणूक रथ', 'जीवरक्षक पथक', 'गिरगाव विसर्जन सेवा'],
    facilitiesEn: ['Grand Procession Chariot', 'Lifeguard Team', 'Girgaon Visarjan Seva'],
    emergency_contact: '+91 98765 00000'
  }
];

// Glimpses over a Decade (10+ Years Historical Retrospective Data)
const glimpsesData = [
  {
    year: '2025',
    category: 'idols',
    titleMr: 'काष्ठ सिंहासन व राजेशाही सुवर्ण शृंगार',
    titleEn: 'Royal Wooden Throne',
    themeMr: 'पेशवेकालीन राजवाडा मंडप',
    themeEn: 'Peshwa Era Palace Mandap Architecture',
    heightMr: '१२ फूट',
    heightEn: '12 Feet',
    artistMr: 'मूर्तिकार श्री संतोष कांबळी',
    artistEn: 'Master Sculptor Shri Santosh Kambli',
    image: '/images/raja_real_1.png',
    descMr: 'गुलाबी व मरून रेशमी वस्त्रांतील राजेशाही लाकडी सिंहासनावरील भव्य रूप.',
    descEn: 'The magnificent wooden throne form dressed in royal pink and maroon silk robes.'
  },
  {
    year: '2024',
    category: 'idols',
    titleMr: 'सुवर्ण सिंहासन व तेज:पुंज पीत पितांबर',
    titleEn: 'Golden Throne',
    themeMr: 'सुवर्ण मंदिर कलाकृती',
    themeEn: 'Golden Temple Carvings & Lotus Arch',
    heightMr: '१२ फूट',
    heightEn: '12 Feet',
    artistMr: 'मंडळ मूर्तिकार',
    artistEn: 'Mandal Artisans & Sculptors',
    image: '/images/raja_real_2.png',
    descMr: 'हस्तनिर्मित सुवर्ण सिंहासनावर आरूढ पीत पितांबरातील तेज:पुंज मूर्ती.',
    descEn: 'Radiant idol in yellow pitambar seated on handcrafted gold-leaf throne.'
  },
  {
    year: '2023',
    category: 'visarjan',
    titleMr: 'मयूरपंख कमान आगमन सोहळा',
    titleEn: 'Peacock Feather Arch',
    themeMr: 'राजेशाही दरबार',
    themeEn: 'Royal Heritage Court Decor',
    heightMr: '१२ फूट',
    heightEn: '12 Feet',
    artistMr: 'मंडळ कार्यकर्ते',
    artistEn: 'Mandal Karyakartas',
    image: '/images/raja_real_3.png',
    descMr: 'आगमन सोहळ्यादरम्यान मयूरपंख कमानीतून भव्य मिरवणूक.',
    descEn: 'Grand procession throne featuring peacock feather arches during Aagman Sohala.'
  },
  {
    year: '2022',
    category: 'aarti',
    titleMr: 'श्री मुख दर्शन व सुवर्ण मुकुट',
    titleEn: 'Divine Face & Gold Crown',
    themeMr: 'भक्तीची शुद्ध परंपरा',
    themeEn: 'Tradition of Pure Devotion',
    heightMr: '१२ फूट',
    heightEn: '12 Feet',
    artistMr: 'मूर्तिकार श्री संतोष कांबळी',
    artistEn: 'Sculptor Shri Santosh Kambli',
    image: '/images/raja_real_4.png',
    descMr: 'सुवर्ण मुकुट आणि हास्याने मोहरलेले श्रींचे विलोभनीय मुखदर्शन.',
    descEn: 'Mesmerizing facial smile with gold crown and Modak blessing hand posture.'
  },
  {
    year: '2021',
    category: 'decor',
    titleMr: 'गर्भगृह पुष्प शृंगार दर्शन',
    titleEn: 'Floral Sanctuary Decor',
    themeMr: 'राजेशाही मखमल व कमळ रचना',
    themeEn: 'Royal Velvet & Lotus Geometry',
    heightMr: '१२ फूट',
    heightEn: '12 Feet',
    artistMr: 'मंडळ सजावट समिती',
    artistEn: 'Mandal Design Team',
    image: '/images/raja_real_5.png',
    descMr: '५००० हून अधिक ऑर्किड आणि झेंडूच्या फुलांच्या पार्श्वभूमीवर जांभळ्या पितांबरातील मूर्ती.',
    descEn: 'Idol adorned in purple pitambar with backdrop of 5000+ fresh orchid & marigold flowers.'
  },
  {
    year: '2020',
    category: 'aarti',
    titleMr: 'आरोग्य संकल्प व सुवर्ण पदकमयी रूप',
    titleEn: 'Arogya Sankalp',
    themeMr: 'पर्यावरणपूरक माती व रौप्य सिंहासन',
    themeEn: 'Eco-Friendly Clay & Silver Throne',
    heightMr: '१२ फूट',
    heightEn: '12 Feet',
    artistMr: 'मूर्तिकार श्री संतोष कांबळी',
    artistEn: 'Master Sculptor Shri Santosh Kambli',
    image: '/images/ganesha_2007.jpg',
    descMr: 'आरोग्य अभियान आणि रक्तदान शिबिरादरम्यान रौप्य सिंहासनावरील दर्शन.',
    descEn: 'Sacred silver throne during pandemic health drive and blood donation initiative.'
  },
  {
    year: '2019',
    category: 'decor',
    titleMr: 'राजवाडा महामंडप व सुवर्ण मेघडंबरी',
    titleEn: 'Royal Palace Dome',
    themeMr: 'किल्ले रायगड व राजवाडा कला',
    themeEn: 'Fort Raigad & Palace Architecture',
    heightMr: '१२ फूट',
    heightEn: '12 Feet',
    artistMr: 'मंडळ मूर्तिकार',
    artistEn: 'Mandal Artisans & Sculptors',
    image: '/images/ganesha_pic2.jpg',
    descMr: 'सुवर्ण कमानींसह भव्य पारंपारिक मराठा राजवाड्याची सजावट.',
    descEn: 'Grand traditional Maratha palace setup with ornate golden arches.'
  },
  {
    year: '2018',
    category: 'visarjan',
    titleMr: 'भव्य विसर्जन मिरवणूक व तुतारी शंखनाद',
    titleEn: 'Grand Visarjan',
    themeMr: 'पारंपारिक ढोल ताशा व गुलाल',
    themeEn: 'Traditional Dhol Tasha & Gulal Rain',
    heightMr: '१२ फूट',
    heightEn: '12 Feet',
    artistMr: 'मंडळ कार्यकर्ते',
    artistEn: 'Mandal Karyakartas',
    image: '/images/ganesha_2013.jpg',
    descMr: 'बेलासिस रोड ते गिरगाव चौपाटीपर्यंत शाही रथातून भव्य मिरवणूक.',
    descEn: 'Royal chariot procession from Belasis Road to Girgaon Chowpatty beach.'
  },
  {
    year: '2017',
    category: 'idols',
    titleMr: 'रत्नजडित मुकुट व पीतांबर शृंगार',
    titleEn: 'Jeweled Crown & Silk',
    themeMr: 'पारंपारिक मंदिर कोरीव काम',
    themeEn: 'Classic Temple Carvings',
    heightMr: '१२ फूट',
    heightEn: '12 Feet',
    artistMr: 'मूर्तिकार श्री संतोष कांबळी',
    artistEn: 'Sculptor Shri Santosh Kambli',
    image: '/images/ganesha_2008.jpg',
    descMr: 'पारंपारिक कोल्हापुरी सुवर्ण दागिन्यांनी सजवलेली भव्य मूर्ती.',
    descEn: 'Classic 18ft idol embellished with traditional Kolhapuri gold jewelry.'
  },
  {
    year: '2009',
    category: 'idols',
    titleMr: 'सुवर्ण प्रभावळ व विलोभनीय रूप',
    titleEn: 'Golden Throne & Prabhavali',
    themeMr: 'पारंपारिक सुवर्ण कला',
    themeEn: 'Traditional Gold Art',
    heightMr: '१२ फूट',
    heightEn: '12 Feet',
    artistMr: 'मूर्तिकार श्री संतोष कांबळी',
    artistEn: 'Master Sculptor Shri Santosh Kambli',
    image: '/images/ganesha_2003.jpg',
    descMr: 'गुलाबी पितांबरातील भव्य मूर्ती आणि पाठीमागे आकर्षक सुवर्ण प्रभावळ (२००९).',
    descEn: 'Grand idol in pink pitambar with an attractive golden prabhavali behind (2009).'
  },
  {
    year: '2003',
    category: 'idols',
    titleMr: 'शुभ्र मूर्ती व रौप्य मुकुट',
    titleEn: 'White Idol & Silver Crown',
    themeMr: 'भक्तीची शुद्ध परंपरा',
    themeEn: 'Tradition of Pure Devotion',
    heightMr: '१२ फूट',
    heightEn: '12 Feet',
    artistMr: 'मूर्तिकार श्री संतोष कांबळी',
    artistEn: 'Master Sculptor Shri Santosh Kambli',
    image: '/images/ganesha_2009.jpg',
    descMr: 'गडद जांभळ्या पितांबरातील शुभ्र मूर्ती आणि डोक्यावर भव्य रौप्य मुकुट (२००३).',
    descEn: 'White idol in dark purple pitambar with a grand silver crown on the head (2003).'
  }
];

// Social Work Data
const socialWorkData = [
  {
    id: 'social-1',
    titleMr: 'शैक्षणिक मदत व शालेय साहित्य वाटप',
    titleEn: 'Educational Aid & School Supplies',
    categoryMr: 'शैक्षणिक मदत',
    categoryEn: 'Educational Aid',
    image: '/images/social_1.png',
    descMr: 'गरजू आणि होतकरू विद्यार्थ्यांना दरवर्षी मोफत शालेय साहित्य आणि शैक्षणिक मदत दिली जाते.',
    descEn: 'Free school supplies and educational aid are provided to needy and deserving students every year.'
  },
  {
    id: 'social-2',
    titleMr: 'रुग्णवाहिका सेवा व वैद्यकीय मदत',
    titleEn: 'Ambulance & Medical Aid',
    categoryMr: 'वैद्यकीय',
    categoryEn: 'Medical',
    image: '/images/social_2.png',
    descMr: 'गरजू रुग्णांसाठी मोफत रुग्णवाहिका सेवा आणि तातडीची वैद्यकीय मदत उपलब्ध करून दिली जाते.',
    descEn: 'Providing free ambulance services and urgent medical aid to the needy patients.'
  },
  {
    id: 'social-3',
    titleMr: 'कोविड-१९ मदत व अन्नदान',
    titleEn: 'COVID-19 Relief & Aid',
    categoryMr: 'आरोग्य',
    categoryEn: 'Healthcare',
    image: '/images/social_3.png',
    descMr: 'कोविड-१९ महामारीच्या कठीण काळात गरजूंना अन्नदान, वैद्यकीय मदत आणि जीवनावश्यक वस्तूंचे वाटप.',
    descEn: 'Providing food, medical assistance, and essential supplies to the needy during the challenging times of the COVID-19 pandemic.'
  },
  {
    id: 'social-4',
    titleMr: 'मोफत आरोग्य तपासणी शिबीर',
    titleEn: 'Free Health Checkup Camp',
    categoryMr: 'आरोग्य',
    categoryEn: 'Healthcare',
    image: '/images/social_4.png',
    descMr: 'परिसरातील नागरिकांसाठी मोफत आरोग्य तपासणी शिबीर.',
    descEn: 'Free health checkup camp organized for the local citizens.'
  },
  {
    id: 'social-5',
    titleMr: 'संस्थांना आर्थिक व साहित्याची मदत',
    titleEn: 'Support to Institutes',
    categoryMr: 'सामाजिक कार्य',
    categoryEn: 'Social Impact',
    image: '/images/social_5.png',
    descMr: 'गरजू शैक्षणिक, वैद्यकीय आणि सामाजिक संस्थांना आर्थिक मदत व आवश्यक साहित्याचे वाटप.',
    descEn: 'Providing financial assistance and necessary materials to educational, medical, and social institutes in need.'
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
