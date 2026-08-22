# SpendWise — Personal Expense Tracker

"Understand your money. Control your spending."

SpendWise is a personal finance dashboard engineered for tracking expenses, analyzing categorical spending patterns, and discovering financial insights.

---

## Technical Architecture

- **Backend**: Python 3.12+, FastAPI, SQLAlchemy ORM, Pydantic v2, Pytest, JWT Authentication.
- **Frontend**: React 18, Vite, TypeScript, Tailwind CSS, Recharts, Lucide Icons.
- **Database**: SQLite (local development) / PostgreSQL-compatible architecture.

---

## Local Development Setup

### 1. Prerequisites
- Python 3.12+
- Node.js 18+ and npm

### 2. Backend Setup
```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
python app/seed.py         # Seeds demo account (demo@spendwise.com / Password123!)
uvicorn app.main:app --reload --port 8000