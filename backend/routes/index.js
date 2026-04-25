// routes/index.js

const fs = require('fs');
const path = require('path');
const express = require('express');

const router = express.Router();

// Manual route mapping - more reliable than dynamic loading
const routeMappings = {
    'authRoutes': '/auth',
    'userRoutes': '/users',
    'adminRoutes': '/admins',
    'appointmentRoutes': '/appointments',
    'auditLogRoutes': '/audit-logs',
    'auditRoutes': '/audits',
    'chatRoutes': '/chat',
    'doctorRoutes': '/doctors',
    'ehrRecordRoutes': '/ehr-records',
    'healthCenterRoutes': '/health-centers',
    'historyRoutes': '/histories',
    'messageRoutes': '/messages',
    'patientRoutes': '/patients',
    'paymentRoutes': '/payments',
    'prescriptionRoutes': '/prescriptions',
    'profileRoutes': '/profiles',
    'reportRoutes': '/reports',
    'resourcesRoutes': '/resources',
    'roleAssignmentRoutes': '/role-assignments',
    'roleItemRoutes': '/role-items',
    'roleRoutes': '/roles',
    'statusRoutes': '/status',
};

// Load and register routes
Object.keys(routeMappings).forEach(fileName => {
    const filePath = fileName + '.js';  // Add .js extension
    const fullPath = path.join(__dirname, filePath);
    try {
        if (!fs.existsSync(fullPath)) {
            console.error(`File not found: ${fullPath}`);
            return;
        }
        // Clear cache to ensure fresh load
        delete require.cache[require.resolve(fullPath)];
        const route = require(fullPath);
        if (!route || typeof route.use !== 'function') {
            console.error(`Invalid route module: ${fileName}, got:`, typeof route);
            return;
        }
        const routePath = routeMappings[fileName];
        router.use(routePath, route);
        console.log(`Registered route: ${routePath}`);
    } catch (err) {
        console.error(`Error loading ${fileName}:`, err.message);
    }
});

module.exports = router;
