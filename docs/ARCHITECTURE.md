# CodeGuard AI - Architectural Overview

**CodeGuard AI** is structured around an event-driven, microservices-ready architecture that ingests Pull Request diffs, parses source code AST, performs static rule scanning, and orchestrates LLM reasoning.

---

## High-Level Architecture Diagram

```
+------------------+         +-----------------------+         +------------------------+
|   GitHub PR      |  Event  |  GitHub Webhook       |  Async  | CodeGuard AI           |
|   Opened / Sync  | ------->|  Service              | ------->| Background Pipeline    |
+------------------+         +-----------------------+         +------------------------+
                                                                            |
                                               +----------------------------+----------------------------+
                                               |                            |                            |
                                               v                            v                            v
                                    +--------------------+       +--------------------+       +--------------------+
                                    | Security Scanner   |       | Architecture       |       | AI Review Engine   |
                                    | - Secret Detection |       | - SOLID Violations |       | - Gemini / LLM     |
                                    | - OWASP Top 10     |       | - Pattern Recomm.  |       | - Heuristic Engine |
                                    +--------------------+       +--------------------+       +--------------------+
                                               |                            |                            |
                                               +----------------------------+----------------------------+
                                                                            |
                                                                            v
                                                                 +--------------------+
                                                                 | SQLite / Postgres  |
                                                                 | Database Storage   |
                                                                 +--------------------+
                                                                            |
                                                                            v
                                                                 +--------------------+
                                                                 | React Developer    |
                                                                 | Dashboard UI       |
                                                                 +--------------------+
```

---

## Component Breakdown

1. **GitHub Webhook Service**: Receives webhook triggers, verifies HMAC SHA-256 signatures, and enqueues async background review jobs.
2. **Diff Parser Utility**: Converts Git diff hunks into line-mapped addition/deletion records.
3. **Security Scanner**: Uses regex pattern matching and entropy detection to flag exposed credentials and OWASP Top 10 vulnerabilities.
4. **Architecture Analyzer**: Analyzes code structure to detect Single Responsibility violations, tight coupling, and recommend GoF design patterns.
5. **AI Review Engine**: Interfaces with Google Gemini API for deep code understanding, fallback reasoning, and human-like review comment synthesis.
6. **Report Generator**: Produces PDF audit summaries using ReportLab.
7. **Developer Dashboard**: High-speed React + TypeScript + Tailwind CSS interface for reviewing findings, interacting with the AI chat assistant, and downloading reports.
