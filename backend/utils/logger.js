// backend/utils/logger

const winston = require('winston');
const { combine, timestamp, json, errors, simple, printf } = winston.format;
const winstonDailyRotateFile = require('winston-daily-rotate-file');
const fs = require('fs');

// Ensure the log directory exists
const logDirectory = 'logs';
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

const logLevel = process.env.NODE_ENV === 'production' ? 'info' : 'debug'; // Adjust logging level based on environment

const logger = winston.createLogger({
  level: logLevel,
  format: combine(
    timestamp(),
    errors({ stack: true }), // Include stack trace for errors
    process.env.NODE_ENV === 'production' ? json() : simple() // Simple format for dev, JSON for production
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
    new winstonDailyRotateFile({
      filename: 'logs/%DATE%-combined.log',
      datePattern: 'YYYY-MM-DD',
      maxFiles: '14d', // Keep logs for the past 14 days
      level: 'info'
    })
  ]
});

// Custom logging methods
logger.logInfo = (message) => {
  logger.info(message);
};

logger.logError = (message) => {
  logger.error(message);
};

module.exports = logger;

