const pool = require('../config/db');

class Role {
    constructor(role_id, name, description) {
        this.role_id = role_id;
        this.name = name;
        this.description = description;
    }

    static async create(name, description) {
        const query = 'INSERT INTO Roles (name, description) VALUES (?, ?)';
        const [result] = await pool.execute(query, [name, description]);
        return new Role(result.insertId, name, description);
    }

    static async findById(role_id) {
        const query = 'SELECT * FROM Roles WHERE role_id = ?';
        const [rows] = await pool.execute(query, [role_id]);
        return rows[0] ? new Role(rows[0].role_id, rows[0].name, rows[0].description) : null;
    }

    static async findAll() {
        const query = 'SELECT * FROM Roles';
        const [rows] = await pool.execute(query);
        return rows.map(row => new Role(row.role_id, row.name, row.description));
    }

    async update() {
        const query = 'UPDATE Roles SET name = ?, description = ? WHERE role_id = ?';
        await pool.execute(query, [this.name, this.description, this.role_id]);
    }

    static async delete(role_id) {
        const query = 'DELETE FROM Roles WHERE role_id = ?';
        await pool.execute(query, [role_id]);
    }
}

module.exports = Role;
