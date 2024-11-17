// config/server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('../utils/logger');
const errorHandler = require('../middlewares/errorMiddleware');
const path = require('path');
const pool = require('./db');
const fs = require('fs');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));
app.use(express.static(path.join(__dirname, '../frontend/build'))); // Serve frontend static files
app.use(errorHandler); // Error handling middleware

// Database initialization
const initializeDatabase = async () => {
    const connection = await pool.getConnection();
    try {
        const initSQL = fs.readFileSync(path.join(__dirname, '../sql/init.sql'), 'utf-8');
        const triggerSQL = fs.readFileSync(path.join(__dirname, '../sql/trigger.sql'), 'utf-8');
        
        await connection.query(initSQL);
        await connection.query(triggerSQL);
        logger.info('Database initialized successfully');
    } catch (err) {
        logger.error('Error initializing database:', err);
    } finally {
        connection.release();
    }
};

initializeDatabase().catch(console.error);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    logger.info(`Server running on http://localhost:${PORT}`);
});


