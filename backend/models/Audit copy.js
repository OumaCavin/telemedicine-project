const pool = require('../config/db');

class Audit {
    constructor(audit_id, action, user_id, timestamp) {
        this.audit_id = audit_id;
        this.action = action;
        this.user_id = user_id;
        this.timestamp = timestamp;
    }

    static async create(action, user_id) {
        const timestamp = new Date();
        const query = 'INSERT INTO Audit (action, user_id, timestamp) VALUES (?, ?, ?)';
        const [result] = await pool.execute(query, [action, user_id, timestamp]);
        return new Audit(result.insertId, action, user_id, timestamp);
    }

    static async findById(audit_id) {
        const query = 'SELECT * FROM Audit WHERE audit_id = ?';
        const [rows] = await pool.execute(query, [audit_id]);
        return rows[0] ? new Audit(rows[0].audit_id, rows[0].action, rows[0].user_id, rows[0].timestamp) : null;
    }

    static async findAll() {
        const query = 'SELECT * FROM Audit';
        const [rows] = await pool.execute(query);
        return rows.map(row => new Audit(row.audit_id, row.action, row.user_id, row.timestamp));
    }

    static async delete(audit_id) {
        const query = 'DELETE FROM Audit WHERE audit_id = ?';
        await pool.execute(query, [audit_id]);
    }
}

module.exports = Audit;
