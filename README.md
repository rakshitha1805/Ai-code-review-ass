# CodeGuard AI - AI-Powered Code Review Assistant & Security Auditor

![CodeGuard AI Banner](https://img.shields.io/badge/CodeGuard-AI-3B82F6?style=for-the-badge&logo=shieldcheck&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Gemini API](https://img.shields.io/badge/Google_Gemini-4285F4?style=for-the-badge&logo=google&logoColor=white)

**CodeGuard AI** is a full-stack, enterprise-grade AI-Powered Code Review Platform that integrates with GitHub Pull Requests to deliver automated code quality reviews, security vulnerability scanning, architectural principle enforcement (SOLID), and executive PDF audit reports beyond traditional linting tools.

---

## 🌟 Core Features

### 1. GitHub Pull Request Integration
- **OAuth & Webhooks**: Connects to GitHub repositories via OAuth and listens to Pull Request webhooks (`opened`, `synchronize`, `reopened`).
- **Automated Review Trigger**: Triggers code analysis on incoming PR events.
- **GitHub Review Comments**: Posts structured review summary comments and status checks directly back to GitHub PRs.

### 2. AI Code Analysis Engine
- **Diff & Code Inspection**: Scans changed files and diff hunks across multiple languages (Python, TypeScript/JavaScript, Java, Go, C++).
- **Vulnerability & Smell Detection**:
  - Security vulnerabilities (SQL Injection, Cross-Site Scripting, Exposed API keys/secrets).
  - Code smells, long parameter lists, magic numbers, and unhandled async promises.
  - Performance bottlenecks (N+1 database query detection inside iteration loops).
- **Automated Refactoring**: Provides explanations, why the issue matters, and proposed fix snippets.

### 3. Architectural Review & SOLID Principles
- **SOLID Enforcement**: Detects Single Responsibility Principle (SRP) and Dependency Inversion (DIP) violations.
- **Coupling & Cohesion**: Identifies tight coupling, god classes, and global state mutations.
- **Design Pattern Recommendations**: Suggests design patterns (Factory, Strategy, Repository, Dependency Injection).

### 4. Security Scanner
- **Secret & API Key Detection**: Scans for AWS keys, Stripe secret keys, OpenAI API keys, RSA private keys, and connection strings.
- **OWASP Top 10 Checks**: SQLi, XSS, Command Injection, Path Traversal, and Insecure Deserialization.
- **Dependency Vulnerabilities**: Scans `requirements.txt` and `package.json` for known vulnerable libraries.
- **Risk Score Calculation**: Computes 0-100 risk score per finding and overall PR security rating.

### 5. Developer Dashboard & UI
- **Metrics Command Center**: Overall health score, security risk score, quality score, and technical debt tracking.
- **Interactive Code Diff Viewer**: Side-by-side view with inline AI review comment cards.
- **AI Developer Assistant Chat**: Slide-over drawer allowing developers to chat with AI about PR findings.

### 6. Executive PDF Report Generation
- Downloadable PDF reports generated via `ReportLab` containing executive summaries, audit score tables, and detailed findings lists.

---

## 🛠️ Technology Stack

- **Frontend**: React.js, TypeScript, Tailwind CSS, Lucide Icons, Vite
- **Backend**: Python FastAPI, SQLAlchemy, Pydantic, WebSockets, Uvicorn
- **AI Layer**: Google Gemini API (`google-genai`), built-in heuristic AST fallback engine
- **Database**: SQLite (default zero-config) / PostgreSQL (production)
- **Reporting**: ReportLab PDF Generator
- **DevOps**: Docker, Docker Compose, GitHub Actions CI/CD

---

## 📁 Project Structure

```
main project/
├── backend/
│   ├── app/
│   │   ├── api/             # API Router endpoints (Auth, Webhooks, PRs, Security, Reports, Chat)
│   │   ├── models/          # SQLAlchemy database models (User, Repo, PR, Review, Security, Arch, Report)
│   │   ├── schemas/         # Pydantic schemas
│   │   ├── services/        # Security Scanner, Architecture Analyzer, AI Engine, Report Generator
│   │   ├── utils/           # Diff Parser
│   │   ├── config.py        # System configuration & environment settings
│   │   ├── database.py      # Database session setup
│   │   └── main.py          # FastAPI application entry point
│   ├── seed_data.py         # Database seeder script
│   ├── requirements.txt     # Backend Python dependencies
│   └── Dockerfile           # Backend container definition
├── frontend/
│   ├── src/
│   │   ├── components/      # Navbar, Sidebar, ScoreBadge, SeverityBadge, DiffViewer, ReviewCommentCard, AIChatDrawer
│   │   ├── pages/           # Dashboard, Repositories, PullRequests, PRDetail, SecurityFindings, Architecture, Analytics, Settings
│   │   ├── services/        # Axios API client
│   │   ├── types/           # TypeScript interfaces
│   │   ├── App.tsx          # Router configuration
│   │   └── main.tsx         # React entry point
│   ├── package.json         # Frontend dependencies
│   ├── vite.config.ts       # Vite configuration
│   └── Dockerfile           # Nginx multi-stage build Dockerfile
├── docs/                    # API Documentation, GitHub Setup, Deployment Guide, Architecture
├── docker-compose.yml       # Docker Compose setup
├── .github/workflows/       # GitHub Actions CI workflow
└── README.md                # Project documentation
```

---

## 🚀 Quick Start Guide

### Prerequisites
- Python 3.10+
- Node.js 18+ and npm

### 1. Backend Setup & Database Seeding

```bash
# Navigate to backend directory
cd backend

# Install dependencies
python -m pip install -r requirements.txt bcrypt

# Seed database with demo repositories, PRs, and security findings
python seed_data.py

# Start FastAPI backend server
python -m uvicorn app.main:app --reload --port 8000
```
Backend API will be running at `http://127.0.0.1:8000`. Swagger API docs available at `http://127.0.0.1:8000/api/v1/docs`.

### 2. Frontend Dashboard Setup

```bash
# In a new terminal, navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start Vite dev server
npm run dev
```
Frontend Dashboard will open at `http://localhost:5173`.

---

## 🐳 Docker Deployment

To run the entire full-stack application (PostgreSQL + FastAPI + React/Nginx) with Docker Compose:

```bash
docker-compose up -d --build
```

---

## 📄 Documentation

- [API Documentation](docs/API_DOCUMENTATION.md)
- [GitHub Webhook & OAuth Setup](docs/GITHUB_INTEGRATION_SETUP.md)
- [Deployment Guide](docs/DEPLOYMENT_GUIDE.md)
- [Architecture Overview](docs/ARCHITECTURE.md)

---

## 📄 License
Released under the MIT License. Developed for CodeGuard AI Platform.
