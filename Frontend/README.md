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

### 📤 CSV Export System
- 🧩 Column Selection: Choose which fields to export
- 🧾 Server-side CSV generation using `json2csv`
- ⬇ Auto-download once report is ready

---

## 🛠 Tech Stack

### 🖥 Frontend
- ⚛️ React.js + TypeScript
- ⚡ Vite
- 💨 TailwindCSS
- 📊 Recharts (Charts & Graphs)
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

## 📁 Folder Structure

```bash
myapp/
│
├── backend/              # Express + MongoDB backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/       # Auth guards, role protection
│   ├── utils/
│   └── index.ts
│
├── frontend/             # React + Vite + Tailwind frontend
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   └── App.tsx
│
└── README.md
