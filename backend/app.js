// backend/app.js

const createServer = require('./config/server');
const routes = require('./routes/index');
const logger = require('./utils/logger');

// Initialize server
const app = createServer();

// Use routes
app.use('/api', routes);
// // app.js
// require('dotenv').config(); // Load environment variables
// const express = require('express');
// const bodyParser = require('body-parser');
// const resourceRoutes = require('./routes/resources'); // Resource routes

// const app = express();

// // Middleware
// app.use(bodyParser.json());

// Routes
// app.use('/resource', resourceRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
});

