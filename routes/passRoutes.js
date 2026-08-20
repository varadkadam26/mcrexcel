const express = require('express');
const router = express.Router();
const passController = require('../controllers/passController');

// Devotee Pass Registration & Status Routes
router.get('/register-pass', passController.renderRegisterPage);
router.post('/register-pass', passController.handlePassRegistration);
router.get('/pass-status', passController.renderPassStatusPage);
router.get('/download-pass/:code', passController.downloadPassPDF);

module.exports = router;
