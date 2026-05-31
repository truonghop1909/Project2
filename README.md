# 🏢 Building Management System (Fullstack)

A fullstack web application for managing real estate buildings, customers, and staff assignments. The system allows administrators to manage buildings, assign staff, track customers, and handle transactions, while staff members can manage their assigned buildings and customers.

---

## 🚀 Tech Stack

| Category       | Technology                                                        |
| -------------- | ----------------------------------------------------------------- |
| **Backend**    | Java Spring Boot, Spring Security, JWT, Spring Data JPA, Hibernate, MySQL |
| **Frontend**   | Next.js (App Router), TypeScript, React Hooks, TailwindCSS        |
| **API**        | RESTful                                                           |

---

## 📌 Main Features

### 👨‍💼 Admin
- Manage buildings (CRUD)
- Assign buildings to staff
- Manage customers (approve/reject)
- Manage users and roles
- Track transactions

### 👨‍🔧 Staff
- View assigned buildings
- Manage assigned customers
- Update transaction status
- Track tasks

---

## 🧱 Project Structure
Building/
├── Backend_Building/
│ ├── api/ # REST controllers
│ ├── converter/ # DTO converters
│ ├── repository/ # JPA repositories
│ ├── service/ # Business logic
│ ├── security/ # JWT & security config
│ └── entity/ # JPA entities
│
└── Frontend_Building/
├── app/ # Next.js App Router pages & layouts
├── features/ # Feature-based modules (auth, building, customer, assignment, users)
├── components/ # Reusable UI components (ui, common, layout)
├── hooks/ # Custom hooks
├── lib/ # Utilities (axios, cookie, jwt)
├── types/ # Global TypeScript types
└── utils/ # Helper functions

text

---

## 🔐 Authentication

The system uses **JWT Authentication** with role‑based access control (Admin / Staff).

**Workflow:**
1. User logs in with credentials.
2. Backend validates and returns a JWT token.
3. Frontend stores the token (HTTP‑only cookie or localStorage).
4. Every subsequent request includes the token in the `Authorization` header:
Authorization: Bearer <token>

text

---

## ⚙️ Backend Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/yourusername/building-management.git
cd Backend_Building
2️⃣ Configure database
Edit src/main/resources/application.properties:

properties
spring.datasource.url=jdbc:mysql://localhost:3306/buildingdb
spring.datasource.username=root
spring.datasource.password=yourpassword
3️⃣ Run the application
bash
mvn spring-boot:run
Backend runs at: http://localhost:8083

💻 Frontend Setup
1️⃣ Navigate to frontend directory
bash
cd Frontend_Building
2️⃣ Install dependencies
bash
npm install
3️⃣ Run development server
bash
npm run dev
Frontend runs at: http://localhost:3000

Make sure the backend is running before using the frontend.

📊 System Architecture
text
Frontend (Next.js)
       ↓
   REST API
       ↓
Backend (Spring Boot)
       ↓
  Database (MySQL)
📸 Screenshots
(Add screenshots of your system here – e.g., dashboard, building list, customer management, assignment modal)

📚 Learning Goals
This project was built to practice:

Fullstack web development

REST API design

Authentication & authorization with JWT

Modern frontend architecture with Next.js (App Router)

Role‑based access control (RBAC)

👨‍💻 Author
Student project for learning fullstack development.
Tech interests: Backend Development, System Design, Web Architecture.

⭐ Future Improvements
Pagination & search optimization (server‑side)

WebSocket notifications for real‑time updates

File upload for building images (cloud storage)

Docker deployment (docker-compose)

Unit & integration tests

📄 License
This project is for educational purposes only.