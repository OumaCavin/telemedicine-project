// backend/app.js

const createServer = require('./config/server');
const routes = require('./routes/index');
const logger = require('./utils/logger');
const path = require('path');

// Initialize server
const app = createServer();

// Use routes
app.use('/api', routes);

// Serve frontend static files for root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/build/index.html'));
});

// Fallback for React Router - serve index.html for all non-API routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/build/index.html'));
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
});

