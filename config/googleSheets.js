const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');

const SPREADSHEET_ID = process.env.GOOGLE_SPREADSHEET_ID || '1Cqs8R3GqMz6eBmqDSu7GWbOuBwfwVw2pZG2HcEiJIgc';

let sheetsClient = null;

function getSheetsClient() {
  if (sheetsClient) return sheetsClient;

  try {
    let auth;
    if (process.env.GOOGLE_CREDENTIALS_JSON) {
      const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS_JSON);
      auth = new google.auth.GoogleAuth({
        credentials,
        scopes: [
          'https://www.googleapis.com/auth/spreadsheets',
          'https://www.googleapis.com/auth/drive'
        ]
      });
    } else {
      const credentialsPath = process.env.GOOGLE_CREDENTIALS_PATH || path.join(__dirname, '../credentials.json');
      if (!fs.existsSync(credentialsPath)) {
        console.warn('⚠️ Google credentials file not found at:', credentialsPath);
        return null;
      }

      auth = new google.auth.GoogleAuth({
        keyFile: credentialsPath,
        scopes: [
          'https://www.googleapis.com/auth/spreadsheets',
          'https://www.googleapis.com/auth/drive'
        ]
      });
    }

    sheetsClient = google.sheets({ version: 'v4', auth });
    return sheetsClient;
  } catch (err) {
    console.error('❌ Failed to initialize Google Sheets client:', err.message);
    return null;
  }
}

/**
 * Helper to append a row of values to a specific sheet tab in Google Sheets
 */
async function appendRow(sheetName, valuesArray) {
  try {
    const client = getSheetsClient();
    if (!client) return false;

    const formattedDate = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });

    // Ensure the date column has the formatted date if not explicitly passed
    const rowData = [formattedDate, ...valuesArray];

    await client.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${sheetName}!A:Z`,
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values: [rowData]
      }
    });

    console.log(`✅ [Google Sheets] Logged new row to '${sheetName}':`, rowData);
    return true;
  } catch (err) {
    console.error(`❌ [Google Sheets] Error appending to tab '${sheetName}':`, err.message);
    return false;
  }
}

/**
 * Log new donation record to 'Donations' sheet tab
 */
async function appendDonation(donation) {
  // Columns: Date, DonorName, Amount, Email, Phone
  const rowValues = [
    donation.donor_name || donation.donorName || '',
    donation.amount || 0,
    donation.email || '',
    donation.phone || ''
  ];
  return appendRow('Donations', rowValues);
}

/**
 * Log contact form submission to 'ContactUs' sheet tab
 */
async function appendContact(contact) {
  // Columns: Date, Name, Email, Phone, Mandal, Message
  const rowValues = [
    contact.name || contact.fullName || '',
    contact.email || '',
    contact.phone || contact.mobile || '',
    contact.mandal || 'Mumbai Central',
    contact.message || contact.query || ''
  ];
  return appendRow('ContactUs', rowValues);
}

/**
 * Log T-Shirt booking order to 'TShirtBookings' sheet tab
 */
async function appendTshirtBooking(order) {
  // Columns: Date, CustomerName, Email, Phone, Size, Quantity, Design, Address
  const rowValues = [
    order.buyer_name || order.customerName || '',
    order.email || '',
    order.phone || '',
    order.size || '',
    order.quantity || 1,
    order.color || order.design || 'Official Cream',
    order.address || 'Mandap Counter Pickup'
  ];
  return appendRow('TShirtBookings', rowValues);
}

module.exports = {
  getSheetsClient,
  appendRow,
  appendDonation,
  appendContact,
  appendTshirtBooking,
  SPREADSHEET_ID
};
