const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('../utils/logger');
const errorHandler = require('../middlewares/errorMiddleware');

const path = require('path');
const app = express();
const pool = require('./db'); // Import the DB pool configuration
const initDB = require('../sql/init.sql'); // Import the initialization SQL script
const triggerSQL = require('../sql/trigger.sql'); // Import trigger SQL script

const createServer = () => {
    const app = express();

    // Middleware
    app.use(cors());
    app.use(bodyParser.json());
    // app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(express.urlencoded({ extended: true }));
    app.set('view engine', 'ejs'); // Set EJS as the templating engine
    app.set('views', path.join(__dirname, '../views')); // Set views directory

    
    // Serve frontend static files
    app.use(express.static(path.join(__dirname, '../frontend/build')));

    // Error handling middleware
    app.use(errorHandler);

    // Database initialization
    async function initializeDatabase() {
        const connection = await pool.getConnection();
        try {
            await connection.query(initDB);
            await connection.query(triggerSQL);
        } catch (err) {
            console.error('Error initializing database:', err);
        } finally {
            connection.release();
        }
    }

    initializeDatabase().catch(console.error);

    // Start the server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    }); 

    return app;
};

module.exports = createServer;




