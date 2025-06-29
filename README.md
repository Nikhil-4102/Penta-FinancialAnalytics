# 💸 Financial Analytics Dashboard

A full-stack MERN-based financial analytics dashboard designed to help analysts visualize revenue & expenses, track transactions, and export reports seamlessly.

---

## 🚀 Features

### 🔐 Authentication & Security
- JWT-based login/signup system  
- Secure cookie-based token storage (HTTP-only)
- 🔒 Protected **Admin Routes** (Only logged-in admins can access dashboard pages)
- Role-based route guards via Express middleware

---

![Screenshot 2025-06-29 170550](https://github.com/user-attachments/assets/ceea2a5e-38cf-49c3-a58b-2d4ca5ca9618)
---

![Screenshot 2025-06-29 170609](https://github.com/user-attachments/assets/da6de280-6623-4132-9325-90f92125532d)
---

### 📊 Financial Dashboard
- Dynamic **Revenue vs Expense** chart with toggle views:
  - 📅 Monthly
  - 📆 Weekly
  - 📈 Yearly
- At-a-glance summary cards:
  - 💰 Balance
  - 📥 Revenue
  - 📤 Expenses
  - 🏦 Savings
  - ⏱ Recent transactions with avatars and real-time updates
    <hr>
---
![Screenshot 2025-06-29 170801](https://github.com/user-attachments/assets/6fc22222-c531-4ff8-a49b-b20c730dbfaf)
---
### 📁 Transactions Table
- 🔍 Real-time search by user & status
- 🗓 Filter by transaction date
- ⬇ Sort by date (Newest/Oldest)
- 📦 Paginated transaction display (Show More functionality)
- 🎨 Visual indicators:
  - Green for Revenue
  - Red for Expenses
  - Colored badges for transaction status
---
![Screenshot 2025-06-29 182106](https://github.com/user-attachments/assets/9cfdc2f4-9b26-4ba3-9d20-8e54bd7ea08a)

---

### 📤 CSV Export System
- 🧩 Column Selection: Choose which fields to export
- 🧾 Server-side CSV generation using `json2csv`
- ⬇ Auto-download once report is ready

---
![Screenshot 2025-06-29 171026](https://github.com/user-attachments/assets/47cab736-ae68-4d09-aff0-0ba76bde20c9)

---
![Screenshot 2025-06-29 171058](https://github.com/user-attachments/assets/2c00b982-d215-438d-9da2-8521953ed53a)

## 🛠 Tech Stack

### 🖥 Frontend
- ⚛️ React.js + TypeScript
- ⚡ Vite
- 💨 TailwindCSS
- 📊 SharCN ( Charts )
- 🌐 React Router DOM
- 🔔 React Toastify for notifications
- 📦 Axios for API communication

### ⚙ Backend
- 🟢 Node.js + Express.js
- 🍃 MongoDB + Mongoose
- 🔐 JWT for authentication
- 🧂 Bcrypt for password hashing
- 📄 `json2csv` for CSV exports
- 🍪 Cookie-parser for token management

---
![Screenshot 2025-06-29 171132](https://github.com/user-attachments/assets/fa1b2e95-8a05-419e-ba8c-bbeaee6c56d6)
---
![Screenshot 2025-06-29 175621](https://github.com/user-attachments/assets/2a3b3ead-4cc9-440e-9d13-e51b0e1722cc)
---
![Screenshot 2025-06-29 175729](https://github.com/user-attachments/assets/355d6f63-390d-4356-9444-1f9a2ade3fad)
---

## 📁 Folder Structure

```bash
FinancialAnalytics/
│
├── Backend/              # Express + MongoDB backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/       # Auth guards, role protection
│   ├── utils/
│   └── index.ts
│
├── Frontend/             # React + Vite + Tailwind frontend
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   └── App.tsx
│
└── README.md

---

