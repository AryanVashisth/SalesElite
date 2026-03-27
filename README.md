# SalesElite India 🚀

Reverse recruiting platform for India's top 1% sales representatives. Built for scale using Next.js 15, FastAPI, and PostgreSQL.

## Features
- **Anonymous Verified Profiles**: Reps upload Form 16s/W2s; AI (OCR + GPT-4o-mini) extracts and anonymizes metrics.
- **Rich Next.js 15 Frontend**: Glassmorphism aesthetic, multilingual routing (English/Hindi).
- **Company Subscriptions**: Search top reps, pay subscription via Razorpay.
- **FastAPI Backend**: SQLAlchemy, JWT Auth, background Celery tasks for processing docs.

## Setup & Run Locally (Zero Config)
1. **Prerequisites**: Python 3.12+, Node.js 20+, Docker (optional, for Redis/PG).
2. **Start Database**: 
   ```bash
   docker-compose up -d
   ```
3. **Backend Setup**:
   ```bash
   cd backend
   python3 -m venv venv
   source venv/bin/activate
   pip install fastapi uvicorn sqlalchemy 'psycopg[binary]' redis celery alembic pydantic pydantic-settings python-multipart easyocr openai razorpay pytest sentry-sdk
   alembic upgrade head
   python seed.py
   uvicorn app.main:app --reload
   ```
4. **Frontend Setup**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
5. Open `http://localhost:3000/en` in your browser.

## Environment Variables
Create `.env` in `backend/`:
```env
DATABASE_URL=postgresql+psycopg://postgres:password@localhost:5432/saleselite
OPENAI_API_KEY=sk-...
RAZORPAY_KEY_ID=...
RAZORPAY_KEY_SECRET=...
SUPABASE_JWT_SECRET=...
REDIS_URL=redis://localhost:6379/0
SENTRY_DSN=...
```

Create `.env.local` in `frontend/`:
```env
NEXT_PUBLIC_POSTHOG_KEY=...
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Deployment Guide (1-Click Ready)
- **Frontend (Vercel)**: Connect the GitHub repository to Vercel. Set the build command to `npm run build`. Provide the `NEXT_PUBLIC_*` environment variables.
- **Backend (Render / Heroku)**: 
  - Deploy as a Web Service: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
  - Deploy as a Background Worker: `celery -A app.ai.celery_app worker -loglevel=info`
- **Database**: Use Supabase Postgres or AWS RDS.
