# Telemedicine Application

This is a full-stack Telemedicine Application designed for healthcare management. The application provides an intuitive interface for managing users, appointments, payments, roles, prescriptions, health centers, and more. It also includes a comprehensive backend that handles the interactions with the database.

## Features

- **User Management**: Admins can manage users (Doctors, Patients, and Admins).
- **Appointments**: Schedule and manage appointments between doctors and patients.
- **Payments**: Handle payments for appointments and manage payment statuses.
- **Audit Logs**: Track all actions performed by users in the system for auditing purposes.
- **Prescriptions**: Manage prescriptions for patients.
- **Health Centers**: Manage health centers in the system.
- **Roles & Permissions**: Manage user roles and assign specific permissions.
- **Messages**: Send messages between users for communication.

TeleMed is a sophisticated telemedicine platform created to bridge the gap between patients and healthcare providers through virtual means. It seeks to make healthcare accessible by offering features that allow patients to register, locate nearby health centers, schedule appointments with doctors, and consult healthcare professionals online. With a frontend built using HTML, CSS, and JavaScript and a backend powered by Node.js and MySQL, TeleMed offers a seamless user experience coupled with secure and effective management of medical services.

**More Key Features:**

-**User Authentication and Role Management:**
        Registration and Login: Provides secure user registration and login systems, with role-based access control for patients and doctors.
        Profile Management: Allows users to manage profiles, update personal details, and access appointment histories.

-**Location-Based Services:**
        Health Center Locator: Integrated with Google Maps API, this feature enables users to search for and view nearby health centers based on their current location or a specified area.

-**Appointment Booking:**
        Doctor Availability: Patients can check doctors' availability and schedule appointments.
        Appointment Management: Users can book, reschedule, and cancel appointments, receiving timely notifications.

-**Doctor Management:**
        Specialization and Availability: Doctors can manage their schedules, specializations, and availability to provide up-to-date information for patients.
        Consultation Services: Virtual consultations are facilitated through a secure communication channel.

-**User-Friendly Interface:**
        Responsive Design: A clean, responsive layout ensures usability across various devices.
        Intuitive Navigation: Simple and clear navigation paths for users to book appointments or manage doctor profiles.

-**Security and Compliance:**
        Data Security: HTTPS, JWT-based authentication, and encryption are used to protect user information.
        Compliance: Adherence to healthcare standards ensures user data confidentiality and compliance with regulations.

        
## Tech Stack

- **Frontend**: React, React Router, Axios, DataTables (via CDN)
- **Backend**: Node.js, Express.js, MySQL, Sequelize ORM
- **Authentication**: JWT (JSON Web Tokens) for secure API calls
- **Others**: CSS, HTML, Bootstrap


## Project Structure

For a detailed and updated **Project Structure** of the telemedicine application, refer to the [Updated Project Structure](./backend/README.md) file.

### Frontend (React)

The frontend application is a React app that uses `react-router-dom` for routing and `axios` for making API requests.

#### Main Components

- **AuditLogList, CreateAuditLog, EditAuditLog, ViewAuditLog**: Manages audit logs.
- **PaymentList, CreatePayment, EditPayment, ViewPayment**: Manages payments.
- **StatusList, CreateStatus, EditStatus, ViewStatus**: Manages status records.
- **UserList, CreateUser, EditUser, ViewUser**: Manages user records.
- **AdminList, CreateAdmin, EditAdmin, ViewAdmin**: Manages admin records.
- **PatientList, CreatePatient, EditPatient, ViewPatient**: Manages patient records.
- **DoctorList, CreateDoctor, EditDoctor, ViewDoctor**: Manages doctor records.
- **AppointmentList, CreateAppointment, EditAppointment, ViewAppointment**: Manages appointments.
- **PrescriptionList, CreatePrescription, EditPrescription, ViewPrescription**: Manages prescriptions.
- **MessageList, CreateMessage, EditMessage, ViewMessage**: Manages messages.
- **HealthCenterList, CreateHealthCenter, EditHealthCenter, ViewHealthCenter**: Manages health centers.
- **HistoryList, CreateHistory, EditHistory, ViewHistory**: Manages medical histories.
- **RoleList, CreateRole, EditRole, ViewRole**: Manages roles.
- **RoleAssignmentList, CreateRoleAssignment, EditRoleAssignment, ViewRoleAssignment**: Manages role assignments.
- **RoleItemList, CreateRoleItem, EditRoleItem, ViewRoleItem**: Manages role items.
- **EhrRecordList, CreateEhrRecord, EditEhrRecord, ViewEhrRecord**: Manages Electronic Health Records.

### Backend (Node.js with Express)

The backend API handles CRUD operations for the various entities in the system, including user authentication and authorization. The API is built using Express.js and Sequelize ORM for interacting with the MySQL database.

#### Key Endpoints

- **/api/auth/login** - POST: User login (JWT-based authentication).
- **/api/users** - GET, POST: Get all users or create a new user.
- **/api/users/:id** - GET, PUT, DELETE: View, edit, or delete a specific user.
- **/api/appointments** - GET, POST: Get all appointments or create a new appointment.
- **/api/payments** - GET, POST: Get all payments or create a new payment.
- **/api/audit-logs** - GET: Get all audit logs.
- **/api/prescriptions** - GET, POST: Get all prescriptions or create a new prescription.
- **/api/roles** - GET, POST: Get all roles or create a new role.
- **/api/role-items** - GET, POST: Get all role items or create a new role item.

## Installation

### Backend

1. **Clone the repository**:
    ```bash
    git clone https://github.com/OumaCavin/telemedicine-project.git
    cd telemedicine-app/backend
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Set up environment variables**:
    Create a `.env` file in the root of the backend directory:
    ```
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=password
    DB_NAME=telemed_db
    JWT_SECRET=your_jwt_secret
    ```

4. **Run the backend**:
    ```bash
    npm start
    ```
    The backend will now be running on `http://localhost:5000`.

### Frontend

1. **Navigate to the frontend folder**:
    ```bash
    cd telemedicine-app/frontend
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Start the frontend development server**:
    ```bash
    npm start
    ```
    The frontend will now be running on `http://localhost:3000`.

## API Authentication

1. **Login**: Use the `/api/auth/login` endpoint to get a JWT token after providing valid user credentials. The JWT token is required for making authenticated requests to the API.

2. **Header setup**: All subsequent requests to the backend must include the JWT token in the Authorization header.
    ```bash
    Authorization: Bearer <your_jwt_token>
    ```

## Contributing

We welcome contributions! If you'd like to contribute to the project, please fork the repository, make your changes, and submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- This project uses React, Node.js, Express, and MySQL for building the full-stack application.
- Special thanks to the open-source community for the libraries and tools used in this project.


### **Pitch Deck**

To learn more about the Telemedicine Application, check out our **[Project Pitch Deck](resources/HealthTrack-Revolutionizing-Healthcare-Through-Technology.pptx)**.

This deck provides a detailed overview of the problem, solution, key features, technology stack, business model, and roadmap of the Telemedicine Application.

