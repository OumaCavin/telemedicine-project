# Telemedicine Application

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js" />
  <img src="https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL" />
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
  <img src="https://img.shields.io/badge/Version-1.0.0-green?style=for-the-badge" alt="Version" />
</p>

---

## Overview

This is a full-stack **Telemedicine Application** designed for modern healthcare management. The application provides an intuitive interface for managing users, appointments, payments, roles, prescriptions, health centers, and more. It also includes a comprehensive backend that handles all interactions with the database securely and efficiently.

**TeleMed** is a sophisticated telemedicine platform created to bridge the gap between patients and healthcare providers through virtual means. It seeks to make healthcare accessible by offering features that allow patients to register, locate nearby health centers, schedule appointments with doctors, and consult healthcare professionals online.

---

## Features

### Core Features

- **User Management**: Admins can manage users (Doctors, Patients, and Admins) with role-based access control.
- **Appointments**: Schedule and manage appointments between doctors and patients with real-time availability.
- **Payments**: Handle payments for appointments and manage payment statuses securely.
- **Audit Logs**: Track all actions performed by users in the system for auditing purposes.
- **Prescriptions**: Manage prescriptions for patients with digital record keeping.
- **Health Centers**: Manage health centers in the system with location-based services.
- **Roles & Permissions**: Granular user roles and assign specific permissions.
- **Messages**: Send messages between users for seamless communication.
- **Electronic Health Records (EHR)**: Comprehensive digital health records management.

### Key Capabilities

- **User Authentication and Role Management**:
  - Registration and Login: Provides secure user registration and login systems, with role-based access control for patients and doctors.
  - Profile Management: Allows users to manage profiles, update personal details, and access appointment histories.

- **Location-Based Services**:
  - Health Center Locator: Integrated with Google Maps API, this feature enables users to search for and view nearby health centers based on their current location or a specified area.

- **Appointment Booking**:
  - Doctor Availability: Patients can check doctors' availability and schedule appointments.
  - Appointment Management: Users can book, reschedule, and cancel appointments, receiving timely notifications.

- **Doctor Management**:
  - Specialization and Availability: Doctors can manage their schedules, specializations, and availability to provide up-to-date information for patients.
  - Consultation Services: Virtual consultations are facilitated through a secure communication channel.

- **User-Friendly Interface**:
  - Responsive Design: A clean, responsive layout ensures usability across various devices.
  - Intuitive Navigation: Simple and clear navigation paths for users to book appointments or manage doctor profiles.

- **Security and Compliance**:
  - Data Security: HTTPS, JWT-based authentication, and encryption are used to protect user information.
  - Compliance: Adherence to healthcare standards ensures user data confidentiality and compliance with regulations.

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
| Styled Components | CSS-in-JS styling |

### Backend
| Technology | Purpose |
|------------|---------|
| Node.js | Runtime environment |
| Express.js | Web framework |
| MySQL | Relational database |
| Sequelize ORM | Database ORM |
| JWT | Authentication |
| bcryptjs | Password hashing |
| Winston | Logging |

### Development Tools
| Tool | Purpose |
|------|---------|
| Nodemon | Auto-restart during development |
| Cross-env | Environment variables |

---

## Project Structure

```
telemedicine-project/
├── backend/                    # Backend Node.js application
│   ├── config/                 # Database configuration
│   ├── controllers/            # Route controllers
│   ├── middlewares/            # Express middlewares
│   ├── models/                 # Sequelize models
│   ├── routes/                 # API routes
│   ├── services/               # Business logic
│   ├── utils/                  # Utility functions
│   ├── app.js                  # Main application entry
│   └── package.json            # Backend dependencies
├── frontend/                   # Frontend React application
│   ├── public/                 # Static files
│   ├── src/                    # Source code
│   │   ├── components/         # React components
│   │   ├── pages/              # Page components
│   │   ├── services/           # API service functions
│   │   └── App.js              # Main React component
│   └── package.json            # Frontend dependencies
├── resources/                  # Project resources
└── README.md                   # Project documentation
```

For a detailed and updated **Project Structure** of the telemedicine application, refer to the [Backend README](./backend/README.md) file.

---

## Installation

### Prerequisites

- Node.js (v14 or higher)
- MySQL (v5.7 or higher)
- npm or yarn package manager

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
    Create a `.env` file in the root of the backend directory:
    ```env
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=your_password
    DB_NAME=telemed_db
    JWT_SECRET=your_jwt_secret_key_here
    PORT=5000
    ```

4. **Set up the database**:
    ```bash
    # Create the database in MySQL
    mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS telemed_db;"
    ```

5. **Run the backend**:
    ```bash
    npm start
    ```
    The backend will now be running on `http://localhost:5000`.

    For development with auto-restart:
    ```bash
    npm run dev
    ```

### Frontend Setup

1. **Navigate to the frontend folder**:
    ```bash
    cd ../frontend
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Set up environment variables** (optional):
    Create a `.env` file in the frontend directory:
    ```env
    REACT_APP_API_URL=http://localhost:5000/api
    ```

4. **Start the frontend development server**:
    ```bash
    npm start
    ```
    The frontend will now be running on `http://localhost:3000`.

---

## API Documentation

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | User login (returns JWT token) |
| POST | `/api/auth/register` | User registration |
| POST | `/api/auth/logout` | User logout |

### User Management Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users` | Get all users |
| GET | `/api/users/:id` | Get user by ID |
| POST | `/api/users` | Create new user |
| PUT | `/api/users/:id` | Update user |
| DELETE | `/api/users/:id` | Delete user |

### Appointment Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/appointments` | Get all appointments |
| GET | `/api/appointments/:id` | Get appointment by ID |
| POST | `/api/appointments` | Create new appointment |
| PUT | `/api/appointments/:id` | Update appointment |
| DELETE | `/api/appointments/:id` | Delete appointment |

### Other Endpoints

- `/api/payments` - Payment management
- `/api/prescriptions` - Prescription management
- `/api/health-centers` - Health center management
- `/api/messages` - Message management
- `/api/roles` - Role management
- `/api/audit-logs` - Audit log tracking
- `/api/ehr-records` - Electronic health records

### API Authentication

1. **Login**: Use the `/api/auth/login` endpoint to get a JWT token after providing valid user credentials.

2. **Header setup**: All subsequent requests to protected endpoints must include the JWT token in the Authorization header:
    ```
    Authorization: Bearer <your_jwt_token>
    ```

---

## Frontend Components

### Main Components

| Component | Description |
|-----------|-------------|
| **AuditLogList, CreateAuditLog, EditAuditLog, ViewAuditLog** | Manages audit logs |
| **PaymentList, CreatePayment, EditPayment, ViewPayment** | Manages payments |
| **StatusList, CreateStatus, EditStatus, ViewStatus** | Manages status records |
| **UserList, CreateUser, EditUser, ViewUser** | Manages user records |
| **AdminList, CreateAdmin, EditAdmin, ViewAdmin** | Manages admin records |
| **PatientList, CreatePatient, EditPatient, ViewPatient** | Manages patient records |
| **DoctorList, CreateDoctor, EditDoctor, ViewDoctor** | Manages doctor records |
| **AppointmentList, CreateAppointment, EditAppointment, ViewAppointment** | Manages appointments |
| **PrescriptionList, CreatePrescription, EditPrescription, ViewPrescription** | Manages prescriptions |
| **MessageList, CreateMessage, EditMessage, ViewMessage** | Manages messages |
| **HealthCenterList, CreateHealthCenter, EditHealthCenter, ViewHealthCenter** | Manages health centers |
| **HistoryList, CreateHistory, EditHistory, ViewHistory** | Manages medical histories |
| **RoleList, CreateRole, EditRole, ViewRole** | Manages roles |
| **RoleAssignmentList, CreateRoleAssignment, EditRoleAssignment, ViewRoleAssignment** | Manages role assignments |
| **RoleItemList, CreateRoleItem, EditRoleItem, ViewRoleItem** | Manages role items |
| **EhrRecordList, CreateEhrRecord, EditEhrRecord, ViewEhrRecord** | Manages Electronic Health Records |

---

## Database Schema

The application uses the following main database tables:

- **Users**: Stores user information (patients, doctors, admins)
- **Appointments**: Stores appointment details
- **Payments**: Stores payment transactions
- **Prescriptions**: Stores medical prescriptions
- **HealthCenters**: Stores health center information
- **Messages**: Stores user communications
- **Roles**: Stores role definitions
- **RoleAssignments**: Stores user-role mappings
- **AuditLogs**: Stores system audit trails
- **EhrRecords**: Stores electronic health records

---

## Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcryptjs for secure password storage
- **Role-Based Access Control**: Granular permissions system
- **Input Validation**: Express-validator for request validation
- **CORS Protection**: Configured for secure cross-origin requests
- **Audit Logging**: Comprehensive action tracking

---

## Contributing

We welcome contributions! If you'd like to contribute to the project:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Commit Message Convention

We follow conventional commits:
- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes
- `refactor:` - Code refactoring
- `test:` - Test changes
- `chore:` - Build/dependency changes

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Acknowledgements

- This project uses React, Node.js, Express, and MySQL for building the full-stack application.
- Special thanks to the open-source community for the libraries and tools used in this project.
- Developed and maintained by [Cavin Otieno](https://github.com/OumaCavin).

---

## Pitch Deck

To learn more about the Telemedicine Application, check out our **[Project Pitch Deck](resources/HealthTrack-Revolutionizing-Healthcare-Through-Technology.pptx)**.

This deck provides a detailed overview of the problem, solution, key features, technology stack, business model, and roadmap of the Telemedicine Application.

---

## Contact

For questions, suggestions, or support, please contact:

- **Developer**: Cavin Otieno
- **GitHub**: [@OumaCavin](https://github.com/OumaCavin)
- **Email**: cavin.otieno012@gmail.com

---

<p align="center">
  Made with by <a href="https://github.com/OumaCavin">Cavin Otieno</a>
</p>
