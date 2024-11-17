const pool = require('../config/db');

class HealthCenter {
    constructor(health_center_id, name, location) {
        this.health_center_id = health_center_id;
        this.name = name;
        this.location = location;
    }

    static async create(name, location) {
        const query = 'INSERT INTO HealthCenters (name, location) VALUES (?, ?)';
        const [result] = await pool.execute(query, [name, location]);
        return new HealthCenter(result.insertId, name, location);
    }

    static async findById(health_center_id) {
        const query = 'SELECT * FROM HealthCenters WHERE health_center_id = ?';
        const [rows] = await pool.execute(query, [health_center_id]);
        return rows[0] ? new HealthCenter(rows[0].health_center_id, rows[0].name, rows[0].location) : null;
    }

    static async findAll() {
        const query = 'SELECT * FROM HealthCenters';
        const [rows] = await pool.execute(query);
        return rows.map(row => new HealthCenter(row.health_center_id, row.name, row.location));
    }

    async update() {
        const query = 'UPDATE HealthCenters SET name = ?, location = ? WHERE health_center_id = ?';
        await pool.execute(query, [this.name, this.location, this.health_center_id]);
    }

    static async delete(health_center_id) {
        const query = 'DELETE FROM HealthCenters WHERE health_center_id = ?';
        await pool.execute(query, [health_center_id]);
    }
}

module.exports = HealthCenter;
