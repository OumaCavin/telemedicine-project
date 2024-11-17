const pool = require('../config/db');

class Doctor {
    constructor(doctor_id, user_id, specialization, availability) {
        this.doctor_id = doctor_id;
        this.user_id = user_id;
        this.specialization = specialization;
        this.availability = availability;
    }

    static async create(user_id, specialization, availability) {
        const query = 'INSERT INTO Doctors (user_id, specialization, availability) VALUES (?, ?, ?)';
        const [result] = await pool.execute(query, [user_id, specialization, availability]);
        return new Doctor(result.insertId, user_id, specialization, availability);
    }

    static async findById(doctor_id) {
        const query = 'SELECT * FROM Doctors WHERE doctor_id = ?';
        const [rows] = await pool.execute(query, [doctor_id]);
        return rows[0] ? new Doctor(rows[0].doctor_id, rows[0].user_id, rows[0].specialization, rows[0].availability) : null;
    }

    static async findAll() {
        const query = 'SELECT * FROM Doctors';
        const [rows] = await pool.execute(query);
        return rows.map(row => new Doctor(row.doctor_id, row.user_id, row.specialization, row.availability));
    }

    async update() {
        const query = 'UPDATE Doctors SET specialization = ?, availability = ? WHERE doctor_id = ?';
        await pool.execute(query, [this.specialization, this.availability, this.doctor_id]);
    }

    static async delete(doctor_id) {
        const query = 'DELETE FROM Doctors WHERE doctor_id = ?';
        await pool.execute(query, [doctor_id]);
    }
}

module.exports = Doctor;
