const pool = require('../config/db');

class Appointment {
    constructor(appointment_id, patient_id, doctor_id, appointment_time, status) {
        this.appointment_id = appointment_id;
        this.patient_id = patient_id;
        this.doctor_id = doctor_id;
        this.appointment_time = appointment_time;
        this.status = status;
    }

    static async create(patient_id, doctor_id, appointment_time) {
        const query = 'INSERT INTO Appointments (patient_id, doctor_id, appointment_time) VALUES (?, ?, ?)';
        const [result] = await pool.execute(query, [patient_id, doctor_id, appointment_time]);
        return new Appointment(result.insertId, patient_id, doctor_id, appointment_time, 'scheduled');
    }

    static async findById(appointment_id) {
        const query = 'SELECT * FROM Appointments WHERE appointment_id = ?';
        const [rows] = await pool.execute(query, [appointment_id]);
        return rows[0] ? new Appointment(rows[0].appointment_id, rows[0].patient_id, rows[0].doctor_id, rows[0].appointment_time, rows[0].status) : null;
    }

    static async findAll() {
        const query = 'SELECT * FROM Appointments';
        const [rows] = await pool.execute(query);
        return rows.map(row => new Appointment(row.appointment_id, row.patient_id, row.doctor_id, row.appointment_time, row.status));
    }

    async update() {
        const query = 'UPDATE Appointments SET doctor_id = ?, appointment_time = ?, status = ? WHERE appointment_id = ?';
        await pool.execute(query, [this.doctor_id, this.appointment_time, this.status, this.appointment_id]);
    }

    static async delete(appointment_id) {
        const query = 'DELETE FROM Appointments WHERE appointment_id = ?';
        await pool.execute(query, [appointment_id]);
    }
}

module.exports = Appointment;
