# CodeGuard AI - Deployment Guide

This document outlines deployment procedures for Docker Compose, AWS ECS, Azure Container Instances, and Kubernetes.

---

## 1. Local & On-Prem Deployment (Docker Compose)

### Prerequisites
- Docker Engine 24.0+
- Docker Compose v2.0+

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/codeguard-ai/codeguard-ai.git
   cd codeguard-ai
   ```

2. Configure environment variables in `.env`:
   ```env
   POSTGRES_USER=codeguard
   POSTGRES_PASSWORD=your_secure_password
   POSTGRES_DB=codeguard_db
   SECRET_KEY=your_jwt_secret_key
   GITHUB_WEBHOOK_SECRET=your_github_webhook_secret
   GEMINI_API_KEY=your_google_gemini_api_key
   ```

3. Launch services:
   ```bash
   docker-compose up -d --build
   ```

4. Seed initial database:
   ```bash
   docker-compose exec backend python seed_data.py
   ```

5. Access the application:
   - Frontend Dashboard: `http://localhost:5173`
   - Backend API Docs: `http://localhost:8000/api/v1/docs`

---

## 2. Production Deployment (AWS / Azure)

### AWS ECS (Elastic Container Service)
1. Build and push Docker images to AWS ECR:
   ```bash
   aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <aws_account_id>.dkr.ecr.us-east-1.amazonaws.com
   docker build -t codeguard-backend ./backend
   docker tag codeguard-backend:latest <aws_account_id>.dkr.ecr.us-east-1.amazonaws.com/codeguard-backend:latest
   docker push <aws_account_id>.dkr.ecr.us-east-1.amazonaws.com/codeguard-backend:latest
   ```

2. Provision an AWS RDS PostgreSQL database instance.
3. Deploy Fargate task definition for backend API and frontend Nginx container.

---

## 3. Database Migration Strategy

Alembic migrations are configured under `backend/alembic`. To apply schema migrations:
```bash
alembic upgrade head
```
