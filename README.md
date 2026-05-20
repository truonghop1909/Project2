# 🏢 Building Management System (Fullstack)

A fullstack web application for managing real estate buildings, customers and staff assignments.
The system allows administrators to manage buildings, assign staff, track customers and manage transactions.

## 🚀 Tech Stack

### Backend

* **Java Spring Boot**
* **Spring Security + JWT Authentication**
* **Spring Data JPA / Hibernate**
* **MySQL**
* RESTful API architecture

### Frontend

* **Next.js**
* **TypeScript**
* **React Hooks**
* **TailwindCSS**

---

# 📌 Main Features

## 👨‍💼 Admin

* Manage buildings (CRUD)
* Assign buildings to staff
* Manage customers
* Manage users and roles
* Track transactions

## 👨‍🔧 Staff

* View assigned buildings
* Manage assigned customers
* Update transaction status
* Track tasks

---

# 🧱 Project Structure

```
Building/
│
├── Backend_Building/
│   ├── api/
│   ├── converter/
│   ├── repository/
│   ├── service/
│   ├── security/
│   └── entity/
│
└── Frontend_Building/
    ├── app/
    ├── features/
    │   ├── auth
    │   ├── building
    │   ├── customer
    │   ├── assignment
    │   └── users
    └── shared/
```

---

# 🔐 Authentication

The system uses **JWT Authentication**.

Workflow:

1. User login
2. Backend generates JWT token
3. Token stored on client
4. Every request includes Authorization header

```
Authorization: Bearer <token>
```

---

# ⚙️ Backend Setup

### 1️⃣ Clone repository

```
git clone https://github.com/yourusername/project.git
```

### 2️⃣ Configure database

Edit:

```
application.properties
```

Example:

```
spring.datasource.url=jdbc:mysql://localhost:3306/buildingdb
spring.datasource.username=root
spring.datasource.password=yourpassword
```

### 3️⃣ Run Spring Boot

```
mvn spring-boot:run
```

Backend runs at:

```
http://localhost:8083
```

---

# 💻 Frontend Setup

### Install dependencies

```
npm install
```

### Run development server

```
npm run dev
```

Frontend runs at:

```
http://localhost:3000
```

---

# 📊 System Architecture

```
Frontend (NextJS)
        ↓
REST API
        ↓
Backend (Spring Boot)
        ↓
Database (MySQL)
```

---

# 📷 Screenshots

*(Add screenshots of your system here)*

Examples:

* Dashboard
* Building Management
* Customer Management
* Assignment Modal

---

# 📚 Learning Goals

This project was built to practice:

* Fullstack web development
* REST API design
* Authentication with JWT
* Frontend architecture with NextJS
* Role-based access control

---

# 👨‍💻 Author

Student project for learning fullstack development.

Tech interests:

* Backend Development
* System Design
* Web Architecture

---

# ⭐ Future Improvements

* Pagination & search optimization
* WebSocket notifications
* File upload for building images
* Docker deployment

