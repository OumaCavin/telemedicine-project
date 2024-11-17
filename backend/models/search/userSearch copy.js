const pool = require('../../config/db'); // Adjust path based on the new location
const logger = require('../../utils/logger'); // Adjust path based on the new location

class UserSearch {
    static async searchByUsername(username) {
        const query = 'SELECT * FROM telemed_users WHERE username LIKE ?';
        const [rows] = await pool.execute(query, [`%${username}%`]);
        return rows;
    }

    static async searchByEmail(email) {
        const query = 'SELECT * FROM telemed_users WHERE email LIKE ?';
        const [rows] = await pool.execute(query, [`%${email}%`]);
        return rows;
    }

    static async searchByRoleId(role_id) {
        const query = 'SELECT * FROM telemed_users WHERE role_id = ?';
        const [rows] = await pool.execute(query, [role_id]);
        return rows;
    }

    static async searchAll() {
        const query = 'SELECT * FROM telemed_users';
        const [rows] = await pool.execute(query);
        return rows;
    }
}

module.exports = UserSearch;
