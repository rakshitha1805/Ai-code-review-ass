# GitHub Integration Setup Guide for CodeGuard AI

This guide explains how to connect your GitHub Repositories with **CodeGuard AI** using GitHub App / Personal Access Tokens and Webhooks.

---

## Step 1: Create a Webhook on GitHub

1. Navigate to your repository on GitHub: `https://github.com/owner/repository`.
2. Go to **Settings** &rarr; **Webhooks** &rarr; **Add webhook**.
3. Set **Payload URL** to your CodeGuard AI public backend endpoint:
   `https://your-domain.com/api/v1/webhooks/github` (or use `ngrok http 8000` for local dev testing).
4. Set **Content type** to `application/json`.
5. Set **Secret** to: `codeguard_webhook_secret_key` (matches `GITHUB_WEBHOOK_SECRET` in `config.py`).
6. Under **Which events would you like to trigger this webhook?**, select **Let me select individual events**:
   - Check **Pull requests**
7. Click **Add webhook**.

---

## Step 2: Set up GitHub OAuth / Personal Access Token

To enable CodeGuard AI to automatically post review comments and update commit status checks back to GitHub:

1. Go to GitHub **Settings** &rarr; **Developer Settings** &rarr; **Personal Access Tokens** &rarr; **Fine-grained tokens**.
2. Click **Generate new token**.
3. Select repository access: **All repositories** or specific target repos.
4. Grant the following Permissions:
   - **Pull Requests**: Read & Write
   - **Commit Statuses**: Read & Write
   - **Contents**: Read-only
5. Copy the generated token (`ghp_...`).
6. Set the environment variable in your backend `.env` file:
   ```env
   GITHUB_TOKEN=ghp_your_personal_access_token
   ```

---

## Step 3: Test Webhook Integration

1. Create a feature branch on your repository.
2. Commit a code change containing sample logic (e.g. an API call or SQL query).
3. Open a Pull Request against `main`.
4. Observe CodeGuard AI processing the PR event in real time and posting the audit summary as a GitHub comment!
