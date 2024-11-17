const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('../utils/logger');
const errorHandler = require('../middlewares/errorMiddleware');

const createServer = () => {
    const app = express();

    // Middleware
    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    // Error handling middleware
    app.use(errorHandler);

    return app;
};

module.exports = createServer;
