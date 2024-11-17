const pool = require('../config/db');

class Admin {
    constructor(admin_id, user_id) {
        this.admin_id = admin_id;
        this.user_id = user_id;
    }

    static async create(user_id) {
        const query = 'INSERT INTO Admins (user_id) VALUES (?)';
        const [result] = await pool.execute(query, [user_id]);
        return new Admin(result.insertId, user_id);
    }

    static async findById(admin_id) {
        const query = 'SELECT * FROM Admins WHERE admin_id = ?';
        const [rows] = await pool.execute(query, [admin_id]);
        return rows[0] ? new Admin(rows[0].admin_id, rows[0].user_id) : null;
    }

    static async findAll() {
        const query = 'SELECT * FROM Admins';
        const [rows] = await pool.execute(query);
        return rows.map(row => new Admin(row.admin_id, row.user_id));
    }

    async update() {
        const query = 'UPDATE Admins SET user_id = ? WHERE admin_id = ?';
        await pool.execute(query, [this.user_id, this.admin_id]);
    }

    static async delete(admin_id) {
        const query = 'DELETE FROM Admins WHERE admin_id = ?';
        await pool.execute(query, [admin_id]);
    }
}

module.exports = Admin;
