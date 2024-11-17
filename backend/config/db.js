// backend/config/db.js

const logger = require('../utils/logger');
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  logging: process.env.NODE_ENV !== 'production' ? console.log : false, // Only log in non-production
  define: {
    timestamps: true, // Default configuration for model timestamps
  },
});

const authenticateDB = async () => {
  try {
    await sequelize.authenticate();
    logger.info('Database connected successfully');
    console.log('Database connection established successfully.');
  } catch (error) {
    logger.error('Database connection failed:', error);
    console.error('Unable to connect to the database:', error);
  }
};

module.exports = { sequelize, authenticateDB };



 