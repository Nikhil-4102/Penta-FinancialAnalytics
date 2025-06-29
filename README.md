<h1 align="center">💸 Financial Analytics Dashboard</h1>

<p align="center">
A full-stack MERN-based financial analytics dashboard to visualize revenue, manage transactions, and export CSV reports.
</p>

---

## 🚀 Features

### 🔐 Authentication & Security

- JWT-based login/signup
- HTTP-only secure cookie storage
- Role-based route protection
- Admin-only access to analytics

---

<div align="center">
  <img src="https://github.com/user-attachments/assets/ceea2a5e-38cf-49c3-a58b-2d4ca5ca9618" width="48%" />
  <img src="https://github.com/user-attachments/assets/da6de280-6623-4132-9325-90f92125532d" width="48%" />
</div>

---

## 📊 Financial Dashboard

- Dynamic Revenue vs Expense chart:
  - Monthly, Weekly, Yearly toggle
- Real-time summary cards:
  - Balance, Revenue, Expenses, Savings
- Recent transactions with avatars & timestamps

<p align="center">
  <img src="https://github.com/user-attachments/assets/6fc22222-c531-4ff8-a49b-b20c730dbfaf" width="90%"/>
</p>

---

## 📁 Transactions Table

- Search by user or status
- Filter by date
- Sort by newest/oldest
- Paginated "Show More"
- Color-coded badges (Green → Revenue, Red → Expenses)

<p align="center">
  <img src="https://github.com/user-attachments/assets/9cfdc2f4-9b26-4ba3-9d20-8e54bd7ea08a" width="90%"/>
</p>

---

## 📤 CSV Export System

- Column selection for export
- CSV generated on server using `json2csv`
- Auto-download triggered once ready

<p align="center">
  <img src="https://github.com/user-attachments/assets/47cab736-ae68-4d09-aff0-0ba76bde20c9" width="80%"/>
  <br/><br/>
  <img src="https://github.com/user-attachments/assets/2c00b982-d215-438d-9da2-8521953ed53a" width="80%"/>
</p>

---

## ⚙ Tech Stack

### 🖥 Frontend
- React.js + TypeScript
- Vite
- TailwindCSS
- Recharts (SharCN)
- React Router DOM
- Axios
- React Toastify

### 🔧 Backend
- Node.js + Express.js
- MongoDB + Mongoose
- JWT + Bcrypt
- Cookie-parser
- json2csv

## WildCard Route Handling
<p align="center">
  <img src="https://github.com/user-attachments/assets/fa1b2e95-8a05-419e-ba8c-bbeaee6c56d6" width="70%"/>
  <br/><br/>
  <img src="https://github.com/user-attachments/assets/fd95ac6a-0466-4dd0-8515-32fe389a4b80" width="70%"/>
  <br/><br/>

## MongoDB Compass 
<p align="center">
  <img src="https://github.com/user-attachments/assets/355d6f63-390d-4356-9444-1f9a2ade3fad" width="70%"/>
</p>
---

## 📁 Folder Structure

```bash
FinancialAnalytics/
│
├── Backend/              # Node.js + Express backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/       # Auth & role protection
│   ├── utils/
│   └── index.ts
│
├── Frontend/             # React + Tailwind + Vite frontend
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   └── App.tsx
│
└── README.md
