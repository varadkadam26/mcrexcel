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

module.exports = {
  transporter,
  sendContactEmail
};
