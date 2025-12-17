# Employee Leave Management System (Backend)

A backend-focused web application for managing employee leave requests with role-based access control.

---

##  Features

###  Authentication & Authorization
- JWT-based authentication
- Role-based access (Admin, Employee)

###  Employee
- Apply for leave
- View own leave history

###  Admin
- View all leave requests
- Approve or reject leave requests
- Audit logs for approvals/rejections

### Validations
- Input validation using express-validator
- Business rule checks for date ranges

---

## Architecture
Layered Architecture (Controller–Service–Repository)

