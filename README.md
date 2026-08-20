# Government Certificate & Brokerage Service Platform (GovCert)

**GovCert** is a premium, web-based aggregator platform that connects citizens with verified service agents (CSCs) to seamlessly access government certificates (Domicile, Income, Caste, etc.) without visiting local physical offices.

Developed as a modern SaaS platform on the **Next.js App Router**, GovCert follows high-end 2026 UI/UX design patterns (glassmorphism aesthetics, dynamic micro-animations) to bring unprecedented accessibility and transparency to e-governance processing.

## 🚀 Key Features

### 👤 Citizen Access
* **Secure Registration:** Role-based authentication via NextAuth.
* **Service Discovery:** Explore available government certificates and pre-requisite checklists.
* **4-Step Tracker:** Real-time visibility into the application lifecycle (Submitted > Agent Assigned > In Progress > Completed).
* **Document Management:** Securely upload proof documents (Aadhaar, Electricity Bill) and instantly download the finalized PDF directly from the dashboard.

### 💼 Verified Agent Portal ("Execution Desk")
* **Task Queues:** Automated routing where agents browse and accept pending citizen requests.
* **Actionable Execution:** Centralized data display showing user-submitted JSON metadata.
* **Smart Workflow:** One-click automated routing to State Government Portals (UP e-District, Delhi e-District, etc.).
* **Return Pipeline:** Upload finalized certificates which instantly push to the citizen's secure download channel.

### 👑 Admin Overview
* **Marketplace Governance:** Centrally verify or ban agents.
* **Database & Pricing:** Push real-time updates for new certificates or pricing tiers.
* **Metrics:** High-level platform analytics.

## 🛠 Tech Stack

* **Framework:** Next.js 14+ (App Router, Server Actions)
* **Frontend:** React 18, Tailwind CSS, Framer Motion (for hyper-premium animations), Lucide React
* **Backend:** Node.js (via Next.js API Routes), Prisma ORM
* **Database:** SQLite (Development) / PostgreSQL (Production-ready via Prisma)
* **Authentication:** NextAuth.js
* **Storage:** Native File System (`fs/promises`) mapped dynamically via IDs.

## 💻 Getting Started

Clone the repository and install all node modules to run GovCert locally.

```bash
git clone <your-repository-url>
cd govcert

# Install dependencies
npm install

# Initialize Prisma Database
npx prisma generate
npx prisma db push

# Start the local development server (Port 3000)
npm run dev
```

### Environment Variables
Create a `.env` file in the root based on `.env.example` (or use development defaults if configured).
```env
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-super-secret-string"
DATABASE_URL="file:./dev.db"
```

## 🔐 Security & Constraints
* **Phase 1 Limitation:** Direct API connection to Government Systems (e-District) is NOT in scope; the platform strictly relies on the verified Agent ecosystem.
* Authentication and page protection ensure that Citizens cannot visit Agent APIs, and Agents cannot view global Admin views.

## 📄 License
This project is for academic/demonstration purposes and abides by the unified problem statement for digitizing citizen service access points.
