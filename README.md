# 💼 JobTracker with AI Insights

JobTracker is a modern, full-stack web application designed to help job seekers manage, organize, and optimize their job hunt. It features an interactive dashboard, a visual Kanban board, user authentication, and Gemini-powered **AI Insights** that act as a personal job hunt coach.

---

## 🚀 Key Features

*   **🔒 Secure Authentication**: Real-time user registration and login powered by JWT (JSON Web Tokens).
*   **📊 Dashboard Analytics**: Track core job hunt metrics including total applications, interview conversion rates, offers, rejections, and response rates.
*   **🗂 Visual Kanban Board**: View job applications categorized by status (`Applied`, `Interviewing`, `Offer`, `Rejected`) and easily move applications between columns.
*   **📝 Job Tracking (CRUD)**: Log applications with details such as Company, Role, Date Applied, Status, and notes.
*   **🤖 Gemini AI Coaching Insights**: Analyzes application numbers, dates, roles, and interview conversion ratios. Generates:
    *   **Health Score & Label** (0-100 score on your search momentum).
    *   **Strategic Summary** of your current job hunt status.
    *   **Categorized Insights** (Positive, Warnings, Tips).
    *   **Actionable Tips** to optimize your next steps.

---

## 🛠 Tech Stack

### Frontend
*   **Core**: React (built using `react-scripts`).
*   **Styling**: Modern inline Vanilla CSS (glassmorphism accents, harmony colors, responsive grids, and full dark-mode integration).
*   **State Management**: Hooks (`useState`, `useEffect`, `useCallback`) mapped to backend endpoints with automatic fallback storage logic.

### Backend
*   **Framework**: Node.js & Express.
*   **Database**: MongoDB (Mongoose ORM).
*   **Authentication**: JWT (JSON Web Token) with security middleware.
*   **AI Service**: Google Gemini API (**Gemini 2.5 Flash** on the `v1beta` endpoint with thinking mode configured for maximum performance and low latency).

---

## 📦 Project Structure

```
├── backend/
│   ├── middleware/        # Auth middleware (JWT checks)
│   ├── models/            # MongoDB schemas (User, Job)
│   ├── routes/            # API Router handlers (auth, jobs, insights)
│   ├── .env               # Backend environment secrets (DB connection, Gemini Key)
│   └── server.js          # Express app bootstrap
│
├── frontend/
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── components/    # Split UI Components (Navbar, LoginPage, Kanban, Dashboard, etc.)
│   │   ├── utils/         # Helper modules (storage, themes, constants)
│   │   ├── App.js         # Core application coordinator & API client
│   │   └── index.js       # React bootstrap
│   └── .env               # Frontend environment variables (API URL target)
│
└── README.md              # Project documentation (You are here)
```

---

## ⚙️ Setup and Installation

### Prerequisites
Make sure you have **Node.js (v18 or higher)** and **MongoDB** installed (or a MongoDB Atlas connection string).

---

### Step 1: Configure the Backend

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file inside the `backend` folder and populate it with your settings:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_signature_secret
   GEMINI_API_KEY=your_gemini_api_key
   ```
4. Start the backend server:
   ```bash
   npm start
   ```
   *(or `npm run dev` to start with nodemon)*

---

### Step 2: Configure the Frontend

1. Navigate to the `frontend` directory:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `frontend` folder to target the backend API:
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```
4. Start the React development server:
   ```bash
   npm start
   ```

Now open [http://localhost:3000](http://localhost:3000) in your browser to start using the app!

---

## 💡 How the AI Insights Engine Works
*   The application tracks the jobs you save in your database.
*   When visiting the **AI Insights** page, your application data (counts, roles, dates, and statuses) is compiled into a structured summary.
*   This summary is sent to the **Gemini 2.5 Flash** model with strict JSON response instructions.
*   To guarantee lightning-fast response times and zero token truncation, we explicitly set `thinkingBudget: 0`, giving you clean coaching tips immediately.
