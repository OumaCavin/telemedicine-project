// config/db.js

require('dotenv').config();
const { Sequelize } = require('sequelize');
const logger = require('../utils/logger');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT || 'postgres',
  logging: process.env.NODE_ENV !== 'production' ? console.log : false,
  define: {
    timestamps: true,
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



 