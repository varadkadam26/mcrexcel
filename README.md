# 🚩 Mumbai Central Cha Raja - Official Web Portal

> **BIT Chawl Belasis Road Sarvajanik Shree Ganesh Utsav**  
> *Reg No: A/3141/Mumbai/77 • Estd. 1929 • Mumbai Central, Mumbai - 400008*

Official digital web portal for **Mumbai Central Cha Raja**, providing global devotees with 24/7 Live Darshan, online Seva donations with instant 80G tax exemption receipts, official T-Shirt merchandise booking, interactive schedule & yatra timelines, and an executive administration management system.

---

## 🌟 Key Features

- **🏛️ 24/7 Digital Temple & Live Darshan**: High-definition live stream embedding and real-time festival notifications.
- **🌐 100% Bilingual (English & Marathi)**: Instant zero-leakage language switcher engine.
- **💳 Online Seva & Donation Gateway (`Razorpay`)**: Custom & preset donation tiers supporting Mandap Seva, Medical Camps, and Blood Donation.
- **📜 Instant 80G Tax Exemption Receipts (`PDFKit`)**: Automated PDF receipt generation containing official 80G tax deduction details.
- **👕 Official T-Shirt Merchandise Store**: Size-wise stock booking with instant downloadable PDF pickup tokens.
- **📊 Automated Google Sheets Logging (`googleapis`)**: Real-time logging of Donations, Contact Inquiries, and T-Shirt Bookings directly to Google Sheets & Drive.
- **📧 Nodemailer Email Notifications**: Automated email confirmation alerts sent to devotees and mandal executives.
- **🛡️ Executive Admin Control Panel (`/admin`)**: Real-time stats dashboard, interactive log viewer, and data management.

---

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Frontend / Templating**: EJS (Embedded JavaScript), Vanilla CSS3 (Formal Royal Design System), Anime.js
- **Database**: MySQL2 (with offline fallback data store)
- **Payment Processing**: Razorpay SDK
- **Cloud & Automation**: Google Sheets API & Google Drive API (`googleapis`), Node-Cron
- **Email & PDF Engine**: Nodemailer (SMTP), PDFKit
- **Deployment**: Vercel ready (`vercel.json`)

---

## 📁 Directory Structure

```
mcrexcel-main/
├── config/             # Database, Mailer, SEO, and Google API configurations
├── controllers/        # Express controllers (Donations, PDF, Yatra, Contact, T-Shirt)
├── modules/            # Helper utilities and background jobs
├── public/             # Static assets (CSS, JS, Images, Logo, Audio)
│   ├── css/            # Core stylesheet (Formal design system)
│   ├── js/             # Client-side scripts & i18n translation engine
│   └── images/         # Mandal crest, murti photos, committee images
├── routes/             # Express routing endpoints
├── views/              # EJS template views (Home, About, Donate, T-Shirt, Admin)
├── .env.example        # Environment variable template
├── server.js           # Main application entry point
├── vercel.json         # Vercel deployment configuration
└── package.json        # Node dependencies and scripts
```

---

## 🚀 Getting Started

### 1. Prerequisites

- **Node.js**: v18.x or higher
- **npm**: v9.x or higher

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
```

### 4. Run Locally

```bash
# Start development server
npm start
```

Access the application at **`http://localhost:3000`**.

---

## 📜 License & Copyright

© **BIT Chawl Belasis Road Sarvajanik Shree Ganesh Utsav**, Mumbai - 400008.  
All Rights Reserved. Organized by Belasis Road, B.I.T. Chawl Mandal (Estd. 1929).
