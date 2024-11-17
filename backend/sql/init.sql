-- backend/sql/init.sql

-- show databases
-- use telemed
-- GRANT ALL PRIVILEGES ON telemed.* TO 'cavin'@'localhost' IDENTIFIED BY 'Airtel!23'; ==If the user cavin already exists and you just want to grant privileges, remove the IDENTIFIED BY 
-- GRANT ALL PRIVILEGES ON telemed.* TO 'cavin'@'localhost';

-- FLUSH PRIVILEGES;

-- SHOW GRANTS FOR 'cavin'@'localhost';


CREATE DATABASE IF NOT EXISTS telemed;
USE telemed;

-- Users Table
CREATE TABLE IF NOT EXISTS telemed_users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,  -- Ensure hashed value stored in the application layer
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by INT DEFAULT NULL,
    updated_by INT DEFAULT NULL,
    FOREIGN KEY (created_by) REFERENCES telemed_users(user_id) ON DELETE SET NULL,
    FOREIGN KEY (updated_by) REFERENCES telemed_users(user_id) ON DELETE SET NULL
);

-- Admins Table
CREATE TABLE telemed_admins (
    admin_id INT PRIMARY KEY,
    user_id INT NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    date_of_birth DATE NOT NULL,
    gender ENUM('male', 'female', 'other') NOT NULL,
    phone_number VARCHAR(15),
    address VARCHAR(255),
    created_by INT DEFAULT NULL,  -- Tracks the creator
    updated_by INT DEFAULT NULL,  -- Tracks the updater
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES telemed_users(user_id),
    FOREIGN KEY (created_by) REFERENCES telemed_users(user_id) ON DELETE SET NULL,
    FOREIGN KEY (updated_by) REFERENCES telemed_users(user_id) ON DELETE SET NULL
);

-- Patients Table
CREATE TABLE IF NOT EXISTS telemed_patients (
    patient_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    medical_history JSON,  -- For sensitive data, consider encryption
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    date_of_birth DATE NOT NULL,
    gender ENUM('male', 'female', 'other') NOT NULL,
    phone_number VARCHAR(15),
    address VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by INT DEFAULT NULL,
    updated_by INT DEFAULT NULL,
    FOREIGN KEY (user_id) REFERENCES telemed_users(user_id),
    FOREIGN KEY (created_by) REFERENCES telemed_users(user_id) ON DELETE SET NULL,
    FOREIGN KEY (updated_by) REFERENCES telemed_users(user_id) ON DELETE SET NULL
);

-- Doctors Table
CREATE TABLE IF NOT EXISTS telemed_doctors (
    doctor_id INT PRIMARY KEY,
    user_id INT NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    date_of_birth DATE NOT NULL,
    gender ENUM('male', 'female', 'other') NOT NULL,
    phone_number VARCHAR(15),
    address VARCHAR(255),
    specialization VARCHAR(100),
    availability BOOLEAN DEFAULT TRUE,
    qualifications TEXT,
    bio TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by INT DEFAULT NULL,
    updated_by INT DEFAULT NULL,
    FOREIGN KEY (user_id) REFERENCES telemed_users(user_id),
    FOREIGN KEY (created_by) REFERENCES telemed_users(user_id) ON DELETE SET NULL,
    FOREIGN KEY (updated_by) REFERENCES telemed_users(user_id) ON DELETE SET NULL
);

-- Appointments Table
CREATE TABLE IF NOT EXISTS telemed_appointments (
    appointment_id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT,
    doctor_id INT,
    appointment_time DATETIME NOT NULL,
    status ENUM('scheduled', 'canceled', 'completed') DEFAULT 'scheduled',
    appointment_type ENUM('physical', 'virtual') DEFAULT 'physical',
    appointment_duration TIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by INT DEFAULT NULL,
    updated_by INT DEFAULT NULL,
    FOREIGN KEY (patient_id) REFERENCES telemed_users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (doctor_id) REFERENCES telemed_users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (created_by) REFERENCES telemed_users(user_id) ON DELETE SET NULL,
    FOREIGN KEY (updated_by) REFERENCES telemed_users(user_id) ON DELETE SET NULL
);



-- Messages Table (Notifications)
CREATE TABLE IF NOT EXISTS telemed_messages (
    message_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    content TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    priority ENUM('low', 'medium', 'high'),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by INT DEFAULT NULL,
    updated_by INT DEFAULT NULL,
    FOREIGN KEY (user_id) REFERENCES telemed_users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (created_by) REFERENCES telemed_users(user_id) ON DELETE SET NULL,
    FOREIGN KEY (updated_by) REFERENCES telemed_users(user_id) ON DELETE SET NULL
);

-- Health Centers Table
CREATE TABLE telemed_health_centers (
    center_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    location geometry NOT NULL SRID 4326,  -- Add SRID 4326
    contact_info VARCHAR(255),
    type ENUM('hospital', 'clinic', 'lab'),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by INT DEFAULT NULL,
    updated_by INT DEFAULT NULL,
    FOREIGN KEY (created_by) REFERENCES telemed_users(user_id) ON DELETE SET NULL,
    FOREIGN KEY (updated_by) REFERENCES telemed_users(user_id) ON DELETE SET NULL,
    SPATIAL INDEX(location)  -- Spatial index for location-based queries
);

-- Roles Table
CREATE TABLE IF NOT EXISTS telemed_roles (
    role_id INT AUTO_INCREMENT PRIMARY KEY,
    role_name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    created_by INT DEFAULT NULL,
    updated_by INT DEFAULT NULL,
    FOREIGN KEY (created_by) REFERENCES telemed_users(user_id) ON DELETE SET NULL,
    FOREIGN KEY (updated_by) REFERENCES telemed_users(user_id) ON DELETE SET NULL
);

-- Role Assignments Table
CREATE TABLE IF NOT EXISTS telemed_role_assignments (
    role_assignment_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    role_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by INT DEFAULT NULL,
    updated_by INT DEFAULT NULL,
    FOREIGN KEY (user_id) REFERENCES telemed_users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (role_id) REFERENCES telemed_roles(role_id) ON DELETE CASCADE,
    FOREIGN KEY (created_by) REFERENCES telemed_users(user_id) ON DELETE SET NULL,
    FOREIGN KEY (updated_by) REFERENCES telemed_users(user_id) ON DELETE SET NULL
);

-- Role Items Table
CREATE TABLE IF NOT EXISTS telemed_role_items (
    role_item_id INT AUTO_INCREMENT PRIMARY KEY,
    role_id INT,
    permission VARCHAR(255),  -- Consider a separate permissions table for consistency
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by INT DEFAULT NULL,
    updated_by INT DEFAULT NULL,
    FOREIGN KEY (role_id) REFERENCES telemed_roles(role_id) ON DELETE CASCADE,
    FOREIGN KEY (created_by) REFERENCES telemed_users(user_id) ON DELETE SET NULL,
    FOREIGN KEY (updated_by) REFERENCES telemed_users(user_id) ON DELETE SET NULL
);

-- EHR (Electronic Health Records) Table
CREATE TABLE IF NOT EXISTS telemed_ehr_records (
    ehr_record_id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT NOT NULL,
    doctor_id INT,
    record_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    medical_conditions TEXT,
    allergies TEXT,
    medications TEXT,
    visit_date DATETIME NOT NULL,
    diagnosis TEXT,
    treatment JSON,
    encounter_type ENUM('in-person' ,'telehealth-visits'),
    created_by INT DEFAULT NULL,
    updated_by INT DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES telemed_users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (doctor_id) REFERENCES telemed_users(user_id) ON DELETE SET NULL,
    FOREIGN KEY (created_by) REFERENCES telemed_users(user_id) ON DELETE SET NULL,
    FOREIGN KEY (updated_by) REFERENCES telemed_users(user_id) ON DELETE SET NULL
);
-- Prescriptions Table
CREATE TABLE IF NOT EXISTS telemed_prescriptions (
    prescription_id INT AUTO_INCREMENT PRIMARY KEY,
    ehr_id INT NOT NULL,
    patient_id INT NOT NULL,
    doctor_id INT DEFAULT NULL,  -- Allow doctor_id to be NULL
    appointment_id INT,
    medication_name VARCHAR(255) NOT NULL,
    dosage VARCHAR(100) NOT NULL,
    frequency VARCHAR(100) NOT NULL,
    medication JSON,
    dosage_instructions TEXT,
    prescribed_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    refill_date DATETIME,
    status ENUM('active', 'completed', 'canceled') DEFAULT 'active',
    created_by INT DEFAULT NULL,
    updated_by INT DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (ehr_id) REFERENCES telemed_ehr_records(ehr_record_id) ON DELETE CASCADE,
    FOREIGN KEY (appointment_id) REFERENCES telemed_appointments(appointment_id) ON DELETE CASCADE,
    FOREIGN KEY (patient_id) REFERENCES telemed_users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (doctor_id) REFERENCES telemed_users(user_id) ON DELETE SET NULL,  -- doctor_id can be NULL now
    FOREIGN KEY (created_by) REFERENCES telemed_users(user_id) ON DELETE SET NULL,
    FOREIGN KEY (updated_by) REFERENCES telemed_users(user_id) ON DELETE SET NULL
);

-- Payments Table
CREATE TABLE IF NOT EXISTS telemed_payments (
    payment_id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT NOT NULL,
    appointment_id INT,
    amount DECIMAL(10, 2) NOT NULL,
    payment_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    payment_method ENUM('credit_card', 'insurance', 'cash', 'debit_card', 'paypal', 'bank_transfer') NOT NULL,
    currency_code CHAR(3) NOT NULL DEFAULT 'KES', 
    status ENUM('pending', 'completed', 'failed') DEFAULT 'pending',
    reference_number VARCHAR(255), 
    created_by INT DEFAULT NULL,
    updated_by INT DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES telemed_users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (appointment_id) REFERENCES telemed_appointments(appointment_id) ON DELETE SET NULL,
    FOREIGN KEY (created_by) REFERENCES telemed_users(user_id) ON DELETE SET NULL,
    FOREIGN KEY (updated_by) REFERENCES telemed_users(user_id) ON DELETE SET NULL
);

-- Status Table
CREATE TABLE telemed_status (
    status_id INT AUTO_INCREMENT PRIMARY KEY,
    status_name VARCHAR(50) NOT NULL UNIQUE,
    description VARCHAR(255) NOT NULL,
    created_by INT DEFAULT NULL,
    updated_by INT DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- History Table
CREATE TABLE IF NOT EXISTS telemed_history (
    history_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    status_id INT NOT NULL,
    action VARCHAR(255),
    action_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by INT DEFAULT NULL,
    FOREIGN KEY (user_id) REFERENCES telemed_users(user_id),
    FOREIGN KEY (status_id) REFERENCES telemed_status(status_id),
    FOREIGN KEY (created_by) REFERENCES telemed_users(user_id) ON DELETE SET NULL
);

-- Audit Logs Table
CREATE TABLE IF NOT EXISTS telemed_audit_logs (
    log_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    action VARCHAR(255),
    previous_state TEXT,
    current_state TEXT,
    affected_table VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by INT DEFAULT NULL,
    FOREIGN KEY (user_id) REFERENCES telemed_users(user_id),
    FOREIGN KEY (created_by) REFERENCES telemed_users(user_id) ON DELETE SET NULL
);
-- Indexes
-- Indexes for Users Table
CREATE INDEX idx_username ON telemed_users(username);
CREATE INDEX idx_email ON telemed_users(email);

-- Indexes for Patients Table
CREATE INDEX idx_patient_id ON telemed_patients(patient_id);
CREATE INDEX idx_phone_number ON telemed_patients(phone_number);

-- Indexes for Doctors Table
CREATE INDEX idx_doctor_id ON telemed_doctors(doctor_id);
CREATE INDEX idx_specialization ON telemed_doctors(specialization);

-- Indexes for Admin Table
CREATE INDEX idx_admin_id ON telemed_admins(admin_id);
CREATE INDEX idx_phone_number ON telemed_admins(phone_number);

-- Indexes for Appointments Table
CREATE INDEX idx_patient_appointments ON telemed_appointments(patient_id);
CREATE INDEX idx_doctor_appointments ON telemed_appointments(doctor_id);
CREATE INDEX idx_appointment_time ON telemed_appointments(appointment_time);

-- Indexes for Prescriptions Table
CREATE INDEX idx_prescription_patient ON telemed_prescriptions(patient_id);
CREATE INDEX idx_prescription_doctor ON telemed_prescriptions(doctor_id);

-- Indexes for Messages Table
CREATE INDEX idx_user_messages ON telemed_messages(user_id);
CREATE INDEX idx_message_read ON telemed_messages(is_read);

-- Indexes for Audit Logs Table
CREATE INDEX idx_audit_user ON telemed_audit_logs(user_id);

-- Indexes for History Table
CREATE INDEX idx_history_user ON telemed_history(user_id);

-- Indexes for Roles Table
CREATE INDEX idx_role_name ON telemed_roles(role_name);

-- Indexes for Role Assignments Table
CREATE INDEX idx_role_assignment_user ON telemed_role_assignments(user_id);
CREATE INDEX idx_role_assignment_role ON telemed_role_assignments(role_id);

-- Indexes for Role Items Table
CREATE INDEX idx_role_item_role ON telemed_role_items(role_id);

-- Indexes for EHR Records Table
CREATE INDEX idx_patient_ehr ON telemed_ehr_records(patient_id);
CREATE INDEX idx_doctor_ehr ON telemed_ehr_records(doctor_id);
CREATE INDEX idx_record_date ON telemed_ehr_records(record_date);

-- Indexes for Payments Table
CREATE INDEX idx_payment_appointment ON telemed_payments(appointment_id);
CREATE INDEX idx_payment_date ON telemed_payments(payment_date);

-- No need to recreate the spatial index for location if already created
-- CREATE SPATIAL INDEX idx_location ON telemed_health_centers(location);

