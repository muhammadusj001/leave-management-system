# Employee Leave Management System

A full-stack web application for managing employee leave requests with role-based access control.

---

## 🚀 Features

### Authentication & Authorization
- JWT-based authentication
- Role-based access (Admin, Employee)
- Secure login with password visibility toggle

### Employee Features
- Apply for leave with date and reason
- Employee ID and Name validation
- View own leave history with status tracking
- Cannot apply leave for past dates (validation enforced)
- Real-time toast notifications for all actions

### Admin Features
- View all pending leave requests
- Approve or reject leave requests with one-click actions
- See employee details (ID, Name, Date, Reason)
- Real-time status updates
- Toast notifications for all actions

### Additional Features
- MongoDB data persistence
- Input validation on frontend and backend
- Business rule checks (date validation, field validation)
- Responsive full-width layouts
- Outfit Google Font across all pages

---

## 🏗️ Architecture

**Layered Architecture:**
- **Controller** - Request handling & response
- **Service** - Business logic & validation
- **Repository** - Database operations
- **Middleware** - Authentication & authorization
- **Validators** - Input validation

---

## 📋 Tech Stack

### Frontend
- **React** - UI library
- **Vite** - Build tool & dev server
- **Axios** - HTTP client
- **React Toastify** - Toast notifications
- **CSS** - Custom styling with Outfit font

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **Express-validator** - Input validation
- **JWT** - Authentication

---

## 🛠️ Setup & Installation

### Prerequisites
- Node.js (v14+)
- MongoDB Atlas account (or local MongoDB)
- Git

### Backend Setup

1. **Navigate to server directory:**
   ```bash
   cd server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file** (copy from `.env.example`):
   ```bash
   PORT=5000
   MONGO_URI=mongodb+srv://your_username:your_password@cluster.mongodb.net/leave_management_db
   JWT_SECRET=your_super_secret_key
   ```

4. **Start the server:**
   ```bash
   npm start
   ```
   Server runs on `http://localhost:5000`

### Frontend Setup

1. **Navigate to client directory:**
   ```bash
   cd client
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   Client runs on `http://localhost:5173`

---

## 🔐 Test Credentials

### Admin Login
- **Email:** `admin@gmail.com`
- **Password:** `123`

### Employee Login
- **Email:** `employee@test.com`
- **Password:** `123`

---

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/login` - Login user

### Leave Management
- `POST /api/leaves` - Apply for leave (Employee)
- `GET /api/leaves/my` - Get employee's own leaves
- `GET /api/leaves/pending` - Get all pending leaves (Admin only)
- `PUT /api/leaves/:id/status` - Update leave status (Admin only)

---

## 📁 Project Structure

```
leave-management-system/
├── client/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── EmployeeDashboard.jsx
│   │   │   └── AdminDashboard.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── server/
│   ├── src/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── repositories/
│   │   ├── models/
│   │   ├── middlewares/
│   │   ├── validators/
│   │   ├── routes/
│   │   └── app.js
│   ├── .env (add your credentials)
│   ├── .env.example
│   └── package.json
│
└── README.md
```

---

## ✅ Form Validation

### Leave Application
- **Employee ID** - Required, minimum 3 characters
- **Employee Name** - Required, minimum 3 characters
- **Date** - Required, cannot be in the past
- **Reason** - Required, minimum 3 characters

---

## 🔒 Security Features

- JWT authentication with role-based access
- `.env` file excluded from git (see `.gitignore`)
- Password validation on backend
- Input validation on both frontend and backend
- Protected admin endpoints with middleware

---

## 📝 Notes

- Make sure both client and server are running for the full application to work
- The frontend sends requests to `http://localhost:5000/api/*`
- All dates are validated to prevent past leave applications
- Toast notifications provide real-time feedback for all actions
- Employee data is persisted in MongoDB

---

## 🤝 Contributing

Feel free to fork and submit pull requests.

---

## 📄 License

This project is open source.


