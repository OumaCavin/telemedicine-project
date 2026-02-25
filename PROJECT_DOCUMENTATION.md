# TeleMed - Project Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Technology Stack](#technology-stack)
4. [Database Schema](#database-schema)
5. [API Documentation](#api-documentation)
6. [Frontend Components](#frontend-components)
7. [Authentication & Security](#authentication--security)
8. [Deployment Guide](#deployment-guide)
9. [Development Workflow](#development-workflow)
10. [Troubleshooting](#troubleshooting)

---

## Project Overview

**TeleMed** is a comprehensive telemedicine platform designed to bridge the gap between patients and healthcare providers. The application enables virtual healthcare services including appointment scheduling, prescription management, health center location services, and secure communication between patients and doctors.

### Key Features

| Feature | Description |
|---------|-------------|
| User Management | Role-based access control for Admins, Doctors, and Patients |
| Appointment Booking | Schedule, reschedule, and cancel appointments |
| Prescription Management | Digital prescription creation and tracking |
| Health Center Locator | Find nearby healthcare facilities |
| Secure Messaging | HIPAA-compliant communication channel |
| Electronic Health Records | Comprehensive patient health history |
| Payment Processing | Integrated payment handling |
| Audit Logging | Complete activity tracking |

---

## Architecture

### System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                        Client Layer                          │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │   Web App   │  │  Mobile App │  │   Admin     │         │
│  │   (React)   │  │  (Future)   │  │   Panel     │         │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘         │
└─────────┼────────────────┼────────────────┼────────────────┘
          │                │                │
          └────────────────┴────────────────┘
                           │
                    HTTP/HTTPS
                           │
┌──────────────────────────┼──────────────────────────────────┐
│                    API Gateway Layer                         │
│  ┌───────────────────────┴───────────────────────┐          │
│  │         Express.js REST API Server            │          │
│  │              (Node.js Runtime)                │          │
│  └───────────────────────┬───────────────────────┘          │
└──────────────────────────┼──────────────────────────────────┘
                           │
           ┌───────────────┼───────────────┐
           │               │               │
    ┌──────┴──────┐ ┌──────┴──────┐ ┌──────┴──────┐
    │  Business   │ │   Authentication  │ │   Audit    │
    │   Logic     │ │   (JWT/OAuth)     │ │  Logging   │
    └──────┬──────┘ └─────────────┘ └─────────────┘
           │
┌──────────┼──────────────────────────────────────────────────┐
│          │              Data Layer                            │
│  ┌───────┴────────┐  ┌─────────────────┐  ┌──────────────┐  │
│  │     MySQL      │  │   File Storage  │  │    Cache     │  │
│  │   (Sequelize)  │  │   (Future S3)   │  │  (Future)    │  │
│  └────────────────┘  └─────────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## Technology Stack

### Frontend Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.3.1 | UI Library |
| React Router DOM | 6.27.0 | Client-side routing |
| Axios | 1.7.7 | HTTP client |
| Formik | 2.4.6 | Form management |
| Yup | 1.4.0 | Form validation |
| React Data Table | 7.7.0 | Data tables |
| React Toastify | 10.0.6 | Notifications |
| Styled Components | 6.3.11 | CSS-in-JS |

### Backend Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | 14+ | Runtime |
| Express.js | 4.21.1 | Web framework |
| MySQL2 | 3.11.4 | Database driver |
| Sequelize | 6.37.5 | ORM |
| JWT | 9.0.2 | Authentication |
| bcryptjs | 2.4.3 | Password hashing |
| Winston | 3.15.0 | Logging |
| Morgan | 1.10.0 | HTTP logging |

---

## Database Schema

### Entity Relationship Diagram

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│    Users     │     │   Patients   │     │   Doctors    │
├──────────────┤     ├──────────────┤     ├──────────────┤
│ PK user_id   │────→│ PK user_id   │     │ PK user_id   │
│    username  │     │    dob       │     │    specialty │
│    email     │     │    gender    │     │    license   │
│    password  │     │    address   │     │    schedule  │
│ FK role_id   │←────┘              │     │              │
└──────┬───────┘     └──────────────┘     └──────────────┘
       │
       │              ┌──────────────┐     ┌──────────────┐
       │              │ Appointments │     │ Prescriptions│
       │              ├──────────────┤     ├──────────────┤
       └─────────────→│ PK appt_id   │     │ PK rx_id     │
                      │ FK patient_id│←────│ FK patient_id│
                      │ FK doctor_id │←────│ FK doctor_id │
                      │    date_time │     │    medication│
                      │    status    │     │    dosage    │
                      │              │     │    date      │
                      └──────────────┘     └──────────────┘

┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│HealthCenters │     │   Messages   │     │   Payments   │
├──────────────┤     ├──────────────┤     ├──────────────┤
│ PK center_id │     │ PK msg_id    │     │ PK pay_id    │
│    name      │     │ FK sender_id │     │ FK appt_id   │
│    address   │     │ FK recv_id   │     │    amount    │
│    phone     │     │    content   │     │    method    │
│    email     │     │    timestamp │     │    status    │
│    location  │     │              │     │    date      │
└──────────────┘     └──────────────┘     └──────────────┘

┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│    Roles     │     │RoleAssignment│     │  AuditLogs   │
├──────────────┤     ├──────────────┤     ├──────────────┤
│ PK role_id   │←────│ PK assign_id │     │ PK log_id    │
│    name      │     │ FK user_id   │     │ FK user_id   │
│    desc      │     │ FK role_id   │     │    action    │
│              │     │              │     │    table     │
│              │     │              │     │    timestamp │
└──────────────┘     └──────────────┘     └──────────────┘
```

### Table Definitions

#### Users Table
```sql
CREATE TABLE users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    phone VARCHAR(20),
    status ENUM('active', 'inactive', 'suspended') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

#### Patients Table
```sql
CREATE TABLE patients (
    patient_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT UNIQUE NOT NULL,
    date_of_birth DATE,
    gender ENUM('male', 'female', 'other'),
    blood_type VARCHAR(5),
    allergies TEXT,
    medical_history TEXT,
    emergency_contact_name VARCHAR(100),
    emergency_contact_phone VARCHAR(20),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);
```

#### Doctors Table
```sql
CREATE TABLE doctors (
    doctor_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT UNIQUE NOT NULL,
    specialization VARCHAR(100),
    license_number VARCHAR(50) UNIQUE,
    years_of_experience INT,
    education TEXT,
    biography TEXT,
    consultation_fee DECIMAL(10,2),
    availability_schedule JSON,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);
```

#### Appointments Table
```sql
CREATE TABLE appointments (
    appointment_id INT PRIMARY KEY AUTO_INCREMENT,
    patient_id INT NOT NULL,
    doctor_id INT NOT NULL,
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    duration_minutes INT DEFAULT 30,
    status ENUM('scheduled', 'completed', 'cancelled', 'no_show') DEFAULT 'scheduled',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients(patient_id),
    FOREIGN KEY (doctor_id) REFERENCES doctors(doctor_id)
);
```

---

## API Documentation

### Authentication Endpoints

#### POST /api/auth/login
Authenticate user and receive JWT token.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "user_id": 1,
    "username": "johndoe",
    "email": "user@example.com",
    "role": "patient"
  }
}
```

#### POST /api/auth/register
Register a new user.

**Request:**
```json
{
  "username": "johndoe",
  "email": "user@example.com",
  "password": "securepassword",
  "first_name": "John",
  "last_name": "Doe",
  "phone": "+1234567890"
}
```

### User Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | /api/users | Get all users | Admin |
| GET | /api/users/:id | Get user by ID | Admin/Owner |
| POST | /api/users | Create new user | Admin |
| PUT | /api/users/:id | Update user | Admin/Owner |
| DELETE | /api/users/:id | Delete user | Admin |

### Appointment Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | /api/appointments | Get all appointments | Admin/Doctor |
| GET | /api/appointments/:id | Get appointment | Participant |
| POST | /api/appointments | Create appointment | Patient |
| PUT | /api/appointments/:id | Update appointment | Participant |
| DELETE | /api/appointments/:id | Cancel appointment | Participant |

### Prescription Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | /api/prescriptions | Get prescriptions | Doctor/Patient |
| GET | /api/prescriptions/:id | Get prescription | Participant |
| POST | /api/prescriptions | Create prescription | Doctor |
| PUT | /api/prescriptions/:id | Update prescription | Doctor |

---

## Frontend Components

### Component Hierarchy

```
App
├── Router
│   ├── Layout
│   │   ├── Header
│   │   ├── Sidebar
│   │   └── Footer
│   └── Routes
│       ├── /dashboard
│       │   └── Dashboard
│       ├── /patients
│       │   ├── PatientList
│       │   ├── CreatePatient
│       │   ├── EditPatient
│       │   └── ViewPatient
│       ├── /doctors
│       │   ├── DoctorList
│       │   ├── CreateDoctor
│       │   ├── EditDoctor
│       │   └── ViewDoctor
│       ├── /appointments
│       │   ├── AppointmentList
│       │   ├── CreateAppointment
│       │   ├── EditAppointment
│       │   └── ViewAppointment
│       ├── /prescriptions
│       │   ├── PrescriptionList
│       │   ├── CreatePrescription
│       │   ├── EditPrescription
│       │   └── ViewPrescription
│       ├── /health-centers
│       │   ├── HealthCenterList
│       │   ├── CreateHealthCenter
│       │   ├── EditHealthCenter
│       │   └── ViewHealthCenter
│       ├── /messages
│       │   ├── MessageList
│       │   └── CreateMessage
│       ├── /payments
│       │   ├── PaymentList
│       │   └── CreatePayment
│       └── /admin
│           ├── UserManagement
│           ├── RoleManagement
│           └── AuditLogs
```

### Key Components

#### DataTable Components
All list views use `react-data-table-component` for consistent UI:

```javascript
import DataTable from 'react-data-table-component';

const columns = [
    {
        name: 'Name',
        selector: row => row.name,
        sortable: true,
    },
    {
        name: 'Actions',
        cell: row => (
            <div>
                <button onClick={() => viewItem(row.id)}>View</button>
                <button onClick={() => editItem(row.id)}>Edit</button>
                <button onClick={() => deleteItem(row.id)}>Delete</button>
            </div>
        ),
    },
];
```

---

## Authentication & Security

### JWT Implementation

```javascript
// Backend - Token Generation
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    return jwt.sign(
        { 
            user_id: user.user_id,
            email: user.email,
            role: user.role 
        },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    );
};

// Middleware - Token Verification
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ error: 'Access token required' });
    }
    
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid or expired token' });
        }
        req.user = user;
        next();
    });
};
```

### Password Hashing

```javascript
const bcrypt = require('bcryptjs');

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

const verifyPassword = async (password, hash) => {
    return bcrypt.compare(password, hash);
};
```

### Role-Based Access Control

```javascript
const checkRole = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ error: 'Insufficient permissions' });
        }
        next();
    };
};

// Usage
app.get('/api/admin/users', 
    authenticateToken, 
    checkRole(['admin']), 
    getAllUsers
);
```

---

## Deployment Guide

### Local Development Setup

1. **Clone Repository**
```bash
git clone https://github.com/OumaCavin/telemedicine-project.git
cd telemedicine-project
```

2. **Database Setup**
```bash
# Create MySQL database
mysql -u root -p -e "CREATE DATABASE telemed_db;"

# Run migrations (if available)
cd backend
npm run migrate
```

3. **Backend Setup**
```bash
cd backend
cp .env.example .env
# Edit .env with your database credentials
npm install
npm run dev
```

4. **Frontend Setup**
```bash
cd frontend
npm install
npm start
```

### Production Deployment

#### Backend Deployment (Heroku Example)

```bash
# Create Heroku app
heroku create telemedicine-api

# Add MySQL addon
heroku addons:create jawsdb:kitefin

# Set environment variables
heroku config:set JWT_SECRET=your_secret_key
heroku config:set NODE_ENV=production

# Deploy
git subtree push --prefix backend heroku main
```

#### Frontend Deployment (Vercel Example)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd frontend
vercel --prod
```

### Docker Deployment

```dockerfile
# Dockerfile for Backend
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["node", "app.js"]
```

```yaml
# docker-compose.yml
version: '3.8'
services:
  db:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: rootpass
      MYSQL_DATABASE: telemed_db
    volumes:
      - mysql_data:/var/lib/mysql
  
  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      DB_HOST: db
      DB_USER: root
      DB_PASSWORD: rootpass
      DB_NAME: telemed_db
      JWT_SECRET: your_secret
    depends_on:
      - db
  
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    depends_on:
      - backend

volumes:
  mysql_data:
```

---

## Development Workflow

### Git Workflow

```bash
# Create feature branch
git checkout -b feature/user-authentication

# Make changes and commit
git add .
git commit -m "feat(auth): implement JWT-based authentication

- Add login endpoint with token generation
- Add middleware for token verification
- Implement password hashing with bcrypt"

# Push and create PR
git push origin feature/user-authentication
```

### Commit Message Convention

| Type | Description |
|------|-------------|
| feat | New feature |
| fix | Bug fix |
| docs | Documentation changes |
| style | Code style changes (formatting) |
| refactor | Code refactoring |
| test | Adding or updating tests |
| chore | Build process or auxiliary tool changes |

### Testing Strategy

```bash
# Run backend tests
cd backend
npm test

# Run frontend tests
cd frontend
npm test

# Coverage report
npm run test:coverage
```

---

## Troubleshooting

### Common Issues

#### Database Connection Error
```
Error: Unable to connect to MySQL database
```
**Solution:**
- Verify MySQL service is running
- Check database credentials in .env
- Ensure database exists: `CREATE DATABASE telemed_db;`

#### JWT Token Errors
```
Error: Invalid token
```
**Solution:**
- Check JWT_SECRET is set correctly
- Verify token hasn't expired
- Ensure Authorization header format: `Bearer <token>`

#### CORS Errors
```
Access to fetch at 'http://localhost:5000/api' from origin 'http://localhost:3000' has been blocked by CORS policy
```
**Solution:**
- Ensure CORS middleware is configured in backend
- Check allowed origins in CORS configuration

#### Module Not Found Errors
```
Module not found: Can't resolve 'axios'
```
**Solution:**
```bash
rm -rf node_modules package-lock.json
npm install
```

### Environment Variables Reference

| Variable | Description | Required |
|----------|-------------|----------|
| DB_HOST | MySQL host | Yes |
| DB_USER | MySQL username | Yes |
| DB_PASSWORD | MySQL password | Yes |
| DB_NAME | Database name | Yes |
| JWT_SECRET | Secret key for JWT | Yes |
| PORT | Server port (default: 5000) | No |
| NODE_ENV | Environment (development/production) | No |

---

## Contact & Support

**Developer:** Cavin Otieno  
**GitHub:** [@OumaCavin](https://github.com/OumaCavin)  
**Email:** cavin.otieno012@gmail.com  
**Project URL:** https://github.com/OumaCavin/telemedicine-project

---

*Last Updated: February 2024*  
*Version: 1.0.0*
