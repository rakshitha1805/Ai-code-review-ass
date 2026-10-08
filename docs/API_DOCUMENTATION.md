# CodeGuard AI - API Documentation

The CodeGuard AI backend provides RESTful APIs and WebSocket connections for automated Pull Request code reviews, security scanning, architectural inspection, executive PDF report generation, and developer AI chat assistant.

---

## Base URL

`http://localhost:8000/api/v1`

---

## Authentication Endpoints (`/auth`)

### `POST /auth/register`
Register a new developer or security lead.
- **Request Body**:
  ```json
  {
    "username": "developer1",
    "email": "dev@codeguard.ai",
    "password": "SecurePassword123"
  }
  ```

### `POST /auth/token`
Authenticate user and retrieve OAuth2 JWT Access Token.

---

## GitHub Webhooks (`/webhooks`)

### `POST /webhooks/github`
Listens for GitHub Pull Request webhook events (`opened`, `synchronize`, `reopened`).
- **Headers**:
  - `X-GitHub-Event: pull_request`
  - `X-Hub-Signature-256: sha256=...` (HMAC SHA-256 signature)
- **Behavior**:
  Triggers async background task executing SecurityScanner, ArchitectureAnalyzer, and AICodeAnalysisEngine, then posts review comments directly to the GitHub PR.

---

## Repositories (`/repositories`)

### `GET /repositories`
List all connected GitHub repositories.

### `POST /repositories`
Connect a new GitHub repository to CodeGuard AI.

---

## Pull Requests (`/pull-requests`)

### `GET /pull-requests`
Fetch list of pull requests, optionally filtered by `repository_id` or `state`.

### `GET /pull-requests/{id}`
Retrieve complete detail of a PR, including diff data, review comments, security findings, and architecture findings.

### `POST /pull-requests/{id}/analyze`
Manually trigger an on-demand AI review scan for a PR.

---

## Review Comments (`/reviews`)

### `GET /reviews/pr/{pr_id}`
Get review comment suggestions generated for a PR.

### `PATCH /reviews/{comment_id}/resolve`
Mark an inline AI review comment as resolved.

---

## Security Scanner (`/security`)

### `GET /security/findings`
Retrieve global security findings dashboard, filterable by `repository_id` and `severity` (`Critical`, `High`, `Medium`, `Low`).

---

## Architectural Review (`/architecture`)

### `GET /architecture/findings`
Retrieve SOLID principle violations, tight coupling metrics, and design pattern suggestions.

---

## PDF Reports (`/reports`)

### `POST /reports/pr/{pr_id}/generate`
Generate downloadable PDF audit report for a PR using ReportLab.

### `GET /reports/download/{filename}`
Download generated PDF file.

---

## AI Developer Chat (`/chat`)

### `POST /chat`
Interactive Q&A assistant for developers reviewing a PR.
- **Request Body**:
  ```json
  {
    "pr_id": 1,
    "question": "How do I fix the SQL injection vulnerability in payment_processor.py?"
  }
  ```
