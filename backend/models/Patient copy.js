const pool = require('../config/db');

class Patient {
    constructor(patient_id, user_id, medical_history) {
        this.patient_id = patient_id;
        this.user_id = user_id;
        this.medical_history = medical_history;
    }

    static async create(user_id, medical_history) {
        const query = 'INSERT INTO Patients (user_id, medical_history) VALUES (?, ?)';
        const [result] = await pool.execute(query, [user_id, medical_history]);
        return new Patient(result.insertId, user_id, medical_history);
    }

    static async findById(patient_id) {
        const query = 'SELECT * FROM Patients WHERE patient_id = ?';
        const [rows] = await pool.execute(query, [patient_id]);
        return rows[0] ? new Patient(rows[0].patient_id, rows[0].user_id, rows[0].medical_history) : null;
    }

    static async findAll() {
        const query = 'SELECT * FROM Patients';
        const [rows] = await pool.execute(query);
        return rows.map(row => new Patient(row.patient_id, row.user_id, row.medical_history));
    }

    async update() {
        const query = 'UPDATE Patients SET medical_history = ? WHERE patient_id = ?';
        await pool.execute(query, [this.medical_history, this.patient_id]);
    }

    static async delete(patient_id) {
        const query = 'DELETE FROM Patients WHERE patient_id = ?';
        await pool.execute(query, [patient_id]);
    }
}

module.exports = Patient;
