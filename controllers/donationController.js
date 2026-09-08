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

  // Confirm Donation & Save Record
  async confirmDonation(req, res) {
    try {
      const {
        receipt_no, donor_name, phone, email, amount,
        payment_id, order_id, pan_number
      } = req.body;

      if (!donor_name || !phone || !amount) {
        return res.status(400).json({ success: false, message: 'Missing required donation details.' });
      }

      const donationData = {
        receipt_no: receipt_no || `MCC-REC-2026-${Math.floor(100 + Math.random() * 900)}`,
        donor_name: donor_name.trim(),
        phone: phone.trim(),
        email: (email || '').trim(),
        amount: parseFloat(amount),
        category: 'General Mandal Donation & Seva',
        payment_id: payment_id || `upi_direct_${Date.now()}`,
        order_id: order_id || `order_direct_${Date.now()}`,
        pan_number: (pan_number || '').toUpperCase().trim(),
        status: 'SUCCESS'
      };

      const createdDonation = await db.createDonation(donationData);
      db.addLog('DONATION', `New Donation received: ₹${createdDonation.amount} from ${createdDonation.donor_name}`);

      // Log to Google Sheets
      googleSheets.appendDonation(createdDonation).catch(err => console.error('GSheets Donation Log Error:', err.message));

      res.json({
        success: true,
        receipt_no: createdDonation.receipt_no,
        message: 'Donation successfully recorded. Thank you for your Seva!'
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
