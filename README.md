# SpendWise — Personal Expense Tracker 💰

> *"Understand your money. Control your spending."*

SpendWise is a full-stack personal finance and expense tracking application built to help users manage their daily expenses, track budgets, visualize spending patterns through interactive analytics, and achieve financial clarity.

---

## 🌐 Live Demo & Deployment

- **Live Application (Frontend)**: [https://subhk24.github.io/SpendWise/](https://subhk24.github.io/SpendWise/)
- **Live API (Backend)**: [https://spendwise-zoz7.onrender.com](https://spendwise-zoz7.onrender.com)
- **Interactive API Documentation (Swagger UI)**: [https://spendwise-zoz7.onrender.com/docs](https://spendwise-zoz7.onrender.com/docs)

> [!NOTE]
> *The backend is deployed on Render's free tier. If the service has been inactive for more than 15 minutes, the first request (e.g., login or registration) may take approximately 30–50 seconds while the server spins up.*

---

## 🛠️ Tech Stack & Architecture

### **Frontend**
- **Framework**: React 18 with TypeScript & Vite
- **Styling**: Tailwind CSS & Lucide React Icons
- **Routing**: React Router DOM (Single Page Application)
- **Charts & Data Viz**: Recharts
- **Hosting**: GitHub Pages with automated GitHub Actions CI/CD workflow

### **Backend**
- **Framework**: Python 3.12+ & FastAPI
- **Database & ORM**: SQLite (SQLAlchemy ORM)
- **Authentication**: JWT (JSON Web Tokens) with passlib & bcrypt password hashing
- **Validation**: Pydantic v2
- **Testing**: Pytest
- **Hosting**: Render (Web Service with automated deployments)

---

## ✨ Features

- 🔐 **Secure User Authentication**: JWT-based sign-up, sign-in, and password encryption.
- 💸 **Expense Management**: Add, view, edit, and delete expenses with category tagging, amounts, and dates.
- 📊 **Visual Analytics**: Interactive category breakdown charts and monthly spending trends powered by Recharts.
- 🔍 **Filtering & Search**: Search expenses by keyword and filter by specific categories and date ranges.
- 🌓 **Modern Responsive UI**: Clean interface built with Tailwind CSS, supporting seamless navigation across mobile and desktop.

---

## 💻 Local Development Setup

### 1. Prerequisites
- **Python 3.12+**
- **Node.js 18+** and **npm**

---

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create and activate a virtual environment
python -m venv .venv
source .venv/bin/activate    # On Windows: .venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Configure environment variables
cp .env.example .env

# Run database seed (creates demo account)
python app/seed.py

# Start FastAPI server
uvicorn app.main:app --reload --port 8000
