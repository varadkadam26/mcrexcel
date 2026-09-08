const db = require('../config/db');
const googleSheets = require('../config/googleSheets');
const mailer = require('../config/mailer');
const seo = require('../config/seo');

// Ganeshotsav Event Schedule Data for Mumbai Central Cha Raja (Karyakram Patrika 2026 - Year 98)
const scheduleData = [
  {
    day: 'आगमन',
    titleMr: '"श्रीं"चे आगमन',
    titleEn: 'Arrival of "Shri"',
    dateMr: '१२.०९.२०२६ (शनिवार)',
    dateEn: '12th Sept 2026 (Saturday)',
    halt_locationMr: 'बी.आय.टी. चाळ, बेलासिस रोड, मुंबई सेंट्रल',
    halt_locationEn: 'B.I.T. Chawl, Belasis Road, Mumbai Central',
    facilitiesMr: ['सायं. ४.०० वा. - "श्रीं"चे आगमन'],
    facilitiesEn: ['4:00 PM - Arrival of "Shri"']
  },
  {
    day: 1,
    titleMr: '"श्रीं"ची प्राणप्रतिष्ठा सोहळा व भजन',
    titleEn: 'Shri Pranpratishtha Sohala & Bhajan',
    dateMr: '१४.०९.२०२६ (सोमवार)',
    dateEn: '14th Sept 2026 (Monday)',
    halt_locationMr: 'राजेशाही मंडप मंच, बीआयटी चाळ',
    halt_locationEn: 'Royal Mandap Stage, BIT Chawl',
    facilitiesMr: [
      'सकाळी ९.०० वा. - "श्रीं"ची प्राणप्रतिष्ठा सोहळा',
      'रात्री ८.०० वा. - भजन'
    ],
    facilitiesEn: [
      '9:00 AM - "Shri" Pranpratishtha Sohala',
      '8:00 PM - Bhajan'
    ]
  },
  {
    day: 2,
    titleMr: 'गण अभिषेक व बृ.मु.म.पा. कर्मचारी आरती',
    titleEn: 'Gana Abhishek & BMC Staff Aarti',
    dateMr: '१५.०९.२०२६ (मंगळवार)',
    dateEn: '15th Sept 2026 (Tuesday)',
    halt_locationMr: 'मुख्य मंडप, बेलासिस रोड',
    halt_locationEn: 'Main Mandap, Belasis Road',
    facilitiesMr: [
      'सकाळी १०.०० वा. - गण अभिषेक - "श्रीं"चा मंगलमय विधि',
      'दुपारी १२.०० वा. - बृ.मु.म.पा. कर्मचाऱ्यांकरीता आरती'
    ],
    facilitiesEn: [
      '10:00 AM - Gana Abhishek - Sacred Ritual of "Shri"',
      '12:00 PM - Special Aarti for BMC Employees'
    ]
  },
  {
    day: 3,
    titleMr: 'पुष्प अर्चनम्, आरोग्य कर्मचारी आरती व स्मारिका प्रकाशन',
    titleEn: 'Pushpa Archanam, Health Staff Aarti & Souvenir Release',
    dateMr: '१६.०९.२०२६ (बुधवार)',
    dateEn: '16th Sept 2026 (Wednesday)',
    halt_locationMr: 'मुख्य मंडप, बीआयटी चाळ',
    halt_locationEn: 'Main Mandap, BIT Chawl',
    facilitiesMr: [
      'सकाळी १०.०० वा. - पुष्प अर्चनम् - "श्रीं"चा मंगलमय विधि',
      'दुपारी १२.०० वा. - बृ.मु.म.पा. आरोग्य कर्मचाऱ्यांकरीता आरती',
      'सायं. ७.३० वा. - स्मारिका २०२६ (प्रकाशन सोहळा)'
    ],
    facilitiesEn: [
      '10:00 AM - Pushpa Archanam - Sacred Ritual of "Shri"',
      '12:00 PM - Special Aarti for BMC Health Staff',
      '7:30 PM - Souvenir 2026 Release Ceremony'
    ]
  },
  {
    day: 4,
    titleMr: 'संध्या आरती व प्रसाद',
    titleEn: 'Evening Aarti & Prasad',
    dateMr: '१७.०९.२०२६ (गुरुवार)',
    dateEn: '17th Sept 2026 (Thursday)',
    halt_locationMr: 'राजेशाही मंडप मंच',
    halt_locationEn: 'Royal Mandap Stage',
    facilitiesMr: [
      'सायं. ७.०० वा. - संध्या आरती व प्रसाद'
    ],
    facilitiesEn: [
      '7:00 PM - Evening Aarti & Prasad'
    ]
  },
  {
    day: 5,
    titleMr: 'हरिद्रा गणेश - मंगलमय विधि',
    titleEn: 'Haridra Ganesh Sacred Ritual',
    dateMr: '१८.०९.२०२६ (शुक्रवार)',
    dateEn: '18th Sept 2026 (Friday)',
    halt_locationMr: 'मुख्य मंडप मंच',
    halt_locationEn: 'Main Mandap Stage',
    facilitiesMr: [
      'सकाळी ९.०० वा. - हरिद्रा गणेश - मंगलमय विधि'
    ],
    facilitiesEn: [
      '9:00 AM - Haridra Ganesh Sacred Ritual'
    ]
  },
  {
    day: 6,
    titleMr: 'गणेश सहस्रनामावली मंगलमय विधि',
    titleEn: 'Ganesh Sahasranamavali Sacred Ritual',
    dateMr: '१९.०९.२०२६ (शनिवार)',
    dateEn: '19th Sept 2026 (Saturday)',
    halt_locationMr: 'मुख्य मंडप मंच',
    halt_locationEn: 'Main Mandap Stage',
    facilitiesMr: [
      'सकाळी १०.०० वा. - गणेश सहस्रनामावली मंगलमय विधि'
    ],
    facilitiesEn: [
      '10:00 AM - Ganesh Sahasranamavali Sacred Ritual'
    ]
  },
  {
    day: 7,
    titleMr: 'मेडिकल कॅम्प, ५६ भोग व बाल-युवा सांस्कृतिक स्पर्धा',
    titleEn: 'Medical Camp, 56 Bhog & Cultural Competitions',
    dateMr: '२०.०९.२०२६ (रविवार)',
    dateEn: '20th Sept 2026 (Sunday)',
    halt_locationMr: 'बीआयटी चाळ परिसर व मुख्य मंडप',
    halt_locationEn: 'BIT Chawl Premises & Main Mandap',
    facilitiesMr: [
      'सकाळी ९.०० वा. - मेडिकल कॅम्प करीता राखीव',
      'दुपारी ११.३० वा. - ५६ भोग (गोडाधोडाचे नैवेद्य)',
      'दुपारी ३.०० वा. - बडबडगीत स्पर्धा (बालवाडी बालवर्ग)',
      'सायं. ५.०० वा. - वेशभूषा (१४ वर्षाखालील मुले/मुली)',
      'रात्री ८.०० वा. - स्केच आर्ट स्पर्धा (खुला गट)'
    ],
    facilitiesEn: [
      '9:00 AM - Free Medical Camp for Residents',
      '11:30 AM - 56 Bhog Sweets Offering',
      '3:00 PM - Nursery Rhymes Contest (Kindergarten)',
      '5:00 PM - Fancy Dress Contest (Under 14 Years)',
      '8:00 PM - Sketch Art Contest (Open Group)'
    ]
  },
  {
    day: 8,
    titleMr: 'महिला विशेष आरती, अथर्वशीर्ष पठण व बाल महोत्सव',
    titleEn: 'Women Special Aarti, Atharvashirsha & Bal Mahotsav',
    dateMr: '२१.०९.२०२६ (सोमवार)',
    dateEn: '21st Sept 2026 (Monday)',
    halt_locationMr: 'मुख्य मंडप, बीआयटी चाळ',
    halt_locationEn: 'Main Mandap, BIT Chawl',
    facilitiesMr: [
      'सायं. ७.०० वा. - महिलांकरीता आरती (विभागातील)',
      'सायं. ७.३० वा. - सामूहिक अथर्वशीर्ष स्तोत्र पठण (महिलांकरीता)',
      'रात्री ८.०० वा. - बाल महोत्सव'
    ],
    facilitiesEn: [
      '7:00 PM - Women Special Aarti (Area Residents)',
      '7:30 PM - Mass Atharvashirsha Stotra Chanting for Women',
      '8:00 PM - Bal Mahotsav (Children\'s Festival)'
    ]
  },
  {
    day: 9,
    titleMr: 'फळांची आरास, सांस्कृतिक कार्यक्रम व गुणगौरव समारंभ',
    titleEn: 'Fruit Decoration & Resident/Student Felicitation',
    dateMr: '२२.०९.२०२६ (मंगळवार)',
    dateEn: '22nd Sept 2026 (Tuesday)',
    halt_locationMr: 'मुख्य मंडप व रंगमंच',
    halt_locationEn: 'Main Mandap & Stage',
    facilitiesMr: [
      'सकाळी १०.०० वा. - फळांची आरास',
      'रात्री ८.०० वा. - स्थानिक/सांस्कृतिक कार्यक्रम, रहिवासी सत्कार व विद्यार्थी गुणगौरव समारंभ (१०वी व १२वी)'
    ],
    facilitiesEn: [
      '10:00 AM - Fruit Decoration Display',
      '8:00 PM - Local Cultural Program, Resident Felicitation & Student Awards (10th & 12th)'
    ]
  },
  {
    day: 10,
    titleMr: 'श्री सत्यनारायण महापूजा, हळदी-कुंकू, रांगोळी स्पर्धा व भजन',
    titleEn: 'Satyanarayan Mahapuja, Haldi-Kumkum, Rangoli & Bhajan',
    dateMr: '२३.०९.२०२६ (बुधवार)',
    dateEn: '23rd Sept 2026 (Wednesday)',
    halt_locationMr: 'मुख्य मंडप व बीआयटी चाळ परिसर',
    halt_locationEn: 'Main Mandap & BIT Chawl Premises',
    facilitiesMr: [
      'सकाळी ११.०० वा. - श्री सत्यनारायण महापूजा (प्रतिनिधी)',
      'सायं. ६.०० वा. - रांगोळी स्पर्धा (विभागातील खुला वर्ग)',
      'सायं. ७.०० वा. - महिलांसाठी हळदी-कुंकू',
      'रात्री ८.०० वा. - स्थानिक भजन'
    ],
    facilitiesEn: [
      '11:00 AM - Shri Satyanarayan Mahapuja',
      '6:00 PM - Rangoli Competition (Open Category)',
      '7:00 PM - Haldi-Kumkum Ceremony for Women',
      '8:00 PM - Local Bhajan Night'
    ]
  },
  {
    day: 11,
    titleMr: 'स्थानिक सांस्कृतिक कार्यक्रम व बक्षीस समारंभ',
    titleEn: 'Local Cultural Program & Prize Distribution',
    dateMr: '२४.०९.२०२६ (गुरुवार)',
    dateEn: '24th Sept 2026 (Thursday)',
    halt_locationMr: 'मुख्य मंडप रंगमंच',
    halt_locationEn: 'Main Mandap Stage',
    facilitiesMr: [
      'रात्री ८.०० वा. - स्थानिक/सांस्कृतिक कार्यक्रम व बक्षीस समारंभ'
    ],
    facilitiesEn: [
      '8:00 PM - Local Cultural Program & Competition Prize Distribution Ceremony'
    ]
  },
  {
    day: 'विसर्जन',
    titleMr: '"श्रीं"ची महाआरती व भव्य विसर्जन मिरवणूक',
    titleEn: 'Grand Maha Aarti & Visarjan Procession',
    dateMr: '२५.०९.२०२६ (शुक्रवार)',
    dateEn: '25th Sept 2026 (Friday)',
    halt_locationMr: 'बी.आय.टी. चाळ ते गिरगाव चौपाटी',
    halt_locationEn: 'BIT Chawl to Girgaon Chowpatty',
    facilitiesMr: [
      'दुपारी १२.०० वा. - "श्रीं"ची महाआरती',
      'सायं. ४.०० वा. - "श्रीं"चे भव्य विसर्जन (मिरवणूक व उत्तरपूजा)'
    ],
    facilitiesEn: [
      '12:00 PM - Final Grand Maha Aarti of "Shri"',
      '4:00 PM - Grand Visarjan Miravnuk & Uttarpuja'
    ]
  }
];

// Glimpses over a Decade (10+ Years Historical Retrospective Data)
const glimpsesData = [
  {
    year: '2025',
    category: 'idols',
    titleMr: 'काष्ठ सिंहासन व राजेशाही सुवर्ण शृंगार',
    titleEn: 'Pink Clothing',
    themeMr: 'पेशवेकालीन राजवाडा मंडप',
    themeEn: '2025',
    heightMr: '१२ फूट',
    heightEn: '12 Feet',
    artistMr: 'मूर्तिकार श्री संतोष कांबळी',
    artistEn: 'Master Sculptor Shri Santosh Kambli',
    image: '/images/raja_real_1.png',
    descMr: 'गुलाबी व मरून रेशमी वस्त्रांतील राजेशाही लाकडी सिंहासनावरील भव्य रूप.',
    descEn: 'Ganesha idol in pink and maroon clothing.'
  },
  {
    year: '2024',
    category: 'idols',
    titleMr: 'सुवर्ण सिंहासन व तेज:पुंज पीत पितांबर',
    titleEn: 'Yellow Clothing',
    themeMr: 'सुवर्ण मंदिर कलाकृती',
    themeEn: '2024',
    heightMr: '१२ फूट',
    heightEn: '12 Feet',
    artistMr: 'मंडळ मूर्तिकार',
    artistEn: 'Mandal Artisans & Sculptors',
    image: '/images/raja_real_2.png',
    descMr: 'हस्तनिर्मित सुवर्ण सिंहासनावर आरूढ पीत पितांबरातील तेज:पुंज मूर्ती.',
    descEn: 'Ganesha idol in yellow clothing.'
  },
  {
    year: '2023',
    category: 'visarjan',
    titleMr: 'मयूरपंख कमान आगमन सोहळा',
    titleEn: 'Peacock Feathers',
    themeMr: 'राजेशाही दरबार',
    themeEn: '2023',
    heightMr: '१२ फूट',
    heightEn: '12 Feet',
    artistMr: 'मंडळ कार्यकर्ते',
    artistEn: 'Mandal Karyakartas',
    image: '/images/raja_real_3.png',
    descMr: 'आगमन सोहळ्यादरम्यान मयूरपंख कमानीतून भव्य मिरवणूक.',
    descEn: 'Ganesha idol with peacock feathers in the background.'
  },
  {
    year: '2022',
    category: 'aarti',
    titleMr: 'श्री मुख दर्शन व सुवर्ण मुकुट',
    titleEn: 'Gold Crown',
    themeMr: 'भक्तीची शुद्ध परंपरा',
    themeEn: '2022',
    heightMr: '१२ फूट',
    heightEn: '12 Feet',
    artistMr: 'मूर्तिकार श्री संतोष कांबळी',
    artistEn: 'Sculptor Shri Santosh Kambli',
    image: '/images/raja_real_4.png',
    descMr: 'सुवर्ण मुकुट आणि हास्याने मोहरलेले श्रींचे विलोभनीय मुखदर्शन.',
    descEn: 'Close-up photo of the Ganesha idol and crown.'
  },
  {
    year: '2021',
    category: 'decor',
    titleMr: 'गर्भगृह पुष्प शृंगार दर्शन',
    titleEn: 'Flower Wall',
    themeMr: 'राजेशाही मखमल व कमळ रचना',
    themeEn: '2021',
    heightMr: '१२ फूट',
    heightEn: '12 Feet',
    artistMr: 'मंडळ सजावट समिती',
    artistEn: 'Mandal Design Team',
    image: '/images/raja_real_5.png',
    descMr: '५००० हून अधिक ऑर्किड आणि झेंडूच्या फुलांच्या पार्श्वभूमीवर जांभळ्या पितांबरातील मूर्ती.',
    descEn: 'Ganesha idol in front of a flower wall.'
  },
  {
    year: '2020',
    category: 'aarti',
    titleMr: 'आरोग्य संकल्प व सुवर्ण पदकमयी रूप',
    titleEn: 'Silver Structure',
    themeMr: 'पर्यावरणपूरक माती व रौप्य सिंहासन',
    themeEn: '2020',
    heightMr: '१२ फूट',
    heightEn: '12 Feet',
    artistMr: 'मूर्तिकार श्री संतोष कांबळी',
    artistEn: 'Master Sculptor Shri Santosh Kambli',
    image: '/images/ganesha_2007.jpg',
    descMr: 'आरोग्य अभियान आणि रक्तदान शिबिरादरम्यान रौप्य सिंहासनावरील दर्शन.',
    descEn: 'Ganesha idol seated on a silver structure.'
  },
  {
    year: '2019',
    category: 'decor',
    titleMr: 'राजवाडा महामंडप व सुवर्ण मेघडंबरी',
    titleEn: 'Yellow Lights',
    themeMr: 'किल्ले रायगड व राजवाडा कला',
    themeEn: '2019',
    heightMr: '१२ फूट',
    heightEn: '12 Feet',
    artistMr: 'मंडळ मूर्तिकार',
    artistEn: 'Mandal Artisans & Sculptors',
    image: '/images/ganesha_pic2.jpg',
    descMr: 'सुवर्ण कमानींसह भव्य पारंपारिक मराठा राजवाड्याची सजावट.',
    descEn: 'Ganesha idol indoors surrounded by yellow lights.'
  },
  {
    year: '2018',
    category: 'visarjan',
    titleMr: 'भव्य विसर्जन मिरवणूक व तुतारी शंखनाद',
    titleEn: 'Chariot Structure',
    themeMr: 'पारंपारिक ढोल ताशा व गुलाल',
    themeEn: '2018',
    heightMr: '१२ फूट',
    heightEn: '12 Feet',
    artistMr: 'मंडळ कार्यकर्ते',
    artistEn: 'Mandal Karyakartas',
    image: '/images/ganesha_2013.jpg',
    descMr: 'बेलासिस रोड ते गिरगाव चौपाटीपर्यंत शाही रथातून भव्य मिरवणूक.',
    descEn: 'Ganesha idol outdoors on a chariot structure.'
  },
  {
    year: '2017',
    category: 'idols',
    titleMr: 'रत्नजडित मुकुट व पीतांबर शृंगार',
    titleEn: 'Gold Jewelry',
    themeMr: 'पारंपारिक मंदिर कोरीव काम',
    themeEn: '2017',
    heightMr: '१२ फूट',
    heightEn: '12 Feet',
    artistMr: 'मूर्तिकार श्री संतोष कांबळी',
    artistEn: 'Sculptor Shri Santosh Kambli',
    image: '/images/ganesha_2008.jpg',
    descMr: 'पारंपारिक कोल्हापुरी सुवर्ण दागिन्यांनी सजवलेली भव्य मूर्ती.',
    descEn: 'Ganesha idol wearing gold-colored jewelry.'
  },
  {
    year: '2009',
    category: 'idols',
    titleMr: 'सुवर्ण प्रभावळ व विलोभनीय रूप',
    titleEn: 'Gold Backdrop',
    themeMr: 'पारंपारिक सुवर्ण कला',
    themeEn: '2009',
    heightMr: '१२ फूट',
    heightEn: '12 Feet',
    artistMr: 'मूर्तिकार श्री संतोष कांबळी',
    artistEn: 'Master Sculptor Shri Santosh Kambli',
    image: '/images/ganesha_2009.jpg',
    descMr: 'गुलाबी पितांबरातील भव्य मूर्ती आणि पाठीमागे आकर्षक सुवर्ण प्रभावळ (२००९).',
    descEn: 'Ganesha idol in pink clothing with a gold backdrop.'
  },
  {
    year: '2003',
    category: 'idols',
    titleMr: 'शुभ्र मूर्ती व रौप्य मुकुट',
    titleEn: 'White Idol',
    themeMr: 'भक्तीची शुद्ध परंपरा',
    themeEn: '2003',
    heightMr: '१२ फूट',
    heightEn: '12 Feet',
    artistMr: 'मूर्तिकार श्री संतोष कांबळी',
    artistEn: 'Master Sculptor Shri Santosh Kambli',
    image: '/images/ganesha_2003.jpg',
    descMr: 'गडद जांभळ्या पितांबरातील शुभ्र मूर्ती आणि डोक्यावर भव्य रौप्य मुकुट (२००३).',
    descEn: 'White-colored Ganesha idol.'
  },
];

// Social Work Data
const socialWorkData = [
  {
    id: 'social-1',
    titleMr: 'शैक्षणिक मदत',
    titleEn: 'Educational Aid',
    categoryMr: 'शैक्षणिक मदत',
    categoryEn: 'Educational Aid',
    image: '/images/social_1.png',
    descMr: 'गरजू आणि होतकरू विद्यार्थ्यांना दरवर्षी मोफत शालेय साहित्य आणि शैक्षणिक मदत दिली जाते.',
    descEn: 'Free school supplies and educational aid are provided to needy and deserving students every year.'
  },
  {
    id: 'social-2',
    titleMr: 'वैद्यकीय मदत',
    titleEn: 'Medical Aid',
    categoryMr: 'वैद्यकीय',
    categoryEn: 'Medical',
    image: '/images/social_2.png',
    descMr: 'गरजू रुग्णांसाठी मोफत रुग्णवाहिका सेवा आणि तातडीची वैद्यकीय मदत उपलब्ध करून दिली जाते.',
    descEn: 'Providing free ambulance services and urgent medical aid to the needy patients.'
  },
  {
    id: 'social-3',
    titleMr: 'रक्तदान शिबीर',
    titleEn: 'Blood Donation Camp',
    categoryMr: 'आरोग्य',
    categoryEn: 'Healthcare',
    image: '/images/social_blood_donation.jpg',
    descMr: 'भारतीय नौदलाच्या INHS अश्विनी हॉस्पिटल, कुलाबा मुंबई यांच्या सहकार्याने मंडळातर्फे दरवर्षी भव्य रक्तदान शिबीर आयोजित केले जाते.',
    descEn: 'Grand Blood Donation Camp organized annually in collaboration with INHS Asvini Hospital, Indian Navy, Colaba Mumbai.'
  },
  {
    id: 'social-4',
    titleMr: 'आरोग्य तपासणी',
    titleEn: 'Health Checkup Camp',
    categoryMr: 'आरोग्य',
    categoryEn: 'Healthcare',
    image: '/images/social_4.png',
    descMr: 'परिसरातील नागरिकांसाठी मोफत आरोग्य तपासणी शिबीर.',
    descEn: 'Free health checkup camp organized for the local citizens.'
  },
  {
    id: 'social-5',
    titleMr: 'संस्थांना मदत',
    titleEn: 'Support to Institutes',
    categoryMr: 'सामाजिक कार्य',
    categoryEn: 'Social Impact',
    image: '/images/social_5.png',
    descMr: 'गरजू शैक्षणिक, वैद्यकीय आणि सामाजिक संस्थांना आर्थिक मदत व आवश्यक साहित्याचे वाटप.',
    descEn: 'Providing financial assistance and necessary materials to educational, medical, and social institutes in need.'
  },
  {
    id: 'social-6',
    titleMr: 'मास्क आणि सॅनिटायझर वाटप',
    titleEn: 'Mask & Sanitizer Distribution',
    categoryMr: 'आरोग्य',
    categoryEn: 'Healthcare',
    image: '/images/media_1787903804926.jpg',
    descMr: 'कोविड-१९ काळात गरजू नागरिकांना मास्क आणि सॅनिटायझर वाटप.',
    descEn: 'Distribution of masks and sanitizers to needy citizens during COVID-19.'
  },
  {
    id: 'social-7',
    titleMr: 'दिवाळी खाऊचे वाटप',
    titleEn: 'Diwali Sweets Distribution',
    categoryMr: 'सामाजिक कार्य',
    categoryEn: 'Social Impact',
    image: '/images/media_1787903910841.jpg',
    descMr: 'लोहारे शाळेतील विद्यार्थ्यांना मंडळाच्या वतीने दिवाळी खाऊचे वाटप.',
    descEn: 'Distribution of Diwali sweets to the students of Lohare School by the Mandal.'
  },
  {
    id: 'social-8',
    titleMr: 'पोलादपूर तालुक्यातील शाळांना मदत',
    titleEn: 'Aid to Poladpur Schools',
    categoryMr: 'शैक्षणिक मदत',
    categoryEn: 'Educational Aid',
    image: '/images/media_1787903953429.jpg',
    descMr: 'पोलादपूर तालुक्यातील १३ शाळांतील २८० आदिवासी व गरीब विद्यार्थ्यांसोबत शैक्षणिक साहित्य व दिवाळीचा फराळ वाटून दिवाळी साजरी.',
    descEn: 'Distribution of educational materials and Diwali snacks to 280 tribal and poor students across 13 schools in Poladpur taluka.'
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
      title: seo.pageMetadata.home.title,
      description: seo.pageMetadata.home.description,
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
      title: seo.pageMetadata.about.title,
      description: seo.pageMetadata.about.description,
      activeTab: 'about'
    });
  },

  // Render Schedule Page
  renderSchedulePage(req, res) {
    const status = db.getYatraStatus();
    res.render('schedule', {
      title: seo.pageMetadata.schedule.title,
      description: seo.pageMetadata.schedule.description,
      activeTab: 'schedule',
      yatraStatus: status,
      scheduleData
    });
  },

  // Render Glimpses Page
  renderGlimpsesPage(req, res) {
    res.render('glimpses', {
      title: seo.pageMetadata.glimpses.title,
      description: seo.pageMetadata.glimpses.description,
      activeTab: 'glimpses',
      glimpsesData
    });
  },

  // Render Decade Gallery (Renamed from Photo Booth)
  renderPhotoBoothPage(req, res) {
    res.render('photo-booth', {
      title: seo.pageMetadata.glimpses.title,
      description: seo.pageMetadata.glimpses.description,
      activeTab: 'photobooth',
      glimpsesData
    });
  },

  // Render Social Work Page
  renderSocialWorkPage(req, res) {
    res.render('social-work', {
      title: seo.pageMetadata.socialwork.title,
      description: seo.pageMetadata.socialwork.description,
      activeTab: 'socialwork',
      socialWorkData
    });
  },

  renderCommitteePage(req, res) {
    res.render('committee', {
      title: seo.pageMetadata.committee.title,
      description: seo.pageMetadata.committee.description,
      activeTab: 'committee',
      committeeData
    });
  },

  // Live Status API
  getLiveStatusApi(req, res) {
    const status = db.getYatraStatus();
    res.json({ success: true, status });
  },

  // Submit Contact Form Inquiry & Log to Google Sheets
  async submitContactForm(req, res) {
    try {
      const { name, contact, message, mandal } = req.body;
      if (!name || !contact || !message) {
        return res.status(400).json({ success: false, message: 'Missing required contact fields.' });
      }

      const isEmail = String(contact).includes('@');
      const contactData = {
        name: String(name).trim(),
        email: isEmail ? String(contact).trim() : '',
        phone: isEmail ? '' : String(contact).trim(),
        mandal: mandal || 'Mumbai Central',
        message: String(message).trim()
      };

      db.addLog('INQUIRY', `New Contact Inquiry: ${contactData.name} (${contactData.phone || contactData.email})`);
      googleSheets.appendContact(contactData).catch(err => console.error('GSheets Contact Log Error:', err.message));
      mailer.sendContactEmail(contactData).catch(err => console.error('SMTP Contact Email Error:', err.message));

      res.json({ success: true, message: 'Message successfully sent to Mandal!' });
    } catch (err) {
      console.error('Submit contact form error:', err);
      res.status(500).json({ success: false, message: 'Failed to submit contact message.' });
    }
  }
};
