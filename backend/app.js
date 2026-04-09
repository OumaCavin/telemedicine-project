// backend/app.js

const createServer = require('./config/server');
const routes = require('./routes/index');
const logger = require('./utils/logger');

// Initialize server
const app = createServer();

// Use routes
app.use('/api', routes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
});

