-- backend/sql/triggers.sql
-- ### Explanation
-- 1. **Triggers**: Each trigger is set to activate after an update operation on its respective table. It captures the user ID (or relevant identifier) and logs the previous and current states of the changed fields.

-- 2. **Audit Log Insertion**: The triggers insert a new record into the `audit_logs` table, detailing the action performed, which table was affected, and the values before and after the change.

-- 3. **DELIMITER**: The `DELIMITER` command is used to change the statement delimiter temporarily to allow for multi-statement definitions, such as those used in triggers.

DELIMITER $$

-- Trigger for INSERT on telemed_users
CREATE TRIGGER after_users_insert
AFTER INSERT ON telemed_users
FOR EACH ROW
BEGIN
    INSERT INTO telemed_audit_logs (action, user_id, affected_table, previous_state, current_state, created_at)
    VALUES ('INSERT', NEW.user_id, 'telemed_users', NULL, CONCAT_WS(',', NEW.email), NOW());
END$$

-- Trigger for UPDATE on telemed_users
CREATE TRIGGER after_users_update
AFTER UPDATE ON telemed_users
FOR EACH ROW
BEGIN
    INSERT INTO telemed_audit_logs (action, user_id, affected_table, previous_state, current_state, created_at)
    VALUES ('UPDATE', OLD.user_id, 'telemed_users', CONCAT_WS(',', OLD.email), CONCAT_WS(',', NEW.email), NOW());
END$$

-- Trigger for DELETE on telemed_users
CREATE TRIGGER after_users_delete
AFTER DELETE ON telemed_users
FOR EACH ROW
BEGIN
    INSERT INTO telemed_audit_logs (action, user_id, affected_table, previous_state, current_state, created_at)
    VALUES ('DELETE', OLD.user_id, 'telemed_users', CONCAT_WS(',', OLD.email), NULL, NOW());
END$$

DELIMITER ;


-- ### SQL Triggers for telemed_admins


DELIMITER $$

-- Trigger for INSERT on telemed_admins
CREATE TRIGGER after_admins_insert
AFTER INSERT ON telemed_admins
FOR EACH ROW
BEGIN
    INSERT INTO telemed_audit_logs (action, user_id, affected_table, previous_state, current_state, created_at)
    VALUES ('INSERT', NEW.user_id, 'telemed_admins', NULL, CONCAT_WS(',', NEW.first_name, NEW.last_name, NEW.phone_number), NOW());
END$$

-- Trigger for UPDATE on telemed_admins
CREATE TRIGGER after_admins_update
AFTER UPDATE ON telemed_admins
FOR EACH ROW
BEGIN
    INSERT INTO telemed_audit_logs (action, user_id, affected_table, previous_state, current_state, created_at)
    VALUES ('UPDATE', OLD.user_id, 'telemed_admins',
            CONCAT_WS(',', OLD.first_name, OLD.last_name, OLD.phone_number),
            CONCAT_WS(',', NEW.first_name, NEW.last_name, NEW.phone_number), NOW());
END$$

-- Trigger for DELETE on telemed_admins
CREATE TRIGGER after_admins_delete
AFTER DELETE ON telemed_admins
FOR EACH ROW
BEGIN
    INSERT INTO telemed_audit_logs (action, user_id, affected_table, previous_state, current_state, created_at)
    VALUES ('DELETE', OLD.user_id, 'telemed_admins',
            CONCAT_WS(',', OLD.first_name, OLD.last_name, OLD.phone_number), NULL, NOW());
END$$

DELIMITER ;


DELIMITER $$

-- Trigger for INSERT on telemed_patients
CREATE TRIGGER after_patients_insert
AFTER INSERT ON telemed_patients
FOR EACH ROW
BEGIN
    INSERT INTO telemed_audit_logs (action, user_id, affected_table, previous_state, current_state, created_at)
    VALUES ('INSERT', NEW.patient_id, 'telemed_patients', NULL, NEW.medical_history, NOW());
END$$

-- Trigger for UPDATE on telemed_patients
CREATE TRIGGER after_patients_update
AFTER UPDATE ON telemed_patients
FOR EACH ROW
BEGIN
    INSERT INTO telemed_audit_logs (action, user_id, affected_table, previous_state, current_state, created_at)
    VALUES ('UPDATE', OLD.patient_id, 'telemed_patients', OLD.medical_history, NEW.medical_history, NOW());
END$$

-- Trigger for DELETE on telemed_patients
CREATE TRIGGER after_patients_delete
AFTER DELETE ON telemed_patients
FOR EACH ROW
BEGIN
    INSERT INTO telemed_audit_logs (action, user_id, affected_table, previous_state, current_state, created_at)
    VALUES ('DELETE', OLD.patient_id, 'telemed_patients', OLD.medical_history, NULL, NOW());
END$$

DELIMITER ;

DELIMITER $$

-- Trigger for INSERT on telemed_doctors
CREATE TRIGGER after_doctors_insert
AFTER INSERT ON telemed_doctors
FOR EACH ROW
BEGIN
    INSERT INTO telemed_audit_logs (action, user_id, affected_table, previous_state, current_state, created_at)
    VALUES ('INSERT', NEW.user_id, 'telemed_doctors', NULL, CONCAT_WS(',', NEW.specialization, NEW.availability), NOW());
END$$

-- Trigger for UPDATE on telemed_doctors
CREATE TRIGGER after_doctors_update
AFTER UPDATE ON telemed_doctors
FOR EACH ROW
BEGIN
    INSERT INTO telemed_audit_logs (action, user_id, affected_table, previous_state, current_state, created_at)
    VALUES ('UPDATE', OLD.user_id, 'telemed_doctors',
            CONCAT_WS(',', OLD.specialization, OLD.availability),
            CONCAT_WS(',', NEW.specialization, NEW.availability), NOW());
END$$

-- Trigger for DELETE on telemed_doctors
CREATE TRIGGER after_doctors_delete
AFTER DELETE ON telemed_doctors
FOR EACH ROW
BEGIN
    INSERT INTO telemed_audit_logs (action, user_id, affected_table, previous_state, current_state, created_at)
    VALUES ('DELETE', OLD.user_id, 'telemed_doctors',
            CONCAT_WS(',', OLD.specialization, OLD.availability), NULL, NOW());
END$$

DELIMITER ;

DELIMITER $$
-- Trigger for INSERT on telemed_appointments
CREATE TRIGGER after_appointments_insert
AFTER INSERT ON telemed_appointments
FOR EACH ROW
BEGIN
      INSERT INTO telemed_audit_logs (action, user_id, affected_table, previous_state, current_state, created_at)
    VALUES ('INSERT', NEW.patient_id, 'telemed_appointments', NULL, CONCAT_WS(',', NEW.doctor_id, NEW.patient_id, NEW.appointment_time), NOW());
END$$

-- Trigger for UPDATE on telemed_appointments
CREATE TRIGGER after_appointments_update
AFTER UPDATE ON telemed_appointments
FOR EACH ROW
BEGIN
    INSERT INTO telemed_audit_logs (action, user_id, affected_table, previous_state, current_state, created_at)
    VALUES ('UPDATE', OLD.patient_id, 'telemed_appointments',
            CONCAT_WS(',', OLD.doctor_id, OLD.patient_id, OLD.appointment_time),
            CONCAT_WS(',', NEW.doctor_id, NEW.patient_id, NEW.appointment_time), NOW());
END$$

-- Trigger for DELETE on telemed_appointments
CREATE TRIGGER after_appointments_delete
AFTER DELETE ON telemed_appointments
FOR EACH ROW
BEGIN
     INSERT INTO telemed_audit_logs (action, user_id, affected_table, previous_state, current_state, created_at)
    VALUES ('DELETE', OLD.patient_id, 'telemed_appointments',
            CONCAT_WS(',', OLD.doctor_id, OLD.patient_id, OLD.appointment_time), NULL, NOW());
END$$

DELIMITER ;




-- ### SQL Triggers for telemed_messages


DELIMITER $$

-- Trigger for INSERT on telemed_messages
CREATE TRIGGER after_messages_insert
AFTER INSERT ON telemed_messages
FOR EACH ROW
BEGIN
    INSERT INTO telemed_audit_logs (action, user_id, affected_table, previous_state, current_state, created_at)
    VALUES ('INSERT', NEW.user_id, 'telemed_messages', NULL, CONCAT_WS(',', NEW.content, NEW.is_read), NOW());
END$$

-- Trigger for UPDATE on telemed_messages
CREATE TRIGGER after_messages_update
AFTER UPDATE ON telemed_messages
FOR EACH ROW
BEGIN
    INSERT INTO telemed_audit_logs (action, user_id, affected_table, previous_state, current_state, created_at)
    VALUES ('UPDATE', OLD.user_id, 'telemed_messages',
            CONCAT_WS(',', OLD.content, OLD.is_read),
            CONCAT_WS(',', NEW.content, NEW.is_read), NOW());
END$$

-- Trigger for DELETE on telemed_messages
CREATE TRIGGER after_messages_delete
AFTER DELETE ON telemed_messages
FOR EACH ROW
BEGIN
    INSERT INTO telemed_audit_logs (action, user_id, affected_table, previous_state, current_state, created_at)
    VALUES ('DELETE', OLD.user_id, 'telemed_messages',
            CONCAT_WS(',', OLD.content, OLD.is_read), NULL, NOW());
END$$

DELIMITER ;



-- ### SQL Triggers for telemed_health_centers


DELIMITER $$

-- Trigger for INSERT on telemed_health_centers
CREATE TRIGGER after_health_centers_insert
AFTER INSERT ON telemed_health_centers
FOR EACH ROW
BEGIN
    INSERT INTO telemed_audit_logs (action, user_id, affected_table, previous_state, current_state, created_at)
    VALUES ('INSERT', NEW.user_id, 'telemed_health_centers', NULL, CONCAT_WS(',', NEW.center_name, NEW.location), NOW());
END$$

-- Trigger for UPDATE on telemed_health_centers
CREATE TRIGGER after_health_centers_update
AFTER UPDATE ON telemed_health_centers
FOR EACH ROW
BEGIN
    INSERT INTO telemed_audit_logs (action, user_id, affected_table, previous_state, current_state, created_at)
    VALUES ('UPDATE', OLD.user_id, 'telemed_health_centers',
            CONCAT_WS(',', OLD.center_name, OLD.location),
            CONCAT_WS(',', NEW.center_name, NEW.location), NOW());
END$$

-- Trigger for DELETE on telemed_health_centers
CREATE TRIGGER after_health_centers_delete
AFTER DELETE ON telemed_health_centers
FOR EACH ROW
BEGIN
    INSERT INTO telemed_audit_logs (action, user_id, affected_table, previous_state, current_state, created_at)
    VALUES ('DELETE', OLD.user_id, 'telemed_health_centers',
            CONCAT_WS(',', OLD.center_name, OLD.location), NULL, NOW());
END$$

DELIMITER ;

-- Triggers for telemed_roles
DELIMITER $$

-- Trigger for INSERT on telemed_roles
CREATE TRIGGER after_roles_insert
AFTER INSERT ON telemed_roles
FOR EACH ROW
BEGIN
    INSERT INTO telemed_audit_logs (action, user_id, affected_table, previous_state, current_state, created_at)
    VALUES ('INSERT', NEW.created_by, 'telemed_roles', NULL, CONCAT_WS(',', NEW.role_name), NOW());
END$$

-- Trigger for UPDATE on telemed_roles
CREATE TRIGGER after_roles_update
AFTER UPDATE ON telemed_roles
FOR EACH ROW
BEGIN
    INSERT INTO telemed_audit_logs (action, user_id, affected_table, previous_state, current_state, created_at)
    VALUES ('UPDATE', NEW.updated_by, 'telemed_roles',
            OLD.role_name,
            NEW.role_name, NOW());
END$$

-- Trigger for DELETE on telemed_roles
CREATE TRIGGER after_roles_delete
AFTER DELETE ON telemed_roles
FOR EACH ROW
BEGIN
    INSERT INTO telemed_audit_logs (action, user_id, affected_table, previous_state, current_state, created_at)
    VALUES ('DELETE', OLD.updated_by, 'telemed_roles',
            OLD.role_name, NULL, NOW());
END$$

DELIMITER ;



-- ### SQL Triggers for telemed_role_assignments


DELIMITER $$

-- Trigger for INSERT on telemed_role_assignments
CREATE TRIGGER after_role_assignments_insert
AFTER INSERT ON telemed_role_assignments
FOR EACH ROW
BEGIN
    INSERT INTO telemed_audit_logs (action, user_id, affected_table, previous_state, current_state, created_at)
    VALUES ('INSERT', NEW.user_id, 'telemed_role_assignments', NULL, CONCAT_WS(',', NEW.user_id, NEW.role_id), NOW());
END$$

-- Trigger for UPDATE on telemed_role_assignments
CREATE TRIGGER after_role_assignments_update
AFTER UPDATE ON telemed_role_assignments
FOR EACH ROW
BEGIN
    INSERT INTO telemed_audit_logs (action, user_id, affected_table, previous_state, current_state, created_at)
    VALUES ('UPDATE', OLD.user_id, 'telemed_role_assignments',
            CONCAT_WS(',', OLD.user_id, OLD.role_id),
            CONCAT_WS(',', NEW.user_id, NEW.role_id), NOW());
END$$

-- Trigger for DELETE on telemed_role_assignments
CREATE TRIGGER after_role_assignments_delete
AFTER DELETE ON telemed_role_assignments
FOR EACH ROW
BEGIN
    INSERT INTO telemed_audit_logs (action, user_id, affected_table, previous_state, current_state, created_at)
    VALUES ('DELETE', OLD.user_id, 'telemed_role_assignments',
            CONCAT_WS(',', OLD.user_id, OLD.role_id), NULL, NOW());
END$$

DELIMITER ;


-- Triggers for telemed_role_items
DELIMITER $$

-- Trigger for INSERT on telemed_role_items
CREATE TRIGGER after_role_items_insert
AFTER INSERT ON telemed_role_items
FOR EACH ROW
BEGIN
    INSERT INTO telemed_audit_logs (action, user_id, affected_table, previous_state, current_state, created_at)
    VALUES ('INSERT', NEW.created_by, 'telemed_role_items', NULL, CONCAT_WS(',', NEW.role_id, NEW.permission), NOW());
END$$

-- Trigger for UPDATE on telemed_role_items
CREATE TRIGGER after_role_items_update
AFTER UPDATE ON telemed_role_items
FOR EACH ROW
BEGIN
    INSERT INTO telemed_audit_logs (action, user_id, affected_table, previous_state, current_state, created_at)
    VALUES ('UPDATE', NEW.updated_by, 'telemed_role_items',
            CONCAT_WS(',', OLD.role_id, OLD.permission),
            CONCAT_WS(',', NEW.role_id, NEW.permission), NOW());
END$$

-- Trigger for DELETE on telemed_role_items
CREATE TRIGGER after_role_items_delete
AFTER DELETE ON telemed_role_items
FOR EACH ROW
BEGIN
    INSERT INTO telemed_audit_logs (action, user_id, affected_table, previous_state, current_state, created_at)
    VALUES ('DELETE', OLD.updated_by, 'telemed_role_items',
            CONCAT_WS(',', OLD.role_id, OLD.permission), NULL, NOW());
END$$

DELIMITER ;
DELIMITER $$

-- Trigger for INSERT on telemed_ehr_records
CREATE TRIGGER after_ehr_records_insert
AFTER INSERT ON telemed_ehr_records
FOR EACH ROW
BEGIN
    INSERT INTO telemed_audit_logs (action, user_id, affected_table, previous_state, current_state, created_at)
    VALUES ('INSERT', NEW.created_by, 'telemed_ehr_records', NULL, 
            CONCAT_WS(',', NEW.medical_conditions, NEW.allergies, NEW.medications, NEW.visit_date, NEW.diagnosis), NOW());
END$$

-- Trigger for UPDATE on telemed_ehr_records
CREATE TRIGGER after_ehr_records_update
AFTER UPDATE ON telemed_ehr_records
FOR EACH ROW
BEGIN
    INSERT INTO telemed_audit_logs (action, user_id, affected_table, previous_state, current_state, created_at)
    VALUES ('UPDATE', NEW.updated_by, 'telemed_ehr_records',
            CONCAT_WS(',', OLD.medical_conditions, OLD.allergies, OLD.medications, OLD.visit_date, OLD.diagnosis),
            CONCAT_WS(',', NEW.medical_conditions, NEW.allergies, NEW.medications, NEW.visit_date, NEW.diagnosis), NOW());
END$$

-- Trigger for DELETE on telemed_ehr_records
CREATE TRIGGER after_ehr_records_delete
AFTER DELETE ON telemed_ehr_records
FOR EACH ROW
BEGIN
    INSERT INTO telemed_audit_logs (action, user_id, affected_table, previous_state, current_state, created_at)
    VALUES ('DELETE', OLD.updated_by, 'telemed_ehr_records',
            CONCAT_WS(',', OLD.medical_conditions, OLD.allergies, OLD.medications, OLD.visit_date, OLD.diagnosis), NULL, NOW());
END$$

DELIMITER ;

DELIMITER $$

-- Trigger for INSERT on telemed_prescriptions
CREATE TRIGGER after_prescriptions_insert
AFTER INSERT ON telemed_prescriptions
FOR EACH ROW
BEGIN
    INSERT INTO telemed_audit_logs (action, user_id, affected_table, previous_state, current_state, created_at)
    VALUES ('INSERT', NEW.created_by, 'telemed_prescriptions', NULL, 
            CONCAT_WS(',', NEW.medication_name, NEW.dosage), NOW());
END$$

-- Trigger for UPDATE on telemed_prescriptions
CREATE TRIGGER after_prescriptions_update
AFTER UPDATE ON telemed_prescriptions
FOR EACH ROW
BEGIN
    INSERT INTO telemed_audit_logs (action, user_id, affected_table, previous_state, current_state, created_at)
    VALUES ('UPDATE', NEW.updated_by, 'telemed_prescriptions',
            CONCAT_WS(',', OLD.medication_name, OLD.dosage),
            CONCAT_WS(',', NEW.medication_name, NEW.dosage), NOW());
END$$

-- Trigger for DELETE on telemed_prescriptions
CREATE TRIGGER after_prescriptions_delete
AFTER DELETE ON telemed_prescriptions
FOR EACH ROW
BEGIN
    INSERT INTO telemed_audit_logs (action, user_id, affected_table, previous_state, current_state, created_at)
    VALUES ('DELETE', OLD.updated_by, 'telemed_prescriptions',
            CONCAT_WS(',', OLD.medication_name, OLD.dosage), NULL, NOW());
END$$

DELIMITER ;


-- ### SQL Triggers for telemed_payments

DELIMITER $$

-- Trigger for INSERT on telemed_payments
CREATE TRIGGER after_payments_insert
AFTER INSERT ON telemed_payments
FOR EACH ROW
BEGIN
    INSERT INTO telemed_audit_logs (action, user_id, affected_table, previous_state, current_state, created_at)
    VALUES ('INSERT', NEW.created_by, 'telemed_payments', NULL, 
            CONCAT_WS(',', NEW.amount, NEW.payment_method), NOW());
END$$

-- Trigger for UPDATE on telemed_payments
CREATE TRIGGER after_payments_update
AFTER UPDATE ON telemed_payments
FOR EACH ROW
BEGIN
    INSERT INTO telemed_audit_logs (action, user_id, affected_table, previous_state, current_state, created_at)
    VALUES ('UPDATE', NEW.updated_by, 'telemed_payments',
            CONCAT_WS(',', OLD.amount, OLD.payment_method),
            CONCAT_WS(',', NEW.amount, NEW.payment_method), NOW());
END$$

-- Trigger for DELETE on telemed_payments
CREATE TRIGGER after_payments_delete
AFTER DELETE ON telemed_payments
FOR EACH ROW
BEGIN
    INSERT INTO telemed_audit_logs (action, user_id, affected_table, previous_state, current_state, created_at)
    VALUES ('DELETE', OLD.updated_by, 'telemed_payments',
            CONCAT_WS(',', OLD.amount, OLD.payment_method), NULL, NOW());
END$$

DELIMITER ;

DELIMITER $$

-- Trigger for INSERT on telemed_status
CREATE TRIGGER after_status_insert
AFTER INSERT ON telemed_status
FOR EACH ROW
BEGIN
    INSERT INTO telemed_audit_logs (action, user_id, affected_table, previous_state, current_state, created_at)
    VALUES ('INSERT', NEW.created_by, 'telemed_status', NULL, CONCAT_WS(',', NEW.status_name, NEW.description), NOW());
END$$

-- Trigger for UPDATE on telemed_status
CREATE TRIGGER after_status_update
AFTER UPDATE ON telemed_status
FOR EACH ROW
BEGIN
    INSERT INTO telemed_audit_logs (action, user_id, affected_table, previous_state, current_state, created_at)
    VALUES ('UPDATE', OLD.updated_by, 'telemed_status',
            CONCAT_WS(',', OLD.status_name, OLD.description),
            CONCAT_WS(',', NEW.status_name, NEW.description), NOW());
END$$

-- Trigger for DELETE on telemed_status
CREATE TRIGGER after_status_delete
AFTER DELETE ON telemed_status
FOR EACH ROW
BEGIN
    INSERT INTO telemed_audit_logs (action, user_id, affected_table, previous_state, current_state, created_at)
    VALUES ('DELETE', OLD.created_by, 'telemed_status',
            CONCAT_WS(',', OLD.status_name, OLD.description), NULL, NOW());
END$$

DELIMITER ;

-- ### SQL Triggers for telemed_history


DELIMITER $$

-- Trigger for INSERT on telemed_history
CREATE TRIGGER after_history_insert
AFTER INSERT ON telemed_history
FOR EACH ROW
BEGIN
    INSERT INTO telemed_audit_logs (action, user_id, affected_table, previous_state, current_state, created_at)
    VALUES ('INSERT', NEW.user_id, 'telemed_history', NULL, CONCAT_WS(',', NEW.status_id, NEW.action), NOW());
END$$

-- Trigger for UPDATE on telemed_history
CREATE TRIGGER after_history_update
AFTER UPDATE ON telemed_history
FOR EACH ROW
BEGIN
    INSERT INTO telemed_audit_logs (action, user_id, affected_table, previous_state, current_state, created_at)
    VALUES ('UPDATE', OLD.user_id, 'telemed_history',
            CONCAT_WS(',', OLD.status_id, OLD.action),
            CONCAT_WS(',', NEW.status_id, NEW.action), NOW());
END$$

-- Trigger for DELETE on telemed_history
CREATE TRIGGER after_history_delete
AFTER DELETE ON telemed_history
FOR EACH ROW
BEGIN
    INSERT INTO telemed_audit_logs (action, user_id, affected_table, previous_state, current_state, created_at)
    VALUES ('DELETE', OLD.user_id, 'telemed_history',
            CONCAT_WS(',', OLD.status_id, OLD.action), NULL, NOW());
END$$

DELIMITER ;

-- ======================================

-- - **Triggers**: Each table has three triggers (after insert, update, and delete) that log actions to the `telemed_history` table. 
-- Each trigger captures the user responsible for the action (using `created_by` or `updated_by`) and logs a descriptive action string.
-- - **History Logging**: This logging mechanism ensures that any changes made to the records are tracked and can be audited later.


DELIMITER //

-- Trigger for Users Table
CREATE TRIGGER before_insert_users
BEFORE INSERT ON telemed_users
FOR EACH ROW
SET NEW.created_by = IFNULL(NEW.created_by, 0),
    NEW.updated_by = IFNULL(NEW.updated_by, 0);

CREATE TRIGGER before_update_users
BEFORE UPDATE ON telemed_users
FOR EACH ROW
SET NEW.updated_by = IFNULL(NEW.updated_by, 0);

-- Trigger for Patients Table
CREATE TRIGGER before_insert_patients
BEFORE INSERT ON telemed_patients
FOR EACH ROW
SET NEW.created_by = IFNULL(NEW.created_by, 0),
    NEW.updated_by = IFNULL(NEW.updated_by, 0);

CREATE TRIGGER before_update_patients
BEFORE UPDATE ON telemed_patients
FOR EACH ROW
SET NEW.updated_by = IFNULL(NEW.updated_by, 0);

-- Trigger for Doctors Table
CREATE TRIGGER before_insert_doctors
BEFORE INSERT ON telemed_doctors
FOR EACH ROW
SET NEW.created_by = IFNULL(NEW.created_by, 0),
    NEW.updated_by = IFNULL(NEW.updated_by, 0);

CREATE TRIGGER before_update_doctors
BEFORE UPDATE ON telemed_doctors
FOR EACH ROW
SET NEW.updated_by = IFNULL(NEW.updated_by, 0);

-- Trigger for Appointments Table
CREATE TRIGGER before_insert_appointments
BEFORE INSERT ON telemed_appointments
FOR EACH ROW
SET NEW.created_by = IFNULL(NEW.created_by, 0),
    NEW.updated_by = IFNULL(NEW.updated_by, 0);

CREATE TRIGGER before_update_appointments
BEFORE UPDATE ON telemed_appointments
FOR EACH ROW
SET NEW.updated_by = IFNULL(NEW.updated_by, 0);

-- Trigger for Prescriptions Table
CREATE TRIGGER before_insert_prescriptions
BEFORE INSERT ON telemed_prescriptions
FOR EACH ROW
SET NEW.created_by = IFNULL(NEW.created_by, 0),
    NEW.updated_by = IFNULL(NEW.updated_by, 0);

CREATE TRIGGER before_update_prescriptions
BEFORE UPDATE ON telemed_prescriptions
FOR EACH ROW
SET NEW.updated_by = IFNULL(NEW.updated_by, 0);

-- Trigger for Messages Table
CREATE TRIGGER before_insert_messages
BEFORE INSERT ON telemed_messages
FOR EACH ROW
SET NEW.created_by = IFNULL(NEW.created_by, 0);

CREATE TRIGGER before_update_messages
BEFORE UPDATE ON telemed_messages
FOR EACH ROW
SET NEW.updated_by = IFNULL(NEW.updated_by, 0);

-- Trigger for Health Centers Table
CREATE TRIGGER before_insert_health_centers
BEFORE INSERT ON telemed_health_centers
FOR EACH ROW
SET NEW.created_by = IFNULL(NEW.created_by, 0),
    NEW.updated_by = IFNULL(NEW.updated_by, 0);

CREATE TRIGGER before_update_health_centers
BEFORE UPDATE ON telemed_health_centers
FOR EACH ROW
SET NEW.updated_by = IFNULL(NEW.updated_by, 0);

-- Trigger for Audit Logs Table
CREATE TRIGGER before_insert_audit_logs
BEFORE INSERT ON telemed_audit_logs
FOR EACH ROW
SET NEW.created_by = IFNULL(NEW.created_by, 0);

-- Trigger for History Table
CREATE TRIGGER before_insert_history
BEFORE INSERT ON telemed_history
FOR EACH ROW
SET NEW.created_by = IFNULL(NEW.created_by, 0);

-- Trigger for Roles Table
CREATE TRIGGER before_insert_roles
BEFORE INSERT ON telemed_roles
FOR EACH ROW
SET NEW.created_by = IFNULL(NEW.created_by, 0),
    NEW.updated_by = IFNULL(NEW.updated_by, 0);

-- Trigger for Role Assignments Table
CREATE TRIGGER before_insert_role_assignments
BEFORE INSERT ON telemed_role_assignments
FOR EACH ROW
SET NEW.created_by = IFNULL(NEW.created_by, 0);

-- Trigger for Role Items Table
CREATE TRIGGER before_insert_role_items
BEFORE INSERT ON telemed_role_items
FOR EACH ROW
SET NEW.created_by = IFNULL(NEW.created_by, 0);

-- Trigger for EHR Records Table
CREATE TRIGGER before_insert_ehr_records
BEFORE INSERT ON telemed_ehr_records
FOR EACH ROW
SET NEW.created_by = IFNULL(NEW.created_by, 0),
    NEW.updated_by = IFNULL(NEW.updated_by, 0);

CREATE TRIGGER before_update_ehr_records
BEFORE UPDATE ON telemed_ehr_records
FOR EACH ROW
SET NEW.updated_by = IFNULL(NEW.updated_by, 0);

-- Trigger for Payments Table
CREATE TRIGGER before_insert_payments
BEFORE INSERT ON telemed_payments
FOR EACH ROW
SET NEW.created_by = IFNULL(NEW.created_by, 0),
    NEW.updated_by = IFNULL(NEW.updated_by, 0);

CREATE TRIGGER before_update_payments
BEFORE UPDATE ON telemed_payments
FOR EACH ROW
SET NEW.updated_by = IFNULL(NEW.updated_by, 0);

-- Trigger for Admins Table
CREATE TRIGGER before_insert_admins
BEFORE INSERT ON telemed_admins
FOR EACH ROW
SET NEW.created_by = IFNULL(NEW.created_by, 0),
    NEW.updated_by = IFNULL(NEW.updated_by, 0);

CREATE TRIGGER before_update_admins
BEFORE UPDATE ON telemed_admins
FOR EACH ROW
SET NEW.updated_by = IFNULL(NEW.updated_by, 0);


-- To implement triggers for managing CRUD operations on the TeleMed system tables and log those actions in the `telemed_history`
--  table, you can create triggers for each table where modifications occur.
-- These triggers will insert records into the `telemed_history` table whenever a record is created, updated, or deleted.




-- ### SQL triggers for managing CRUD operations on the specified TeleMed system tables  logging those actions in the `telemed_history` table:

-- #### 1. Users Table


CREATE TRIGGER after_insert_telemed_users
AFTER INSERT ON telemed_users
FOR EACH ROW
BEGIN
    INSERT INTO telemed_history (user_id, action) 
    VALUES (NEW.user_id, CONCAT('Created user: ', NEW.username));
END;

CREATE TRIGGER after_update_telemed_users
AFTER UPDATE ON telemed_users
FOR EACH ROW
BEGIN
    INSERT INTO telemed_history (user_id, action) 
    VALUES (NEW.user_id, CONCAT('Updated user: ', NEW.username));
END;

CREATE TRIGGER after_delete_telemed_users
AFTER DELETE ON telemed_users
FOR EACH ROW
BEGIN
    INSERT INTO telemed_history (user_id, action) 
    VALUES (OLD.user_id, CONCAT('Deleted user: ', OLD.username));
END;


-- #### 2. Patients Table


CREATE TRIGGER after_insert_telemed_patients
AFTER INSERT ON telemed_patients
FOR EACH ROW
BEGIN
    INSERT INTO telemed_history (user_id, action) 
    VALUES (NEW.created_by, CONCAT('Created patient: ', NEW.first_name, ' ', NEW.last_name));
END;

CREATE TRIGGER after_update_telemed_patients
AFTER UPDATE ON telemed_patients
FOR EACH ROW
BEGIN
    INSERT INTO telemed_history (user_id, action) 
    VALUES (NEW.updated_by, CONCAT('Updated patient: ', NEW.first_name, ' ', NEW.last_name));
END;

CREATE TRIGGER after_delete_telemed_patients
AFTER DELETE ON telemed_patients
FOR EACH ROW
BEGIN
    INSERT INTO telemed_history (user_id, action) 
    VALUES (OLD.created_by, CONCAT('Deleted patient: ', OLD.first_name, ' ', OLD.last_name));
END;


-- #### 3. Doctors Table


CREATE TRIGGER after_insert_telemed_doctors
AFTER INSERT ON telemed_doctors
FOR EACH ROW
BEGIN
    INSERT INTO telemed_history (user_id, action) 
    VALUES (NEW.created_by, CONCAT('Created doctor: ', NEW.first_name, ' ', NEW.last_name));
END;

CREATE TRIGGER after_update_telemed_doctors
AFTER UPDATE ON telemed_doctors
FOR EACH ROW
BEGIN
    INSERT INTO telemed_history (user_id, action) 
    VALUES (NEW.updated_by, CONCAT('Updated doctor: ', NEW.first_name, ' ', NEW.last_name));
END;

CREATE TRIGGER after_delete_telemed_doctors
AFTER DELETE ON telemed_doctors
FOR EACH ROW
BEGIN
    INSERT INTO telemed_history (user_id, action) 
    VALUES (OLD.created_by, CONCAT('Deleted doctor: ', OLD.first_name, ' ', OLD.last_name));
END;


-- #### 4. Appointments Table


CREATE TRIGGER after_insert_telemed_appointments
AFTER INSERT ON telemed_appointments
FOR EACH ROW
BEGIN
    INSERT INTO telemed_history (user_id, action) 
    VALUES (NEW.created_by, CONCAT('Created appointment ID: ', NEW.appointment_id));
END;

CREATE TRIGGER after_update_telemed_appointments
AFTER UPDATE ON telemed_appointments
FOR EACH ROW
BEGIN
    INSERT INTO telemed_history (user_id, action) 
    VALUES (NEW.updated_by, CONCAT('Updated appointment ID: ', NEW.appointment_id));
END;

CREATE TRIGGER after_delete_telemed_appointments
AFTER DELETE ON telemed_appointments
FOR EACH ROW
BEGIN
    INSERT INTO telemed_history (user_id, action) 
    VALUES (OLD.created_by, CONCAT('Deleted appointment ID: ', OLD.appointment_id));
END;


-- #### 5. EHR Records Table


CREATE TRIGGER after_insert_telemed_ehr_records
AFTER INSERT ON telemed_ehr_records
FOR EACH ROW
BEGIN
    INSERT INTO telemed_history (user_id, action) 
    VALUES (NEW.created_by, CONCAT('Created EHR record ID: ', NEW.ehr_record_id));
END;

CREATE TRIGGER after_update_telemed_ehr_records
AFTER UPDATE ON telemed_ehr_records
FOR EACH ROW
BEGIN
    INSERT INTO telemed_history (user_id, action) 
    VALUES (NEW.updated_by, CONCAT('Updated EHR record ID: ', NEW.ehr_record_id));
END;

CREATE TRIGGER after_delete_telemed_ehr_records
AFTER DELETE ON telemed_ehr_records
FOR EACH ROW
BEGIN
    INSERT INTO telemed_history (user_id, action) 
    VALUES (OLD.created_by, CONCAT('Deleted EHR record ID: ', OLD.ehr_record_id));
END;


-- #### 6. Payments Table


CREATE TRIGGER after_insert_telemed_payments
AFTER INSERT ON telemed_payments
FOR EACH ROW
BEGIN
    INSERT INTO telemed_history (user_id, action) 
    VALUES (NEW.created_by, CONCAT('Created payment ID: ', NEW.payment_id));
END;

CREATE TRIGGER after_update_telemed_payments
AFTER UPDATE ON telemed_payments
FOR EACH ROW
BEGIN
    INSERT INTO telemed_history (user_id, action) 
    VALUES (NEW.updated_by, CONCAT('Updated payment ID: ', NEW.payment_id));
END;

CREATE TRIGGER after_delete_telemed_payments
AFTER DELETE ON telemed_payments
FOR EACH ROW
BEGIN
    INSERT INTO telemed_history (user_id, action) 
    VALUES (OLD.created_by, CONCAT('Deleted payment ID: ', OLD.payment_id));
END;


-- #### 7. Prescriptions Table


CREATE TRIGGER after_insert_telemed_prescriptions
AFTER INSERT ON telemed_prescriptions
FOR EACH ROW
BEGIN
    INSERT INTO telemed_history (user_id, action) 
    VALUES (NEW.created_by, CONCAT('Created prescription ID: ', NEW.prescription_id));
END;

CREATE TRIGGER after_update_telemed_prescriptions
AFTER UPDATE ON telemed_prescriptions
FOR EACH ROW
BEGIN
    INSERT INTO telemed_history (user_id, action) 
    VALUES (NEW.updated_by, CONCAT('Updated prescription ID: ', NEW.prescription_id));
END;

CREATE TRIGGER after_delete_telemed_prescriptions
AFTER DELETE ON telemed_prescriptions
FOR EACH ROW
BEGIN
    INSERT INTO telemed_history (user_id, action) 
    VALUES (OLD.created_by, CONCAT('Deleted prescription ID: ', OLD.prescription_id));
END;


-- #### 8. Messages Table


CREATE TRIGGER after_insert_telemed_messages
AFTER INSERT ON telemed_messages
FOR EACH ROW
BEGIN
    INSERT INTO telemed_history (user_id, action) 
    VALUES (NEW.created_by, CONCAT('Created message ID: ', NEW.message_id));
END;

CREATE TRIGGER after_update_telemed_messages
AFTER UPDATE ON telemed_messages
FOR EACH ROW
BEGIN
    INSERT INTO telemed_history (user_id, action) 
    VALUES (NEW.updated_by, CONCAT('Updated message ID: ', NEW.message_id));
END;

CREATE TRIGGER after_delete_telemed_messages
AFTER DELETE ON telemed_messages
FOR EACH ROW
BEGIN
    INSERT INTO telemed_history (user_id, action) 
    VALUES (OLD.created_by, CONCAT('Deleted message ID: ', OLD.message_id));
END;



-- #### 9. Triggers for `telemed_admins`


CREATE TRIGGER after_insert_telemed_admins
AFTER INSERT ON telemed_admins
FOR EACH ROW
BEGIN
    INSERT INTO telemed_history (user_id, action) 
    VALUES (NEW.created_by, CONCAT('Created admin: ', NEW.username));
END;

CREATE TRIGGER after_update_telemed_admins
AFTER UPDATE ON telemed_admins
FOR EACH ROW
BEGIN
    INSERT INTO telemed_history (user_id, action) 
    VALUES (NEW.updated_by, CONCAT('Updated admin: ', NEW.username));
END;

CREATE TRIGGER after_delete_telemed_admins
AFTER DELETE ON telemed_admins
FOR EACH ROW
BEGIN
    INSERT INTO telemed_history (user_id, action) 
    VALUES (OLD.created_by, CONCAT('Deleted admin: ', OLD.username));
END;


-- #### 10. Triggers for `telemed_health_centers`


CREATE TRIGGER after_insert_telemed_health_centers
AFTER INSERT ON telemed_health_centers
FOR EACH ROW
BEGIN
    INSERT INTO telemed_history (user_id, action) 
    VALUES (NEW.created_by, CONCAT('Created health center: ', NEW.center_name));
END;

CREATE TRIGGER after_update_telemed_health_centers
AFTER UPDATE ON telemed_health_centers
FOR EACH ROW
BEGIN
    INSERT INTO telemed_history (user_id, action) 
    VALUES (NEW.updated_by, CONCAT('Updated health center: ', NEW.center_name));
END;

CREATE TRIGGER after_delete_telemed_health_centers
AFTER DELETE ON telemed_health_centers
FOR EACH ROW
BEGIN
    INSERT INTO telemed_history (user_id, action) 
    VALUES (OLD.created_by, CONCAT('Deleted health center: ', OLD.center_name));
END;


-- #### 11. Triggers for `telemed_roles`


CREATE TRIGGER after_insert_telemed_roles
AFTER INSERT ON telemed_roles
FOR EACH ROW
BEGIN
    INSERT INTO telemed_history (user_id, action) 
    VALUES (NEW.created_by, CONCAT('Created role: ', NEW.role_name));
END;

CREATE TRIGGER after_update_telemed_roles
AFTER UPDATE ON telemed_roles
FOR EACH ROW
BEGIN
    INSERT INTO telemed_history (user_id, action) 
    VALUES (NEW.updated_by, CONCAT('Updated role: ', NEW.role_name));
END;

CREATE TRIGGER after_delete_telemed_roles
AFTER DELETE ON telemed_roles
FOR EACH ROW
BEGIN
    INSERT INTO telemed_history (user_id, action) 
    VALUES (OLD.created_by, CONCAT('Deleted role: ', OLD.role_name));
END;


-- #### 12. Triggers for `telemed_role_assignments`


CREATE TRIGGER after_insert_telemed_role_assignments
AFTER INSERT ON telemed_role_assignments
FOR EACH ROW
BEGIN
    INSERT INTO telemed_history (user_id, action) 
    VALUES (NEW.user_id, CONCAT('Assigned role ID: ', NEW.role_id, ' to user ID: ', NEW.user_id));
END;

CREATE TRIGGER after_update_telemed_role_assignments
AFTER UPDATE ON telemed_role_assignments
FOR EACH ROW
BEGIN
    INSERT INTO telemed_history (user_id, action) 
    VALUES (NEW.updated_by, CONCAT('Updated role assignment for user ID: ', NEW.user_id));
END;

CREATE TRIGGER after_delete_telemed_role_assignments
AFTER DELETE ON telemed_role_assignments
FOR EACH ROW
BEGIN
    INSERT INTO telemed_history (user_id, action) 
    VALUES (OLD.updated_by, CONCAT('Removed role ID: ', OLD.role_id, ' from user ID: ', OLD.user_id));
END;


-- #### 13. Triggers for `telemed_role_items`


CREATE TRIGGER after_insert_telemed_role_items
AFTER INSERT ON telemed_role_items
FOR EACH ROW
BEGIN
    INSERT INTO telemed_history (user_id, action) 
    VALUES (NEW.created_by, CONCAT('Created role item ID: ', NEW.role_item_id));
END;

CREATE TRIGGER after_update_telemed_role_items
AFTER UPDATE ON telemed_role_items
FOR EACH ROW
BEGIN
    INSERT INTO telemed_history (user_id, action) 
    VALUES (NEW.updated_by, CONCAT('Updated role item ID: ', NEW.role_item_id));
END;

CREATE TRIGGER after_delete_telemed_role_items
AFTER DELETE ON telemed_role_items
FOR EACH ROW
BEGIN
    INSERT INTO telemed_history (user_id, action) 
    VALUES (OLD.created_by, CONCAT('Deleted role item ID: ', OLD.role_item_id));
END;


