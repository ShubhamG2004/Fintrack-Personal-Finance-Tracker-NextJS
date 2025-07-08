# 💸 FinTrack – AI-Powered Expense & Income Tracker

FinTrack is a cross-platform personal finance tracking system designed to help users **monitor expenses and income**, **set monthly budgets**, and **gain AI-powered insights** for better financial decision-making. Built using modern web technologies, FinTrack offers a responsive and secure user experience with smart categorization, budget alerts, and report export capabilities.

---

## 🎯 Project Objective

To build an AI-powered, cross-platform expense and income tracking system that helps users monitor spending, set budgets, analyze trends, and make smarter financial decisions.

---

## 📦 System Components

### 🔹 Frontend (Client Layer)
**Built With:** `Next.js`, `React.js`, `Tailwind CSS`

**Responsibilities:**
- User login/signup and authentication UI
- Dashboard to view expense/income charts
- Forms to add/view/edit transactions
- Budget setting and tracking interface
- Export report settings
- Responsive design (Desktop, Tablet, Mobile)

---

### 🔹 Backend (API & Business Logic)
**Built With:** `Node.js`, `Express.js`

**Responsibilities:**
- Handle REST API requests
- Process business logic (e.g., budget validation)
- Communicate with PostgreSQL DB
- Route user data to AI service for categorization
- Session handling, token verification, auth control

---

### 🔹 AI Service Layer (Smart Categorization)
**Powered By:** `Google Gemini API` or `OpenAI API`

**Responsibilities:**
- Analyze transaction descriptions (e.g., "Uber trip")
- Automatically assign categories (e.g., Travel, Food)
- Suggest financial improvements (future scope)

---

### 🔹 Database Layer
**Database Used:** `PostgreSQL` (via Supabase, Neon, or ElephantSQL)

**Schema Overview:**
- `Users`: User profile and auth info
- `Transactions`: All expense/income entries
- `Budgets`: Monthly limits per category
- `Reports`: Exported file history

---

### 🔹 Export & Reporting Engine
**Tech Stack:** `jsPDF`, `SheetJS`

**Responsibilities:**
- Generate monthly/yearly PDF & Excel reports
- Include visual summaries and charts
- Allow direct download or cloud file delivery

---

### 🔹 Authentication & Access Control
**Built With:** `Clerk` or `Auth0`

**Features:**
- Secure login/signup
- Email & password authentication
- Role-based access control (Admin/User)
- JWT & session token management

---

### 🔹 Cloud Hosting & Storage
**Tools Used:** `Vercel`, `Firebase Storage`, `AWS S3`, `Render`

**Responsibilities:**
- Host frontend and backend separately
- Store generated reports securely
- Ensure high uptime and fast deployment

---

## 📊 System Workflow

```plaintext
1. User logs in via Clerk/Auth0
2. On dashboard, user adds a new transaction
3. Description sent to AI → categorized automatically
4. Backend saves transaction with AI category
5. Dashboard updates summaries and graphs
6. Budget data is checked for limit violations
7. Alerts generated if overspending occurs
8. User exports data to PDF/Excel → stored/downloaded
