// config/server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('../utils/logger');
const errorHandler = require('../middlewares/errorMiddleware');
const path = require('path');
const { authenticateDB, sequelize } = require('./db');  // Importing sequelize and authenticateDB function
const seedDatabase = require('../utils/seed');

// Load environment variables
require('dotenv').config();

// Export function to create server
const createServer = () => {
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
      
      // Sync all models - creates tables if they don't exist
      await sequelize.sync({ alter: true });
      logger.info('Database models synced successfully');

      // Seed initial data
      await seedDatabase();
    } catch (err) {
      logger.error('Error initializing database:', err);
    }
  };

  // Initialize database before starting the server
  initializeDatabase().catch(console.error);

  return app;
};

module.exports = createServer;
