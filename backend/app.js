// backend/app.js

const express = require('express');
const createServer = require('./config/server');
const routes = require('./routes/index');
const logger = require('./utils/logger');
const path = require('path');

// Initialize server
const app = createServer();

// Serve frontend static files
app.use(express.static(path.join(__dirname, '../frontend/build')));

// API routes
app.use('/api', routes);

// Serve frontend for all other routes (SPA fallback)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
});

