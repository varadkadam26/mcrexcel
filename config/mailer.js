const nodemailer = require('nodemailer');

const SMTP_USER = process.env.SMTP_USER || 'mitramsolutions@gmail.com';
const SMTP_PASS = process.env.SMTP_PASS || 'tkkduqiehkpzwejr';
const MANDAL_EMAIL = process.env.MANDAL_EMAIL || 'mumbaicentralcharaja@gmail.com';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS
  }
});

/**
 * Send Contact Us Form Notification Email
 */
async function sendContactEmail({ name, email, phone, message, mandal }) {
  try {
    const userEmail = email && email.includes('@') ? email : null;
    const recipientTo = MANDAL_EMAIL;
    const recipientCc = userEmail ? userEmail : undefined;

    const mailOptions = {
      from: `"Mumbai Central Cha Raja Portal" <${SMTP_USER}>`,
      to: recipientTo,
      cc: recipientCc,
      subject: `🚩 New Contact Inquiry: ${name} - Mumbai Central Cha Raja Portal`,
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #FFFBEB; padding: 20px; border-radius: 10px; border: 2px solid #D4AF37;">
          <h2 style="color: #800020; border-bottom: 2px solid #D4AF37; padding-bottom: 10px;">
            🚩 मुंबई सेंट्रलचा राजा - नवीन संपर्क संदेश / Inquiry
          </h2>
          
          <table style="width: 100%; font-size: 15px; border-collapse: collapse; margin-top: 15px;">
            <tr>
              <td style="padding: 8px; font-weight: bold; color: #4A0E0E; width: 140px;">Name / नाव:</td>
              <td style="padding: 8px; color: #1E293B;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; color: #4A0E0E;">Email ID:</td>
              <td style="padding: 8px; color: #1E293B;">${email || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; color: #4A0E0E;">Phone / Mobile:</td>
              <td style="padding: 8px; color: #1E293B;">${phone || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; color: #4A0E0E;">Mandal:</td>
              <td style="padding: 8px; color: #1E293B;">${mandal || 'Mumbai Central'}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; color: #4A0E0E; vertical-align: top;">Message / संदेश:</td>
              <td style="padding: 8px; color: #1E293B; background: #FFFFFF; border-radius: 6px; border: 1px solid #CBD5E1;">${message}</td>
            </tr>
          </table>

          <div style="margin-top: 20px; padding-top: 15px; border-top: 1px solid #CBD5E1; font-size: 12px; color: #64748B; text-align: center;">
            Sent automatically via <strong>Mumbai Central Cha Raja Digital Portal</strong> | Powered By MITRAM
          </div>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ [Nodemailer] Contact email sent successfully:', info.messageId);
    return true;
  } catch (err) {
    console.error('❌ [Nodemailer] Error sending contact email:', err.message);
    return false;
  }
}

/**
 * Send Approved Donation PDF Receipt Email to Donor
 */
async function sendDonationReceiptEmail({ donation, pdfBuffer }) {
  try {
    const userEmail = (donation.email && donation.email.includes('@')) ? donation.email : null;
    const recipientTo = userEmail ? userEmail : MANDAL_EMAIL;
    const recipientCc = userEmail ? MANDAL_EMAIL : undefined;

    const mailOptions = {
      from: `"Mumbai Central Cha Raja Portal" <${SMTP_USER}>`,
      to: recipientTo,
      cc: recipientCc,
      subject: `🚩 Official Donation Receipt: ${donation.receipt_no} - Mumbai Central Cha Raja`,
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #FFFBEB; padding: 25px; border-radius: 12px; border: 2px solid #D4AF37; max-width: 600px; margin: 0 auto;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h1 style="color: #800020; margin: 0; font-size: 22px;">मुंबई सेंट्रलचा राजा</h1>
            <p style="color: #92400E; margin: 5px 0 0; font-size: 13px; font-weight: bold;">बी.आय.टी. चाळ बेलासिस रोड सार्वजनिक श्री गणेशोत्सव मंडळ (स्थापना १९२९)</p>
          </div>
          
          <div style="background: #FFFFFF; padding: 20px; border-radius: 8px; border: 1px solid #FCD34D;">
            <h3 style="color: #4A0E0E; margin-top: 0; border-bottom: 2px solid #F59E0B; padding-bottom: 8px;">
              🚩 अधिकृत देणगी पावती मंजूर करण्यात आली आहे!
            </h3>
            
            <p style="color: #334155; font-size: 14px; line-height: 1.6;">
              जय देव, जय देव! श्री गणेशमूर्तीचे आशीर्वाद तुमच्या पाठीशी राहोत. <strong>${donation.donor_name}</strong>, तुमच्या देणगी अर्जाची मंडळ प्रशासकाकडून यशस्वी पडताळणी झाली असून अधिकृत पावती या ईमेलसोबत जोडली आहे.
            </p>

            <table style="width: 100%; font-size: 14px; margin: 15px 0; border-collapse: collapse; background: #FFFBEB; padding: 12px; border-radius: 6px;">
              <tr>
                <td style="padding: 6px; font-weight: bold; color: #4A0E0E;">पावती क्रमांक / Receipt No:</td>
                <td style="padding: 6px; font-weight: bold; color: #800020;">${donation.receipt_no}</td>
              </tr>
              <tr>
                <td style="padding: 6px; font-weight: bold; color: #4A0E0E;">देणगी रक्कम / Amount:</td>
                <td style="padding: 6px; font-weight: bold; color: #B45309; font-size: 16px;">₹ ${parseFloat(donation.amount).toLocaleString('en-IN')}/-</td>
              </tr>
              <tr>
                <td style="padding: 6px; font-weight: bold; color: #4A0E0E;">Payment UTR / Ref No:</td>
                <td style="padding: 6px; color: #1E293B;">${donation.payment_id || donation.utr_number || 'N/A'}</td>
              </tr>
            </table>

            <p style="color: #64748B; font-size: 13px;">
              आपली अधिकृत PDF पावती डाऊनलोड करण्यासाठी सोबत जोडलेली फाईल (<strong>Receipt_${donation.receipt_no}.pdf</strong>) उघडा.
            </p>
          </div>

          <div style="margin-top: 20px; text-align: center; font-size: 12px; color: #64748B;">
            गणपती बाप्पा मोरया! | <strong>मुंबई सेंट्रलचा राजा डिजिटल पोर्टल</strong> | Powered By MITRAM
          </div>
        </div>
      `,
      attachments: [
        {
          filename: `Receipt_${donation.receipt_no}.pdf`,
          content: pdfBuffer,
          contentType: 'application/pdf'
        }
      ]
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ [Nodemailer] Approved donation receipt email sent to:', recipientTo, info.messageId);
    return true;
  } catch (err) {
    console.error('❌ [Nodemailer] Error sending donation receipt email:', err.message);
    return false;
  }
}

module.exports = {
  transporter,
  sendContactEmail,
  sendDonationReceiptEmail
};
