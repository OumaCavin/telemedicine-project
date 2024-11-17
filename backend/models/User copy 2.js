const pool = require('../config/db');
const logger = require('../utils/logger');
const bcrypt = require('bcrypt');

class User {
    static async createUser(userData) {
        const { username, email, password, role_id, created_by } = userData;
        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

        const query = `
            INSERT INTO telemed_users (username, email, password, role_id, created_by)
            VALUES (?, ?, ?, ?, ?)
        `;

        const values = [username, email, hashedPassword, role_id, created_by];
        try {
            const [result] = await pool.execute(query, values);
            return { user_id: result.insertId, username, email, role_id };
        } catch (error) {
            logger.error('Error creating user:', error);
            throw error;
        }
    }

    static async getUserById(userId) {
        const query = 'SELECT * FROM telemed_users WHERE user_id = ?';
        const [rows] = await pool.execute(query, [userId]);
        return rows[0];
    }

    static async getUserByUsername(username) {
        const query = 'SELECT * FROM telemed_users WHERE username = ?';
        const [rows] = await pool.execute(query, [username]);
        return rows[0];
    }

    static async updateUser(userId, updateData) {
        const { username, email, password, role_id, updated_by } = updateData;
        let query = 'UPDATE telemed_users SET';
        const updates = [];

        if (username) {
            updates.push(` username = '${username}'`);
        }
        if (email) {
            updates.push(` email = '${email}'`);
        }
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            updates.push(` password = '${hashedPassword}'`);
        }
        if (role_id) {
            updates.push(` role_id = ${role_id}`);
        }
        if (updated_by) {
            updates.push(` updated_by = ${updated_by}`);
        }

        query += updates.join(', ') + ` WHERE user_id = ?`;
        const values = [userId];

        try {
            await pool.execute(query, [...values]);
            return await this.getUserById(userId);
        } catch (error) {
            logger.error('Error updating user:', error);
            throw error;
        }
    }

    static async deleteUser(userId) {
        const query = 'DELETE FROM telemed_users WHERE user_id = ?';
        try {
            await pool.execute(query, [userId]);
        } catch (error) {
            logger.error('Error deleting user:', error);
            throw error;
        }
    }
}

module.exports = User;
