const db = require('../config/db');

const ADMIN_USER = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASS = process.env.ADMIN_PASSWORD || 'admin123';

let activeAdminSessions = new Set();

module.exports = {
  requireAuth(req, res, next) {
    const authHeader = req.headers.cookie || '';
    const sessionMatch = authHeader.match(/saileela_admin_session=([^;]+)/);
    const sessionToken = sessionMatch ? sessionMatch[1] : null;

    if (sessionToken && activeAdminSessions.has(sessionToken)) {
      req.isAdmin = true;
      return next();
    }

    if (req.xhr || req.headers.accept?.includes('json')) {
      return res.status(401).json({ success: false, message: 'Admin authentication required.' });
    }
    res.redirect('/admin/login');
  },

  renderLoginPage(req, res) {
    const authHeader = req.headers.cookie || '';
    const sessionMatch = authHeader.match(/saileela_admin_session=([^;]+)/);
    const sessionToken = sessionMatch ? sessionMatch[1] : null;

    if (sessionToken && activeAdminSessions.has(sessionToken)) return res.redirect('/admin');

    res.render('admin/login', {
      title: 'Admin Desk | Mumbai Central Cha Raja',
      activeTab: 'admin',
      error: null,
      username: 'admin'
    });
  },

  handleLogin(req, res) {
    const { username, password } = req.body;
    if (username === ADMIN_USER && password === ADMIN_PASS) {
      const sessionToken = `session_${Date.now()}_${Math.random().toString(36).substring(2)}`;
      activeAdminSessions.add(sessionToken);
      res.setHeader('Set-Cookie', `saileela_admin_session=${sessionToken}; Path=/; HttpOnly; SameSite=Lax`);
      db.addLog('AUTH', `Admin logged in successfully (${username}).`);
      return res.redirect('/admin');
    }

    res.render('admin/login', {
      title: 'Admin Desk | Mumbai Central Cha Raja',
      activeTab: 'admin',
      error: 'Invalid username or password. Please try again.',
      username: username || 'admin'
    });
  },

  handleLogout(req, res) {
    const authHeader = req.headers.cookie || '';
    const sessionMatch = authHeader.match(/saileela_admin_session=([^;]+)/);
    const sessionToken = sessionMatch ? sessionMatch[1] : null;
    if (sessionToken) activeAdminSessions.delete(sessionToken);
    res.setHeader('Set-Cookie', 'saileela_admin_session=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT');
    db.addLog('AUTH', 'Admin logged out.');
    res.redirect('/admin/login');
  },

  async renderDashboard(req, res) {
    try {
      const passes = await db.getPasses();
      const donations = await db.getDonations();
      const tshirtOrders = await db.getTshirtOrders();
      const offlineDonations = await db.getOfflineDonations();
      const offlineTshirtOrders = await db.getOfflineTshirtOrders();
      const yatraStatus = db.getYatraStatus();
      const logs = db.getLogs();

      const totalDonations = donations.reduce((sum, d) => sum + (parseFloat(d.amount) || 0), 0);
      const offlineDonationTotal = offlineDonations.reduce((sum, d) => sum + (parseFloat(d.amount) || 0), 0);
      const combinedDonationTotal = totalDonations + offlineDonationTotal;

      const onlineTshirtTotal = tshirtOrders.reduce((sum, o) => sum + (parseFloat(o.total_amount) || 0), 0);
      const offlineTshirtTotal = offlineTshirtOrders.reduce((sum, o) => sum + (parseFloat(o.amount) || 0), 0);
      const combinedTshirtTotal = onlineTshirtTotal + offlineTshirtTotal;

      res.render('admin/dashboard', {
        title: 'Admin Control Panel | Mumbai Central Cha Raja',
        activeTab: 'admin',
        passes,
        donations,
        tshirtOrders,
        offlineDonations,
        offlineTshirtOrders,
        yatraStatus,
        logs,
        totalDonations,
        offlineDonationTotal,
        combinedDonationTotal,
        onlineTshirtTotal,
        offlineTshirtTotal,
        combinedTshirtTotal,
        totalPasses: passes.length,
        query: req.query
      });
    } catch (error) {
      console.error('ADMIN DASHBOARD ERROR:', error);
      res.status(500).send(`Unhandled Server Error: ${error.message}`);
    }
  },

  async verifyPassApi(req, res) {
    const { code } = req.body;
    if (!code) return res.status(400).json({ success: false, message: 'Pass code is required.' });
    const pass = await db.getPassByCode(code);
    if (!pass) return res.json({ success: false, message: 'Invalid or unregistered pass code.' });
    res.json({ success: true, pass, message: `Pass Verified: ${pass.full_name} (${pass.batch})` });
  },

  async sendBroadcastSMS(req, res) {
    try {
      const { message } = req.body;
      if (!message || message.trim().length === 0) return res.redirect('/admin?broadcast_error=Message content cannot be empty.');
      const passes = await db.getPasses();
      let sentCount = 0;
      for (const pass of passes) {
        if (pass.phone) {
          console.log(`[BROADCAST SIMULATION] Announcement to ${pass.phone}: ${message.trim()}`);
          sentCount++;
        }
      }
      db.addLog('BROADCAST', `SMS broadcast sent to ${sentCount} registered devotees.`);
      res.redirect(`/admin?broadcast_success=Announcement sent successfully to ${sentCount} registered devotees.`);
    } catch (err) {
      console.error('Broadcast error:', err);
      res.redirect('/admin?broadcast_error=Failed to dispatch broadcast messages.');
    }
  },

  async clearAllData(req, res) {
    try {
      const googleSheets = require('../config/googleSheets');
      await db.clearAllEntries();
      await googleSheets.clearAllSheets();
      db.addLog('SYSTEM', 'All test entries and connected Excel/Google Sheets data cleared by admin.');
      res.redirect('/admin?broadcast_success=All test entries and connected Google Sheets data deleted successfully.');
    } catch (err) {
      console.error('Clear data error:', err);
      res.redirect('/admin?broadcast_error=Failed to clear entries.');
    }
  },

  async approveDonation(req, res) {
    try {
      const { receipt_no } = req.body;
      if (!receipt_no) {
        return res.status(400).json({ success: false, message: 'Receipt number is required.' });
      }

      const donation = await db.getDonationByReceipt(receipt_no);
      if (!donation) {
        return res.status(404).json({ success: false, message: 'Donation receipt not found.' });
      }

      if (donation.status === 'APPROVED') {
        return res.json({ success: true, message: 'Donation is already approved.' });
      }

      await db.updateDonationStatus(receipt_no, 'APPROVED');
      donation.status = 'APPROVED';

      const pdfController = require('./pdfController');
      const pdfBuffer = await pdfController.generateDonationPDFBuffer(donation);

      const mailer = require('../config/mailer');
      await mailer.sendDonationReceiptEmail({ donation, pdfBuffer });

      db.addLog('APPROVAL', `Donation ${receipt_no} approved by Admin. Receipt emailed.`);

      if (req.xhr || req.headers.accept?.includes('json')) {
        return res.json({ success: true, message: `Donation ${receipt_no} approved & PDF receipt emailed!` });
      }
      res.redirect('/admin?broadcast_success=' + encodeURIComponent(`Donation ${receipt_no} approved and PDF receipt emailed!`));
    } catch (err) {
      console.error('Approve donation error:', err);
      if (req.xhr || req.headers.accept?.includes('json')) {
        return res.status(500).json({ success: false, message: 'Failed to approve donation.' });
      }
      res.redirect('/admin?broadcast_error=' + encodeURIComponent('Failed to approve donation: ' + err.message));
    }
  }
};
