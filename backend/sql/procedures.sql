-- /backend/sql/procedures.sql
DELIMITER $$

CREATE PROCEDURE BookAppointment(IN p_patient_id INT, IN p_doctor_id INT, IN p_appointment_time DATETIME)
BEGIN
    INSERT INTO Appointments (patient_id, doctor_id, appointment_time)
    VALUES (p_patient_id, p_doctor_id, p_appointment_time);
END$$

CREATE PROCEDURE GetAvailableDoctors()
BEGIN
    SELECT * FROM Doctors WHERE availability IS NOT NULL;
END$$

DELIMITER ;

-- ==========================================================
-- #### 3. Stored Procedures
-- Stored procedures can simplify common operations. Below is an example of a stored procedure to book an appointment:


DELIMITER //

CREATE PROCEDURE BookAppointment(
    IN p_patient_id INT,
    IN p_doctor_id INT,
    IN p_appointment_date DATETIME
)
BEGIN
    DECLARE appointment_exists INT;

    -- Check if an appointment already exists at the specified time
    SELECT COUNT(*)
    INTO appointment_exists
    FROM appointments
    WHERE doctor_id = p_doctor_id AND appointment_date = p_appointment_date;

    IF appointment_exists = 0 THEN
        -- Insert the appointment if none exists
        INSERT INTO appointments(patient_id, doctor_id, appointment_date, status)
        VALUES (p_patient_id, p_doctor_id, p_appointment_date, 'Scheduled');
    ELSE
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Appointment time is already booked.';
    END IF;
END //

DELIMITER ;
```



-- The SQL scripts provided here create the necessary stored procedures for  TeleMed application. 
-- This ensures data integrity, improves performance, and provides a foundation for your application's backend logic.

-- Remember to adjust the stored procedures and triggers based on your application's specific logic and requirements. 
