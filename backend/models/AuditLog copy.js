const pool = require('../config/db');

class AuditLog {
    constructor(audit_log_id, action, user_id, affected_table, previous_state, current_state) {
        this.audit_log_id = audit_log_id;
        this.action = action;
        this.user_id = user_id;
        this.affected_table = affected_table;
        this.previous_state = previous_state;
        this.current_state = current_state;
        this.created_at = new Date();
    }

    static async create(action, user_id, affected_table, previous_state, current_state) {
        const query = 'INSERT INTO AuditLogs (action, user_id, affected_table, previous_state, current_state) VALUES (?, ?, ?, ?, ?)';
        const [result] = await pool.execute(query, [action, user_id, affected_table, previous_state, current_state]);
        return new AuditLog(result.insertId, action, user_id, affected_table, previous_state, current_state);
    }

    static async findById(audit_log_id) {
        const query = 'SELECT * FROM AuditLogs WHERE audit_log_id = ?';
        const [rows] = await pool.execute(query, [audit_log_id]);
        return rows[0] ? new AuditLog(rows[0].audit_log_id, rows[0].action, rows[0].user_id, rows[0].affected_table, rows[0].previous_state, rows[0].current_state) : null;
    }

    static async findAll() {
        const query = 'SELECT * FROM AuditLogs';
        const [rows] = await pool.execute(query);
        return rows.map(row => new AuditLog(row.audit_log_id, row.action, row.user_id, row.affected_table, row.previous_state, row.current_state));
    }

    static async delete(audit_log_id) {
        const query = 'DELETE FROM AuditLogs WHERE audit_log_id = ?';
        await pool.execute(query, [audit_log_id]);
    }
}

module.exports = AuditLog;
