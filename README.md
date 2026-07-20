# SentinelGRC — AI-Powered Security Assurance Platform

![Sprint 0 - Architecture Complete](https://img.shields.io/badge/Sprint--0-Architecture%20%26%20Governance-blue)
![Framework Compliance](https://img.shields.io/badge/Compliance-NIST%20CSF%202.0%20%7C%20SP%20800--53-green)
![AppSec Standard](https://img.shields.io/badge/AppSec-Multi--Tenant%20Logical%20Isolation-orange)

SentinelGRC is an enterprise-grade, multi-tenant SaaS security assurance platform designed to automate corporate risk registers, control assessments, and Plan of Action and Milestones (POA&M) tracking. Built with a "Security-First" engineering design, the system enforces cryptographically boundary-checked data governance directly at the database layer to mitigate horizontal privilege escalation vectors.

---

## 🏗 System Architecture & Tech Stack

- **Frontend:** React, Vite, Tailwind CSS (Single Page Application architecture)
- **Backend & Storage:** Firebase Auth, Firestore (NoSQL Document Store), Firebase Cloud Storage
- **Agile Management:** Linked Jira Software (Scrum) & Confluence engineering workspaces
- **CI/CD & DevSecOps:** GitHub Actions for automated linting, static application security testing (SAST), and hosting deployment

---

## 🔒 Multi-Tenancy & Data Isolation Model

To eliminate cross-tenant data leakage risks in a NoSQL environment, SentinelGRC uses a **Flat Collection Model with Tenant-ID Fields** rather than standard subcollections. Custom Firebase Authentication token claims bind users to specific tenant IDs, which are validated at the edge by Firestore Security Rules before any read or write operation executes:

```javascript
// Firestore Rule Enforcing Tenant Isolation
match /risks/{riskId} {
  allow read, write: if request.auth != null
                    && request.auth.token.tenantId == resource.data.tenantId;
}
```
