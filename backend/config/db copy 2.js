// backend/config/db.js

const mysql = require('mysql2/promise');
const logger = require('../utils/logger');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'telemedicine',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test database connection
const connectToDatabase = async () => {
    try {
        const connection = await pool.getConnection();
        logger.info('Database connected successfully');
        connection.release();
    } catch (error) {
        logger.error('Database connection failed:', error);
        process.exit(1);
    }
};

connectToDatabase();

module.exports = pool;

