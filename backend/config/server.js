// config/server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('../utils/logger');
const errorHandler = require('../middlewares/errorMiddleware');
const path = require('path');
const { authenticateDB, sequelize } = require('./db');  // Importing sequelize and authenticateDB function
const fs = require('fs');

// Load environment variables
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));
app.use(express.static(path.join(__dirname, '../frontend/build'))); // Serve frontend static files
app.use(errorHandler); // Error handling middleware

// Database initialization function
const initializeDatabase = async () => {
  try {
    // Authenticate the Sequelize connection
    await authenticateDB();
    
    // Optionally, you can run raw SQL queries for schema initialization (not recommended for production apps)
    // Read and run init.sql and trigger.sql using sequelize.query() method
    const initSQL = fs.readFileSync(path.join(__dirname, '../sql/init.sql'), 'utf-8');
    const triggerSQL = fs.readFileSync(path.join(__dirname, '../sql/triggers.sql'), 'utf-8');
    const insertSQL = fs.readFileSync(path.join(__dirname, '../sql/insert.sql'), 'utf-8');

    // Running raw SQL (ensure SQL files are safe and structured correctly)
    await sequelize.query(initSQL);
    await sequelize.query(triggerSQL);
    logger.info('Database initialized successfully');
  } catch (err) {
    logger.error('Error initializing database:', err);
  }
};

// Initialize database before starting the server
initializeDatabase().catch(console.error);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  logger.info(`Server running on http://localhost:${PORT}`);
});
