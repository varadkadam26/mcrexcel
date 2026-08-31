# 🚩 Mumbai Central Cha Raja - Official Web Portal

> **BIT Chawl Belasis Road Sarvajanik Shree Ganesh Utsav**  
> *Reg No: A/3141/Mumbai/77 • Estd. 1929 • Mumbai Central, Mumbai - 400008*

Official digital web portal for **Mumbai Central Cha Raja**. Powered end-to-end by **Google Sheets & Drive Integration** as its primary cloud data engine, providing seamless real-time record synchronization for donations, T-shirt bookings, and contact inquiries without requiring a traditional SQL database setup!

---

## 🌟 Key Features

- **📊 End-to-End Google Sheets Database**: Live synchronization of all transactions, inquiries, and bookings directly into organized Google Spreadsheets and Drive storage.
- **🏛️ 24/7 Digital Temple & Live Darshan**: High-definition live stream embedding and real-time festival updates.
- **🌐 100% Bilingual (English & Marathi)**: Instant zero-leakage language translation engine.
- **💳 Online Seva & Donation Gateway (`Razorpay`)**: Preset & custom donation options for Mandap Seva, Medical Camps, and Blood Donation.
- **📜 Instant 80G Tax Exemption Receipts (`PDFKit`)**: Automated PDF receipt generation containing official 80G tax deduction details.
- **👕 Official T-Shirt Merchandise Store**: Size-wise stock booking with instant downloadable PDF pickup tokens.
- **📧 Email Notifications (`Nodemailer`)**: Automated email alerts for donations, bookings, and executive mailbox notifications.
- **🛡️ Executive Admin Control Panel (`/admin`)**: Real-time stats dashboard, spreadsheet data sync, and interactive log viewer.

---

## 🛠️ Tech Stack

- **Primary Cloud Database**: Google Sheets API & Google Drive API (`googleapis`)
- **Backend**: Node.js & Express.js
- **Frontend / Templating**: EJS (Embedded JavaScript), Vanilla CSS3 (Formal Royal Design System), Anime.js
- **Payment Processing**: Razorpay SDK
- **Email & PDF Engine**: Nodemailer (SMTP), PDFKit
- **Deployment**: Vercel ready (`vercel.json`)

---

## 📁 Directory Structure

```
mcrexcel-main/
├── config/             # Google Sheets API, Mailer, and SEO configurations
├── controllers/        # Express controllers (Donations, PDF, Yatra, Contact, T-Shirt)
├── modules/            # Helper utilities and background jobs
├── public/             # Static assets (CSS, JS, Images, Logo, Audio)
│   ├── css/            # Core stylesheet (Formal design system)
│   ├── js/             # Client-side scripts & i18n translation engine
│   └── images/         # Mandal crest, murti photos, committee images
├── routes/             # Express routing endpoints
├── views/              # EJS template views (Home, About, Donate, T-Shirt, Admin)
├── credentials.json    # Google Service Account Credentials
├── server.js           # Main application entry point
├── vercel.json         # Vercel deployment configuration
└── package.json        # Node dependencies and scripts
```

---

## 🚀 Getting Started

### 1. Prerequisites

- **Node.js**: v18.x or higher
- **npm**: v9.x or higher
- **Google Cloud Service Account**: `credentials.json` for Google Sheets API integration

### 2. Installation

```bash
# Clone repository
git clone https://github.com/PremB2907/mcrexcel.git
cd mcrexcel

# Install dependencies
npm install
```

### 3. Environment Setup

Create a `.env` file in the root directory:

```env
PORT=3000
SESSION_SECRET=your_secret_key
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
GOOGLE_SPREADSHEET_ID=your_google_sheet_id
```

### 4. Run Locally

```bash
# Start server
npm start
```

Access the application at **`http://localhost:3000`**.

---

## 📜 License & Copyright

© **BIT Chawl Belasis Road Sarvajanik Shree Ganesh Utsav**, Mumbai - 400008.  
All Rights Reserved. Organized by Belasis Road, B.I.T. Chawl Mandal (Estd. 1929).
