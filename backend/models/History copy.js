const pool = require('../config/db');

class History {
    constructor(history_id, action, user_id, timestamp) {
        this.history_id = history_id;
        this.action = action;
        this.user_id = user_id;
        this.timestamp = timestamp;
    }

    static async create(action, user_id) {
        const timestamp = new Date();
        const query = 'INSERT INTO History (action, user_id, timestamp) VALUES (?, ?, ?)';
        const [result] = await pool.execute(query, [action, user_id, timestamp]);
        return new History(result.insertId, action, user_id, timestamp);
    }

    static async findById(history_id) {
        const query = 'SELECT * FROM History WHERE history_id = ?';
        const [rows] = await pool.execute(query, [history_id]);
        return rows[0] ? new History(rows[0].history_id, rows[0].action, rows[0].user_id, rows[0].timestamp) : null;
    }

    static async findAll() {
        const query = 'SELECT * FROM History';
        const [rows] = await pool.execute(query);
        return rows.map(row => new History(row.history_id, row.action, row.user_id, row.timestamp));
    }

    static async delete(history_id) {
        const query = 'DELETE FROM History WHERE history_id = ?';
        await pool.execute(query, [history_id]);
    }
}

module.exports = History;
