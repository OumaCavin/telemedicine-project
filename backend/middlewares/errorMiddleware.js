// middlewares/errorMiddleware.js
const logger = require('../utils/logger'); // Assuming you have a logger utility

// Centralized error handling middleware
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

    // Log the error for debugging purposes
    logger.error({
        message: err.message,
        stack: err.stack
    });

    res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};

module.exports = errorHandler;
