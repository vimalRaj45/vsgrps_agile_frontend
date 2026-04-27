# Sprintora: AI-Powered Enterprise Agile Workspace 🚀

Sprintora is a high-performance, AI-driven project management platform designed by **VSGRPS Technologies**. It combines modern agile methodologies with Llama-powered intelligence to streamline software development workflows, enhance team collaboration, and provide executive-level project oversight.

---

## 🏗️ Technical Analysis & Product Overview

Sprintora is architected as a full-stack, enterprise-grade solution utilizing a high-performance **Fastify (Node.js)** backend and a rich **React/Material-UI** frontend. The system is designed for high-concurrency environments, implementing robust security patterns, data portability, and real-time synchronization.

### 🧠 Core Intelligence: The AI Architect
At the heart of Sprintora is the **AI Architect**, powered by the Llama-3.3-70B model. Unlike generic task trackers, Sprintora uses AI to:
*   **Analyze Requirements**: Transform high-level project goals into technical task breakdowns.
*   **Smart Estimation**: Automatically assign priorities and estimate work hours based on task complexity.
*   **Pre-defined Subtasks**: Generate granular action items for every task to ensure developers have clear execution paths.
*   **Role Mapping**: Suggest appropriate team roles (Frontend, Backend, DevOps) for specific technical items.

### 📊 Product Features & Modules

#### 1. Agile Governance (Kanban Board)
*   **State-of-the-art Workflow**: Integrated Kanban system for tracking tasks through *To Do*, *In Progress*, *Review*, and *Done*.
*   **Quality Gates**: Enforced status transitions where only Admins can finalize tasks, ensuring strict quality control.
*   **Subtask Management**: Deep-nesting of subtasks within main tickets for micro-tracking.

#### 2. Advanced Collaboration
*   **Resource Vault**: Centralized management for project files and external links with automatic metadata/OG-image previews.
*   **Meeting Lifecycle**: Schedule meetings, track attendance, and store interactive minutes/outcomes within the project context.
*   **Notification Engine**: Real-time push notifications and in-app alerts for mentions, assignments, and status changes.

#### 3. Executive Insights
*   **Real-time Analytics**: Built-in Recharts dashboards for tracking Team Velocity, Completion Rates, and Work Distribution.
*   **Project Reports**: Automated PDF/Print-ready generation of project health reports, including team contribution metrics and timeline analysis.

#### 4. Enterprise Security & Administration
*   **Audit Logging**: Every sensitive action (backups, user removals, project deletions) is logged with timestamps and actor details.
*   **Role-Based Access Control (RBAC)**: Fine-grained permissions for Admins, Product Owners, Developers, and Stakeholders.
*   **Data Sovereignty**: Built-in full database backup/export functionality for organization-wide data portability.

---

## 🛠️ Technical Stack

### **Frontend**
*   **Framework**: React 18+ with Vite (for lightning-fast HMR).
*   **Design System**: Material UI (MUI) with a premium custom theme.
*   **Visualizations**: Recharts for dynamic analytics.
*   **Persistence**: Progressive Web App (PWA) with service workers for offline capability and push notifications.
*   **Styling**: Custom CSS Modules + Global design tokens for glassmorphism and modern UI effects.

### **Backend**
*   **Engine**: Fastify (High-performance Node.js framework with lower overhead than Express).
*   **Database**: PostgreSQL (Relational persistence for complex agile entities).
*   **Authentication**: Secure session-based auth with HTTP-only cookies and Bcrypt hashing.
*   **Intelligence**: Groq-hosted Llama-3.3-70B API integration.
*   **Messaging**: Nodemailer (Transactional emails) and Web-push (Browser notifications).

---

## 🚀 Getting Started

### Prerequisites
*   Node.js v18+
*   PostgreSQL v14+
*   NPM or Yarn

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/vimalRaj45/vsgrps_agile_frontend.git
    cd Sprintora
    ```

2.  **Backend Setup**
    ```bash
    cd backend
    npm install
    # Create a .env file based on the environment requirements
    npm run init-db # Initialize database schemas
    npm run dev
    ```

3.  **Frontend Setup**
    ```bash
    cd frontend
    npm install
    npm run dev
    ```

### Environment Variables (.env)

**Backend:**
*   `DATABASE_URL`: PostgreSQL connection string.
*   `SESSION_SECRET`: Minimum 32-character secure string.
*   `GROQ_API_KEY`: For AI Architect functionality.
*   `EMAIL_USER`/`EMAIL_PASS`: For verification emails.
*   `VAPID_PUBLIC_KEY`/`VAPID_PRIVATE_KEY`: For push notifications.

---

## 📂 Project Structure

```text
├── backend/
│   ├── routes/        # API Endpoints (Auth, Tasks, AI, etc.)
│   ├── models/        # Database interaction logic
│   ├── utils/         # Helpers (Push, Email, AI connectors)
│   └── index.js       # Server Entry Point
├── frontend/
│   ├── src/
│   │   ├── components/ # Reusable UI Components
│   │   ├── pages/      # Views (Dashboard, Kanban, Reports)
│   │   ├── store/      # State management
│   │   └── api/        # Axios client & services
│   └── public/        # PWA Assets & Service Worker
└── README.md
```

---

© 2026 VSGRPS Technologies. All rights reserved.  
*Building the future of collaborative intelligence.*
