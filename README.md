# Convene: Event Registration & Ticketing Platform

[![CI/CD Pipeline](https://img.shields.io/badge/CI%2FCD-GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions)](.github/workflows/)
[![Architecture](https://img.shields.io/badge/Architecture-Serverless-FF9900?style=for-the-badge&logo=amazonaws)](docs/architecture.md)
[![AWS Tier](https://img.shields.io/badge/AWS-100%25_Always_Free-success?style=for-the-badge)](docs/check-free-tier-usage.md)
[![Frontend](https://img.shields.io/badge/Frontend-Vanilla_JS_%2B_Vite-FFD500?style=for-the-badge&logo=javascript)](docs/app-ui.md)

> **Convene turns event registration from a chore into a two-minute confirmation — for attendees and organizers alike.**

Convene is a modern, ultra-lightweight, and fully serverless event registration platform. It is engineered from the ground up to operate entirely within the **AWS Always-Free Tier**, ensuring zero ongoing infrastructure costs regardless of account age.

---

## ⚡ Core Features

- **Effortless Checkout:** A distraction-free, two-field registration modal designed for maximum conversion.
- **Zero-Cost Scaling:** Powered by AWS Lambda Function URLs and Provisioned DynamoDB tables to permanently bypass API Gateway and On-Demand billing traps.
- **Bot Protection:** Application-level rate limiting and honeypot fields to mitigate abuse without the recurring costs of AWS WAF.
- **Atomic Frontend:** A blazing fast Vanilla JavaScript frontend powered by Vite, strictly adhering to Atomic Design principles (`atoms` → `molecules` → `organisms`).
- **Fully Automated CI/CD:** Secure, OIDC-authenticated GitHub Actions pipelines that automatically test, build, and deploy to staging and production.

---

## 📚 Documentation & Architecture

We believe in documenting *why* a system is built a certain way, not just *how*. All project documentation is centrally located in our `docs/` directory.

👉 **[Start Here: Main Documentation Index](docs/README.md)**

### Key Reading
* **[System Architecture](docs/architecture.md)**: Details on the serverless layout and the $0 budget constraints.
* **[Project Folder Structure](docs/project-structure.md)**: Rules for the Atomic Design UI and backend Lambda layout.
* **[Architecture Decision Records (ADRs)](docs/adr/)**: The historical log of our core architectural trade-offs (e.g., *Why we dropped API Gateway*).
* **[UI & Brand Guidelines](docs/app-ui.md)**: The Convene design language, typography scale, and microcopy tone.
* **[API Reference](docs/api-reference.md)**: The request/response contracts for the backend.

---

## 🚀 Quick Start (Local Development)

To get Convene running locally for development and testing:

### 1. Frontend 
The frontend uses Vite for instantaneous HMR (Hot Module Replacement).
```bash
cd frontend
npm install
npm run dev
```

### 2. Backend Tests
The backend relies on `pytest` and `moto` to mock AWS services, meaning you don't need real AWS credentials to run the test suite.
```bash
pip install -r requirements-dev.txt
pytest tests/backend/
```

### 3. Local API & Infrastructure
*(See the comprehensive [Local Development Setup](docs/local-dev-setup.md) guide for details on running `sam local start-api`.)*

---

## 🛠️ Operations & Runbooks

For production operators, we maintain living runbooks to handle incident response and regular maintenance:
- [Deploy and Rollback Procedures](docs/deploy-and-rollback.md)
- [Auditing Free-Tier Usage](docs/check-free-tier-usage.md)
- [Rotating Admin Credentials](docs/rotate-admin-credentials.md)
- [Incident Response](docs/incident-response.md)

---

## 🤝 Contributing

We welcome contributions! Before submitting a pull request, please review our [Contributing Guidelines](docs/contributing.md). 

> **Note:** Any changes to the AWS infrastructure (`template.yaml`) must be vetted against the Always-Free tier constraints and checked off in the PR template. If you are proposing a fundamental architecture shift, please submit a new ADR first.
