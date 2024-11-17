const pool = require('../config/db');

class RoleAssignment {
    constructor(role_assignment_id, user_id, role_id) {
        this.role_assignment_id = role_assignment_id;
        this.user_id = user_id;
        this.role_id = role_id;
    }

    static async create(user_id, role_id) {
        const query = 'INSERT INTO RoleAssignments (user_id, role_id) VALUES (?, ?)';
        const [result] = await pool.execute(query, [user_id, role_id]);
        return new RoleAssignment(result.insertId, user_id, role_id);
    }

    static async findById(role_assignment_id) {
        const query = 'SELECT * FROM RoleAssignments WHERE role_assignment_id = ?';
        const [rows] = await pool.execute(query, [role_assignment_id]);
        return rows[0] ? new RoleAssignment(rows[0].role_assignment_id, rows[0].user_id, rows[0].role_id) : null;
    }

    static async findAll() {
        const query = 'SELECT * FROM RoleAssignments';
        const [rows] = await pool.execute(query);
        return rows.map(row => new RoleAssignment(row.role_assignment_id, row.user_id, row.role_id));
    }

    static async delete(role_assignment_id) {
        const query = 'DELETE FROM RoleAssignments WHERE role_assignment_id = ?';
        await pool.execute(query, [role_assignment_id]);
    }
}

module.exports = RoleAssignment;
