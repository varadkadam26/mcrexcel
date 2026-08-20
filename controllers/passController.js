const db = require('../config/db');
const twilio = require('../config/twilio');
const pdfController = require('./pdfController');

module.exports = {
  // Render Pass Registration Form
  renderRegisterPage(req, res) {
    res.render('register-pass', {
      title: 'Devotee Pass Registration | Mumbai Central Cha Raja 2026',
      activeTab: 'register',
      query: req.query
    });
  },

  // Process Pass Registration Form Submission
  async handlePassRegistration(req, res) {
    try {
      const {
        full_name, phone, email, age, gender, city, batch,
        emergency_contact, id_proof_type, id_proof_number, photo_data
      } = req.body;

      if (!full_name || !phone || !age || !gender || !city || !batch || !emergency_contact || !id_proof_type || !id_proof_number) {
        return res.render('register-pass', {
          title: 'Devotee Pass Registration | Mumbai Central Cha Raja',
          activeTab: 'register',
          error: 'Please fill in all mandatory fields before submitting your registration.',
          formData: req.body
        });
      }

      // Generate unique pass code format: MCC-2026-XXXX
      const pass_code = `MCC-2026-${Math.floor(1000 + Math.random() * 9000)}`;

      const passData = {
        pass_code,
        full_name: full_name.trim(),
        phone: phone.trim(),
        email: (email || '').trim(),
        age: parseInt(age, 10),
        gender,
        city: city.trim(),
        batch,
        emergency_contact: emergency_contact.trim(),
        id_proof_type,
        id_proof_number: id_proof_number.trim(),
        photo_url: photo_data || '/images/logo.png',
        status: 'Confirmed'
      };

      const createdPass = await db.createPass(passData);
      db.addLog('PASS', `New Pass generated: ${pass_code} for ${full_name}`);

      // Dispatch Twilio SMS asynchronously
      twilio.sendPassConfirmation(createdPass).catch(err => console.error('SMS send error:', err));

      res.redirect(`/pass-status?code=${pass_code}&success=true`);
    } catch (err) {
      console.error('Pass registration error:', err);
      res.render('register-pass', {
        title: 'Devotee Pass Registration | Mumbai Central Cha Raja',
        activeTab: 'register',
        error: 'An error occurred while creating your pass. Please try again.',
        formData: req.body
      });
    }
  },

  // Render Pass Lookup & Status Page
  async renderPassStatusPage(req, res) {
    const searchCode = req.query.code || req.query.phone;
    let foundPass = null;
    let searched = false;

    if (searchCode) {
      searched = true;
      foundPass = (searchCode.startsWith('MCC') || searchCode.startsWith('SLP'))
        ? await db.getPassByCode(searchCode)
        : await db.getPassByPhone(searchCode);
    }

    res.render('pass-status', {
      title: 'Pass Verification Portal | Mumbai Central Cha Raja',
      activeTab: 'pass-status',
      searchCode: searchCode || '',
      pass: foundPass,
      searched,
      successMessage: req.query.success === 'true' ? 'Your Devotee Pass has been successfully registered and confirmed!' : null
    });
  },

  // Download PDF Pass
  async downloadPassPDF(req, res) {
    const { code } = req.params;
    const pass = await db.getPassByCode(code);

    if (!pass) {
      return res.status(404).send('Pass record not found. Please check your registration code.');
    }

    pdfController.generatePassPDF(pass, res);
  }
};
