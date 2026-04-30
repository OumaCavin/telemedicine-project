# TeleMed - Telemedicine Application

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js" />
  <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white" alt="Sequelize" />
  <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white" alt="JWT" />
  <img src="https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white" alt="Bootstrap" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Maintained%20by-Cavin%20Otieno-blue?style=for-the-badge" alt="Maintained by Cavin Otieno" />
  <img src="https://img.shields.io/github/license/OumaCavin/telemedicine-project?style=for-the-badge" alt="License" />
  <img src="https://img.shields.io/badge/Version-1.1.0-green?style=for-the-badge" alt="Version" />
</p>

---

## Live Demo

🚀 **Access the live application:** https://94b9eznnowyc.space.minimax.io

The frontend is deployed with hash-based routing. Use the following credentials to test:

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@test.com | password123 |
| Test User | test@example.com | password123 |

---

## Overview

**TeleMed** is a comprehensive full-stack telemedicine platform designed for modern healthcare management. The application provides an intuitive interface for managing patients, appointments, doctors, prescriptions, health centers, and more. It includes a robust backend API that handles all database interactions securely and efficiently.

**TeleMed** bridges the gap between patients and healthcare providers through virtual means, making healthcare accessible by offering features that allow patients to register, locate nearby health centers, schedule appointments with doctors, and consult healthcare professionals online.

---

## Features

### Core Features

- **User Management**: Complete user management with role-based access control (Admin, Doctor, Patient, Receptionist)
- **Appointments**: Schedule and manage appointments between doctors and patients with real-time availability tracking
- **Prescriptions**: Digital prescription management for patients with comprehensive record keeping
- **Health Centers**: Manage health centers with location-based services and Google Maps integration
- **Roles & Permissions**: Granular role-based access control system with role assignments
- **Messages**: Secure messaging between users for seamless communication
- **Electronic Health Records (EHR)**: Comprehensive digital health records management
- **Payment Tracking**: Payment status management for appointments
- **Audit Logs**: Track all user actions for auditing and compliance

### Key Capabilities

- **User Authentication and Role Management**:
  - Secure registration and login with JWT-based authentication
  - Role-based access control for different user types
  - Profile management with appointment history access

- **Appointment Booking**:
  - Doctor availability checking and management
  - Book, reschedule, and cancel appointments
  - Patient-specific appointment views

- **Doctor Management**:
  - Specialization and schedule management
  - Availability status updates
  - Patient appointment history access

- **Health Center Locator**:
  - Integrated with Google Maps API
  - Search nearby health centers by location

- **Responsive Design**:
  - Clean, responsive layout for all devices
  - Intuitive navigation and user experience

---

## Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| React 18 | UI Library |
| React Router DOM | Client-side routing |
| Axios | HTTP client for API requests |
| Bootstrap 5 | CSS framework |
| Formik & Yup | Form handling and validation |
| React Toastify | Notifications |

### Backend
| Technology | Purpose |
|------------|---------|
| Node.js | Runtime environment |
| Express.js | Web framework |
| PostgreSQL | Relational database (Render) |
| Sequelize ORM | Database ORM |
| JWT | Authentication |
| bcrypt | Password hashing |
| Winston | Logging |

### Deployment
| Platform | Service |
|----------|---------|
| Frontend | MiniMax Deploy |
| Backend | Render |
| Database | PostgreSQL (Render) |

---

## Project Structure

```
telemedicine-project/
├── backend/                    # Backend Node.js application
│   ├── config/                 # Database configuration
│   ├── constants/              # Application constants
│   ├── controllers/            # Route controllers
│   ├── middlewares/            # Express middlewares
│   ├── models/                # Sequelize models
│   ├── routes/                # API routes
│   ├── services/              # Business logic
│   ├── utils/                 # Utility functions
│   ├── app.js                 # Main application entry
│   └── package.json           # Backend dependencies
├── frontend/                  # Frontend React application
│   ├── public/                # Static files
│   ├── src/                  # Source code
│   │   ├── components/       # React components
│   │   ├── pages/           # Page components
│   │   ├── axios.js         # API configuration
│   │   └── App.js           # Main React component
│   └── package.json          # Frontend dependencies
└── README.md                 # Project documentation
```

---

## API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | User login (returns JWT token) |
| POST | `/api/auth/register` | User registration |
| POST | `/api/auth/logout` | User logout |

### User Management
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users` | Get all users |
| GET | `/api/users/:id` | Get user by ID |
| POST | `/api/users` | Create new user |
| PUT | `/api/users/:id` | Update user |
| DELETE | `/api/users/:id` | Delete user |

### Appointments
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/appointments` | Get all appointments |
| GET | `/api/appointments/:id` | Get appointment by ID |
| POST | `/api/appointments` | Create new appointment |
| PUT | `/api/appointments/:id` | Update appointment |
| DELETE | `/api/appointments/:id` | Delete appointment |

### Doctors
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/doctors` | Get all doctors |
| GET | `/api/doctors/appointments` | Get doctor appointments |

### Patients
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/patients` | Get all patients |
| GET | `/api/patients/profile` | Get patient profile |
| GET | `/api/patients/appointments` | Get patient appointments |

### Other Endpoints
- `/api/prescriptions` - Prescription management
- `/api/health-centers` - Health center management
- `/api/messages` - Message management
- `/api/roles` - Role management
- `/api/role-assignments` - Role assignment management
- `/api/ehr-records` - Electronic health records
- `/api/payments` - Payment management
- `/api/statuses` - Status management
- `/api/admins` - Admin management

### API Authentication

1. **Login**: Use `/api/auth/login` to get a JWT token
2. **Header**: Include the token in subsequent requests:
   ```
   Authorization: Bearer <your_jwt_token>
   ```

---

## Database Schema

The application uses PostgreSQL with the following main tables:

- **telemed_users**: User information (patients, doctors, admins)
- **telemed_roles**: Role definitions (Admin, Doctor, Patient, Receptionist)
- **telemed_role_assignments**: User-role mappings
- **telemed_appointments**: Appointment details
- **telemed_prescriptions**: Medical prescriptions
- **telemed_health_centers**: Health center information
- **telemed_messages**: User communications
- **telemed_ehr_records**: Electronic health records
- **telemed_payments**: Payment transactions
- **telemed_status**: Status records

---

## Installation

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm package manager

### Backend Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/OumaCavin/telemedicine-project.git
   cd telemedicine-project/backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file:
   ```env
   DB_HOST=your_db_host
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_NAME=telemed_db
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   ```

4. **Run the backend**:
   ```bash
   npm start
   # or for development
   npm run dev
   ```

### Frontend Setup

1. **Navigate to frontend**:
   ```bash
   cd ../frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm start
   ```

---

## Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt for secure password storage
- **Role-Based Access Control**: Granular permissions system
- **Input Validation**: Express-validator for request validation
- **CORS Protection**: Configured for secure cross-origin requests
- **Audit Logging**: Comprehensive action tracking with Winston

---

## Recent Updates

### Version 1.1.0
- Migrated from MySQL to PostgreSQL database
- Updated seed data with correct role IDs (2, 3, 4, 5)
- Added automatic role assignment on user registration
- Fixed API endpoint path handling (removed duplicate `/api/` prefix)
- Enhanced error logging for better debugging

---

## Contributing

We welcome contributions! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Commit Message Convention
- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes
- `refactor:` - Code refactoring
- `chore:` - Build/dependency changes

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Acknowledgements

- React, Node.js, Express for the full-stack framework
- PostgreSQL for reliable data persistence
- Open-source community for libraries and tools
- Developed and maintained by [Cavin Otieno](https://github.com/OumaCavin)

---

## Contact

For questions, suggestions, or support:

- **Developer**: Cavin Otieno
- **GitHub**: [@OumaCavin](https://github.com/OumaCavin)
- **Email**: cavin.otieno012@gmail.com

---

<p align="center">
  Made with by <a href="https://github.com/OumaCavin">Cavin Otieno</a>
</p>