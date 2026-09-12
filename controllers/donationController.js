const db = require('../config/db');
const googleSheets = require('../config/googleSheets');
const pdfController = require('./pdfController');
const seo = require('../config/seo');

module.exports = {
  // Render Donation Page
  renderDonationPage(req, res) {
    res.render('donate', {
      title: seo.pageMetadata.donate.title,
      description: seo.pageMetadata.donate.description,
      activeTab: 'donate'
    });
  },

  // Create Donation Order Receipt Reference
  async createPaymentOrder(req, res) {
    try {
      const { amount } = req.body;
      if (!amount || parseFloat(amount) <= 0) {
        return res.status(400).json({ success: false, message: 'Invalid donation amount.' });
      }

      const tempReceiptNo = `MCC-REC-2026-${Math.floor(100 + Math.random() * 900)}`;

      res.json({
        success: true,
        receipt_no: tempReceiptNo
      });
    } catch (err) {
      console.error('Create donation receipt reference error:', err);
      res.status(500).json({ success: false, message: 'Failed to initiate donation receipt.' });
    }
  },

  // Confirm Donation & Save Record for Admin Approval
  async confirmDonation(req, res) {
    try {
      const {
        receipt_no, donor_name, phone, email, amount, utr_number, payment_id
      } = req.body;

      if (!donor_name || !phone || !amount || parseFloat(amount) <= 0) {
        return res.status(400).json({ success: false, message: 'Missing required donation details.' });
      }

      const utrVal = (utr_number || payment_id || '').trim();
      if (!utrVal || utrVal.length < 4) {
        return res.status(400).json({ success: false, message: 'कृपया वैध १२ अंकी Payment UTR / Transaction Ref No प्रविष्ट करा.' });
      }

      const donationData = {
        receipt_no: receipt_no || `MCC-REC-2026-${Math.floor(100 + Math.random() * 900)}`,
        donor_name: donor_name.trim(),
        phone: phone.trim(),
        email: (email || '').trim(),
        amount: parseFloat(amount),
        category: 'General Mandal Donation & Seva',
        payment_id: utrVal,
        order_id: `utr_${Date.now()}`,
        status: 'PENDING_APPROVAL'
      };

      const createdDonation = await db.createDonation(donationData);
      db.addLog('DONATION', `New Donation submitted (PENDING APPROVAL): ₹${createdDonation.amount} from ${createdDonation.donor_name} (UTR: ${utrVal})`);

      // Log to Google Sheets
      googleSheets.appendDonation(createdDonation).catch(err => console.error('GSheets Donation Log Error:', err.message));

      res.json({
        success: true,
        receipt_no: createdDonation.receipt_no,
        message: 'देणगी अर्ज यशस्वीरीत्या नोंदवला गेला आहे. मंडळ प्रशासकाच्या पडताळणीनंतर अधिकृत पावती तुमच्या ईमेलवर पाठवली जाईल.'
      });
    } catch (err) {
      console.error('Confirm donation error:', err);
      res.status(500).json({ success: false, message: 'Error recording donation.' });
    }
  },

  // Download PDF Receipt
  async downloadDonationReceipt(req, res) {
    const { receiptNo } = req.params;
    const donation = await db.getDonationByReceipt(receiptNo);

    if (!donation) {
      return res.status(404).send('Donation receipt not found.');
    }

    pdfController.generateDonationPDF(donation, res);
  }
};
