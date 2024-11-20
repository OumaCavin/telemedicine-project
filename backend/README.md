
# updated project structure for  telemedicine application:


telemedicine-project/
│
├── backend/
│   ├── config
│   │   ├── db.js                   # Database connection
│   │   └── server.js               # Server setup and Express configuration
│   ├── middlewares
│   │   ├── authMiddleware.js       # Auth check (JWT token validation)
│   │   ├── checkStatus.js          # Middleware to check appointment or patient status
│   │   └── errorMiddleware.js      # Global error handling middleware
│   ├── controllers/
│   │   ├── PatientController.js
│   │   ├── UserController.js
│   │   ├── RoleController.js
│   │   ├── RoleAssignmentController.js
│   │   ├── RoleItemController.js
│   │   ├── DoctorController.js
│   │   ├── AdminController.js
│   │   ├── HealthCenterController.js
│   │   ├── AppointmentController.js
│   │   ├── PrescriptionController.js
│   │   ├── EHRController.js
│   │   ├── PaymentController.js
│   │   ├── HistoryController.js
│   │   └── AuditController.js
│   │
│   ├── models/
│   │   ├── Patient.js
│   │   ├── User.js
│   │   ├── Role.js
│   │   ├── RoleAssignment.js
│   │   ├── RoleItem.js
│   │   ├── Doctor.js
│   │   ├── Admin.js
│   │   ├── HealthCenter.js
│   │   ├── Appointment.js
│   │   ├── Prescription.js
│   │   ├── EHR.js
│   │   ├── Payment.js
│   │   ├── History.js
│   │   ├── Audit.js
│   │   └── search/
│   │       ├── patientSearch.js
│   │       ├── userSearch.js
│   │       ├── roleSearch.js
│   │       ├── roleAssignmentSearch.js
│   │       ├── roleItemSearch.js
│   │       ├── doctorSearch.js
│   │       ├── adminSearch.js
│   │       ├── healthCenterSearch.js
│   │       ├── appointmentSearch.js
│   │       ├── prescriptionSearch.js
│   │       ├── ehrSearch.js
│   │       ├── paymentSearch.js
│   │       ├── historySearch.js
│   │       └── auditSearch.js
│   │
│   ├── routes/
│   │   ├── patientRoutes.js
│   │   ├── userRoutes.js
│   │   ├── roleRoutes.js
│   │   ├── roleAssignmentRoutes.js
│   │   ├── roleItemRoutes.js
│   │   ├── doctorRoutes.js
│   │   ├── adminRoutes.js
│   │   ├── healthCenterRoutes.js
│   │   ├── appointmentRoutes.js
│   │   ├── prescriptionRoutes.js
│   │   ├── ehrRoutes.js
│   │   ├── paymentRoutes.js
│   │   ├── historyRoutes.js
│   │   └── auditRoutes.js
│   │
│   ├── views/
│   │   ├── patient/
│   │   │   ├── _form.ejs
│   │   │   ├── _search.ejs
│   │   │   ├── create.ejs
│   │   │   ├── index.ejs
│   │   │   ├── update.ejs
│   │   │   └── view.ejs
│   │   ├── user/
│   │   │   ├── _form.ejs
│   │   │   ├── _search.ejs
│   │   │   ├── create.ejs
│   │   │   ├── index.ejs
│   │   │   ├── update.ejs
│   │   │   └── view.ejs
│   │   ├── role/
│   │   │   ├── _form.ejs
│   │   │   ├── _search.ejs
│   │   │   ├── create.ejs
│   │   │   ├── index.ejs
│   │   │   ├── update.ejs
│   │   │   └── view.ejs
│   │   ├── roleAssignment/
│   │   │   ├── _form.ejs
│   │   │   ├── _search.ejs
│   │   │   ├── create.ejs
│   │   │   ├── index.ejs
│   │   │   ├── update.ejs
│   │   │   └── view.ejs
│   │   ├── roleItem/
│   │   │   ├── _form.ejs
│   │   │   ├── _search.ejs
│   │   │   ├── create.ejs
│   │   │   ├── index.ejs
│   │   │   ├── update.ejs
│   │   │   └── view.ejs
│   │   ├── doctor/
│   │   │   ├── _form.ejs
│   │   │   ├── _search.ejs
│   │   │   ├── create.ejs
│   │   │   ├── index.ejs
│   │   │   ├── update.ejs
│   │   │   └── view.ejs
│   │   ├── admin/
│   │   │   ├── _form.ejs
│   │   │   ├── _search.ejs
│   │   │   ├── create.ejs
│   │   │   ├── index.ejs
│   │   │   ├── update.ejs
│   │   │   └── view.ejs
│   │   ├── healthCenter/
│   │   │   ├── _form.ejs
│   │   │   ├── _search.ejs
│   │   │   ├── create.ejs
│   │   │   ├── index.ejs
│   │   │   ├── update.ejs
│   │   │   └── view.ejs
│   │   ├── appointment/
│   │   │   ├── _form.ejs
│   │   │   ├── _search.ejs
│   │   │   ├── create.ejs
│   │   │   ├── index.ejs
│   │   │   ├── update.ejs
│   │   │   └── view.ejs
│   │   ├── prescription/
│   │   │   ├── _form.ejs
│   │   │   ├── _search.ejs
│   │   │   ├── create.ejs
│   │   │   ├── index.ejs
│   │   │   ├── update.ejs
│   │   │   └── view.ejs
│   │   ├── ehr/
│   │   │   ├── _form.ejs
│   │   │   ├── _search.ejs
│   │   │   ├── create.ejs
│   │   │   ├── index.ejs
│   │   │   ├── update.ejs
│   │   │   └── view.ejs
│   │   ├── payment/
│   │   │   ├── _form.ejs
│   │   │   ├── _search.ejs
│   │   │   ├── create.ejs
│   │   │   ├── index.ejs
│   │   │   ├── update.ejs
│   │   │   └── view.ejs
│   │   ├── history/
│   │   │   ├── _form.ejs
│   │   │   ├── _search.ejs
│   │   │   ├── create.ejs
│   │   │   ├── index.ejs
│   │   │   ├── update.ejs
│   │   │   └── view.ejs
│   │   ├── audit/
│   │   │   ├── _form.ejs
│   │   │   ├── _search.ejs
│   │   │   ├── create.ejs
│   │   │   ├── index.ejs
│   │   │   ├── update.ejs
│   │   │   └── view.ejs
│   │
│   ├── sql/
│   │   ├── init.sql                 # Database schema creation and initialization
│   │   ├── procedures.sql           # Stored procedures
│   │   └── triggers.sql             # Database triggers
│   ├── services /                   # Business logic services
│   └── utils/                       # Utility functions (e.g., token generation)
│   │   ├── logger.js
│   │   ├── statusConstants.js
│   │   └── validator.js
│   ├── app.js   # Main app entry point
│   └── package.json
│
└── frontend/  # React frontend
    ├── src/
    │   ├── components/
    │   │   ├── Header.js
    │   │   ├── Footer.js
    │   │   ├── Navbar.js
    │   │   ├── Sidebar.js
    │   │   ├── AppointmentForm.js
    │   │   ├── PatientList.js
    │   │   └── PrescriptionForm.js
    │   ├── pages/
    │   │   ├── HomePage.js
    │   │   ├── Dashboard.js
    │   │   ├── LoginPage.js
    │   │   ├── PatientPage.js
    │   │   ├── AppointmentPage.js
    │   │   ├── PrescriptionPage.js
    │   │   └── AdminPage.js
    │   ├── services/
    │   │   ├── api.js  # API calls to backend
    │   │   └── auth.js  # Authentication services
    │   ├── styles/
    │   │   ├── main.css
    │   │   └── theme.css
    │   └── App.js  # Main React entry point
    ├── public/
    │   ├── index.html
    │   └── favicon.ico
    ├── .gitignore
    ├── package.json
    ├── README.md
    └── webpack.config.js


### Breakdown of directories:
- **backend/**: Contains everything related to the backend server (Express.js). Includes models, controllers, routes, views, and configuration for handling database connections.
  - **controllers/**: Logic for handling requests and responses for various resources like patients, doctors, appointments, etc.
  - **models/**: Database schema models.
  - **routes/**: Express route definitions for each resource (patients, appointments, etc.).
  - **views/**: Server-rendered views (if needed for admin interface).
  - **config/**: Database configuration file (e.g., for MySQL pool).
- **frontend/**: Contains the React.js-based frontend for the telemedicine app.
  - **components/**: Reusable React components like headers, footers, and forms.
  - **pages/**: Specific pages in your app such as home, dashboard, and appointment pages.
  - **services/**: Contains API call functions to interact with the backend.
  - **styles/**: Styling files (CSS) for the frontend.
  - **public/**: Static files like `index.html` and `favicon.ico`.

This structure is modular and scalable, separating frontend and backend responsibilities while promoting reusability and easy management of both parts.



### 1. Relevant Table Names for the System Features

These tables reflect the features defined in the User Specification Document, addressing user roles, healthcare appointments, and records:

   - **Users**
     - Columns: `user_id`, `username`, `email`, `password`, `role_id`, `created_at`, `updated_at`
   - **Roles**
     - Columns: `role_id`, `role_name`
   - **Patients**
     - Columns: `patient_id`, `user_id (foreign key)`, `full_name`, `age`, `gender`, `contact`, `address`, `medical_history`, `created_at`
   - **Doctors**
     - Columns: `doctor_id`, `user_id (foreign key)`, `full_name`, `specialization`, `contact`, `availability_schedule`, `created_at`
   - **Appointments**
     - Columns: `appointment_id`, `patient_id (foreign key)`, `doctor_id (foreign key)`, `appointment_date`, `status`, `reason`, `created_at`, `updated_at`
   - **Messages**
     - Columns: `message_id`, `sender_id`, `receiver_id`, `message_content`, `sent_at`
   - **Prescriptions**
     - Columns: `prescription_id`, `appointment_id (foreign key)`, `doctor_id (foreign key)`, `patient_id (foreign key)`, `prescription_details`, `prescribed_at`
   - **Health Centers (optional)**
     - Columns: `center_id`, `name`, `address`, `contact`, `latitude`, `longitude`
   - **Audit Logs**
     - Columns: `log_id`, `user_id (foreign key)`, `action`, `timestamp`, `ip_address`

---

### 2. System Workflow

This workflow describes the system interactions from the perspectives of **Patients**, **Doctors**, and **Admins**:

#### **Patient Workflow**
1. **Registration/Login**:
   - A new patient registers using a unique username or email.
   - The patient logs in, triggering a session with JWT-based authentication.
2. **Profile Setup**:
   - The patient updates their medical history and personal details after registration.
3. **Booking an Appointment**:
   - The patient checks available doctors, selects one, and books an appointment.
   - An appointment confirmation and reminder notifications are sent to the patient.
4. **Consultation**:
   - At the scheduled time, the patient joins a virtual consultation.
5. **Messaging**:
   - The patient can communicate with the doctor through secure messaging for follow-ups.
6. **Receiving Prescription**:
   - After the consultation, the doctor sends a prescription, accessible via the patient’s account.

#### **Doctor Workflow**
1. **Registration/Login**:
   - The doctor registers or logs in.
2. **Profile and Schedule Management**:
   - The doctor updates their profile with specialization, contact, and availability.
3. **Appointment Review**:
   - The doctor reviews their scheduled appointments and accesses patient information.
4. **Consultation**:
   - During the appointment, the doctor consults and examines the patient’s medical history.
5. **Prescriptions**:
   - After consultation, the doctor can issue and upload a prescription for the patient.
6. **Follow-Up**:
   - Post-appointment, the doctor responds to patient queries through the messaging feature.

#### **Admin Workflow**
1. **Login and Management Console**:
   - The admin logs in to access the system console.
2. **User and Role Management**:
   - The admin manages user roles, approving new doctors and monitoring user activity.
3. **Audit Logs and Reports**:
   - The admin views reports on system usage and reviews audit logs for security compliance.
4. **System Maintenance**:
   - The admin updates permissions, performs security checks, and monitors backend services.

---

### 3. System Limitations

While the telemedicine system aims to cover many needs for patients and doctors, it does have some limitations:

   - **Internet Dependence**: The system requires a stable internet connection for both patients and doctors, which may be a challenge in regions with limited connectivity.
   - **Data Privacy Concerns**: Protecting sensitive health information requires strict security standards. Any breach or unauthorized access could lead to legal and ethical issues.
   - **Platform Compatibility**: Ensuring that the system works seamlessly on all devices and operating systems may pose challenges.
   - **Availability of Doctors**: Limited availability of doctors, especially specialists, could result in appointment delays and patient dissatisfaction.
   - **Health Center Locator**: Using an external API (e.g., Google Maps) to locate health centers can have limitations in areas with poor mapping coverage.
   - **Non-Real-Time Monitoring**: For telemedicine to be fully effective, real-time health monitoring tools (e.g., wearable integrations) could be beneficial, but they are not included in this system.
   - **Authentication and Role Management Complexity**: Managing various roles, permissions, and security protocols for data access adds complexity, especially with compliance regulations like HIPAA.
   - **Dependency on Third-Party Tools**: Reliance on external services like Google Maps or video conferencing tools may introduce limitations if the third-party services change or become unavailable.

--- 


The updated **Finalized Status Table Structure** 

---

### **Common Status Table** (for shared statuses between Patient, Doctor, Admin):

| **Status ID** | **Status Name**               | **Description**                                       |
|---------------|-------------------------------|-------------------------------------------------------|
| 1             | Registered                    | User has successfully registered.                     |
| 2             | Pending Verification          | Account status refers to **PendingVerification**.    |
| 3             | Verified                      | Account status refers to **Verified**.                |
| 4             | Active                        | Account is currently active.                          |
| 5             | Inactive                      | User account is temporarily inactive.                 |
| 6             | Logged In                     | User has logged into the system.                      |
| 7             | Logged Out                    | User has logged out of the system.                    |
| 8             | Blocked                       | Account status refers to **Account Blocked**.         |
| 9             | Unblocked                     | Account status refers to **Account Unblocked**.       |
| 10            | Deleted                       | Account status refers to **Account Deleted**.         |
| 11            | Archived                      | Account has been archived for historical purposes.    |

---

### **Patient-Specific Status Table**:

| **Status ID** | **Status Name**                    | **Description**                                                   |
|---------------|-------------------------------------|-------------------------------------------------------------------|
| 12            | Patient Profile Updated            | Patient updated their medical history and details.                |
| 13            | Profile Not Updated                | Patient hasn’t completed profile setup.                           |
| 14            | Appointment Booked                 | Patient booked an appointment.                                    |
| 15            | Appointment Cancelled              | Patient cancelled their scheduled appointment.                    |
| 16            | Prescription Uploaded              | Patient uploaded their prescription to the system.                |
| 17            | Prescription Not Uploaded          | No prescription has been uploaded by the patient.                 |
| 18            | Appointment Confirmed              | Appointment confirmed and scheduled.                              |
| 19            | Appointment Not Confirmed          | Appointment confirmation is pending.                              |
| 20            | Reminder Notification Sent         | Reminder sent to the patient.                                     |
| 21            | Reminder Notification Not Sent     | Reminder notification not sent.                                   |
| 22            | Payment Done                       | Payment successfully made by patient.                             |
| 23            | Consultation Scheduled             | Patient’s consultation has been scheduled.                        |
| 24            | Consultation Completed             | Consultation successfully concluded.                             |
| 25            | Consultation Cancelled             | Consultation appointment cancelled.                              |
| 26            | Virtual Consultation Started       | Patient joined a virtual consultation.                            |
| 27            | Virtual Consultation Completed     | Virtual consultation session completed.                          |
| 28            | Virtual Consultation Cancelled     | Virtual consultation cancelled.                                  |
| 29            | Prescription Sent                  | Doctor sent a prescription to the patient.                        |

---

### **Doctor-Specific Status Table**:

| **Status ID** | **Status Name**                    | **Description**                                                   |
|---------------|-------------------------------------|-------------------------------------------------------------------|
| 30            | Doctor Profile Updated             | Doctor updated their profile details.                             |
| 31            | Scheduled Appointment Reviewed      | Doctor reviewed a scheduled appointment.                          |
| 32            | Consultation Completed             | Doctor completed a consultation session.                          |
| 33            | Patient Medical History Examined   | Doctor accessed and examined the patient’s medical history.       |
| 34            | Prescription Issued                | Doctor issued a prescription post-consultation.                   |
| 35            | Prescription Uploaded              | Doctor uploaded the prescription to the system.                   |
| 36            | Post-Appointment Done              | Doctor finalized post-appointment notes or actions.               |
| 37            | Follow-Up Done                     | Doctor responded to follow-up queries from the patient.           |

---

### **Admin-Specific Status Table**:

| **Status ID** | **Status Name**                   | **Description**                                                   |
|---------------|------------------------------------|-------------------------------------------------------------------|
| 38            | Logged In                          | Admin has logged into the system.                                |
| 39            | User Role Updated                  | Admin updated a user’s role in the system.                        |
| 40            | User Approved                      | Admin approved a new user account (e.g., doctor).                 |
| 41            | User Activity Monitored            | Admin monitored user activity logs.                              |
| 42            | Audit Logs Reviewed                | Admin reviewed system audit logs for compliance.                  |
| 43            | Permissions Updated                | Admin updated user permissions for system access.                 |
| 44            | Security Checks Performed          | Admin executed a security check or vulnerability scan.            |
| 45            | Backend Services Monitored         | Admin monitored backend services for performance.                 |
| 46            | Maintenance Performed              | Admin performed scheduled maintenance on the system.              |
| 47            | Report Generated                   | Admin generated a usage or compliance report.                     |

---
