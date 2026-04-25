# Sprintora Workspace 🚀

A premium, AI-native execution engine designed for high-performance agile project management and organizational focus.

## 🌟 Project Overview
**Sprintora** is more than a project management tool; it's a high-fidelity workspace that combines neural planning, team collaboration, and administrative governance into a single, cohesive experience. Built with the **Aurora Design System**, it prioritizes focus and visual clarity, allowing teams to move from idea to execution with 10x velocity.

## 💎 Key Features

### 🤖 AI Architect (Neural Planning)
- **Neural Task Decomposition**: Decompose complex requirements into structured tasks using Llama-3.3.
- **Smart Estimation**: Automatic priority and effort estimation based on requirement context.
- **Subtask Provisioning**: AI generates nested subtasks that can be bulk-created instantly.

### 📋 Agile Execution
- **Interactive Kanban Boards**: Real-time task tracking with priorities and statuses.
- **Project Pinning**: Organize high-priority projects for instant access.
- **Subtask Management**: Break down complex tasks into manageable action items.

### 🤝 Advanced Collaboration
- **Smart Notifications**: In-app notification bell with "Mark All as Read" and individual acknowledgment.
- **Interactive Comments**: Mention teammates (@username) with automated alerts.
- **Meeting Management**: Schedule meetings, track attendees, and store interactive meeting notes.
- **Resource Sharing**: Secure private file and link sharing with automatic metadata scraping.

### 📊 Impact Analytics
- **Team Velocity Tracking**: 12-week rolling visualization of task completion trends.
- **95% Faster Delivery**: Documented acceleration in planning cycles via AI automation.
- **Stakeholder Views**: Simplified dashboards for non-technical leadership.

### 🛡️ Enterprise Security & Governance
- **Multi-Tenant Architecture**: Secure data isolation between different organizations.
- **Audit Logging**: Every sensitive action is timestamped and logged for compliance.
- **Data Portability**: Full organization database exports as compressed `.sql.gz` files.

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19 + Vite
- **Styling**: Material UI v6 (Aurora Design System)
- **Theme**: Persistent Light/Dark mode with unified context flow.
- **Animations**: Framer Motion & CSS-based micro-interactions.

### Backend
- **Runtime**: Node.js (Fastify Framework)
- **Database**: PostgreSQL (Neon Serverless)
- **AI Engine**: Groq API (Llama-3.3-70B)
- **Authentication**: Secure Session-based Auth (fastify-session)
- **External APIs**: Brevo (SMTP/Email), Open-Graph-Scraper

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- PostgreSQL Database
- Brevo API Key (for emails)
- Groq API Key (for AI)

### Installation

1. **Clone the repositories**:
   ```bash
   git clone https://github.com/vimalRaj45/vsgrps_agile_backend
   git clone https://github.com/vimalRaj45/vsgrps_agile_frontend
   ```

2. **Backend Setup**:
   ```bash
   cd backend
   npm install
   # Create .env with DATABASE_URL, BREVO_API_KEY, SESSION_SECRET, GROQ_API_KEY
   node db-init.js  # Initialize the database schema
   npm start
   ```

3. **Frontend Setup**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## 🎨 Design System: Aurora
Sprintora follows the **Aurora Design System**, featuring:
- **Glassmorphism**: Translucent headers and components with persistent theme flow.
- **Geometric Rule**: `borderRadius: 3` (24px) for cards; `borderRadius: 2` (16px) for navbars.
- **Modern Typography**: Inter & Outfit fonts for maximum readability.
- **Mobile First**: Fully responsive layout optimized for high-conversion onboarding.

---
© 2026 Sprintora. All rights reserved.
