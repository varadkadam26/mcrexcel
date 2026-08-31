# 🚩 Mumbai Central Cha Raja - Official Portal

A full-featured, executive web application for **Belasis Road, B.I.T. Chawl Sarvajanik Shri Ganeshotsav Mandal** (Reg No: A/3141/Mumbai/77). 

Built to handle digital temple portal, 24/7 live darshan, Razorpay donation handling with instant 80G tax benefit PDF receipts, Nodemailer SMTP email alerts, Google Sheets & Drive automated log management, and an executive Admin Management Control Panel.

---

## 🌟 Key Features

- **24/7 Live Aarti & Darshan**: Immersive digital temple experience for global devotees.
- **Online Seva & Donation Hub (`Razorpay`)**: Preset and custom donation options supporting Medical Camps, Blood Donation, and Mandap Seva.
- **80G Tax Exemption Receipts (`PDFKit`)**: Automated PDF receipt generation containing 80G tax deduction details.
- **Official T-Shirt Store & Pickup Tokens**: Seamless merchandise booking with downloadable PDF pickup tokens.
- **Google Sheets Automated Log Management**: Real-time logging of Donations, Contact Inquiries, and T-Shirt Bookings via Google Sheets API.
- **Nodemailer SMTP Email Alerts**: Instant email notifications for contact inquiries sent to Mandal executive mailbox.
- **Executive Admin Control Panel (`/admin`)**: Real-time metrics dashboard, log viewer, and data tables.

---

## 🛠️ Tech Stack

- **Backend Framework**: Node.js & Express.js
- **Template Engine**: EJS (Embedded JavaScript)
- **Database**: MySQL2 (with fallback data store)
- **Payment Gateway**: Razorpay SDK
- **Google Integration**: Google Sheets & Drive API (`googleapis`)
- **Email Service**: Nodemailer SMTP
- **PDF Generation**: PDFKit
- **Styling**: Vanilla CSS3 (Custom formal design system, Google Fonts)

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MySQL Server (Optional, app runs with built-in data store if offline)

### 2. Installation & Setup
```bash
# Clone repository
git clone https://github.com/PremB2907/saileela.git
cd saileela

# Install dependencies
npm install

# Setup Environment Variables
cp .env.example .env
```

### 3. Running the Application
```bash
# Start server
npm start
```
Open **`http://localhost:3000`** in your browser.

---

## 📄 License
Licensed under the ISC License. Organized by Shri Sai Leela Seva Trust. Om Sai Ram.
