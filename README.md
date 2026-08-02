# 🛡️ SentinelGRC | Multi-Tenant Enterprise Risk & Compliance Engine

> **Architect & Lead Developer:** Danny Bermudez | Cybersecurity Analyst & Blue Team Practitioner
> **Tech Stack:** React, Firebase/Firestore, Node.js, GitHub Actions (DevSecOps), NIST CSF 2.0 / ISO 27001 Frameworks

---

## 📌 Executive Summary

SentinelGRC is a cloud-native Governance, Risk, and Compliance (GRC) platform engineered with a **Zero-Trust AppSec Architecture**. Unlike traditional spreadsheet-based risk registers or vulnerable client-filtered SaaS apps, SentinelGRC enforces strict tenant isolation, automated $Impact \times Likelihood$ risk calculations, and immutable audit logging directly at the database edge.

---

## 🏗️ System Architecture & DevSecOps Pipeline

[ Client React Frontend ]
│ (JWT Auth Token w/ tenantId claim)
▼
[ Database Edge Security Rules ]
├── 🔒 Multi-Tenant Boundary Enforcement (BOLA Defense)
├── 📊 Automated Risk Engine Payload Validation
└── 🛑 Immutable Append-Only Audit Logging (/audit_logs)
│
▼
[ GitHub Actions DevSecOps CI/CD ]
├── 🧪 Firebase Emulator Security Rule Unit Testing
└── 🔍 Automated SAST & Dependency Vulnerability Scan

---

## 🚀 Key Features & Sprint Milestones

### 1. Zero-Trust Multi-Tenancy (Sprint 1)

- **JWT Custom Claims:** Binds authenticated users to `tenantId` and `role` claims at login.
- **Database Edge Isolation:** Rejects unauthorized cross-tenant data requests prior to database query execution.

### 2. Risk Assessment Engine & Real-Time Analytics (Sprint 2)

- **Quantitative Scoring:** Automatically computes risk severity based on a standard $5 \times 5$ matrix ($Impact \times Likelihood$).
- **Live Dashboard:** Real-time summary displaying active risk distribution across Critical, High, Medium, and Low tiers.

### 3. Compliance Framework Mapping & Immutable Audit Trails (Sprint 3)

- **Framework Integration:** Maps active risks to **NIST CSF 2.0**, **ISO 27001**, and **SOC 2** controls.
- **Non-Repudiable Logs:** Enforces `allow update, delete: if false;` rules on audit logs to guarantee compliance immutability.

### 4. Automated DevSecOps Pipeline (Sprint 4)

- **Automated Rule Testing:** Runs headless Firebase Emulator unit tests on every pull request to catch BOLA regressions.
- **SAST & Vulnerability Scanning:** Executes continuous dependency checks via GitHub Actions.

---

## 🧪 Running Security Rule Unit Tests Locally

```bash
# Install dependencies
npm ci

# Run Firebase Security Rule unit test suite inside emulator
npx firebase emulators:exec --only firestore "npm test"
```
