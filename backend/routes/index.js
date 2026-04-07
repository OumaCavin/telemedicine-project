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
    try {
        const route = require(path.join(__dirname, fileName));
        const routePath = routeMappings[fileName];
        router.use(routePath, route);
        console.log(`Registered route: ${routePath}`);
    } catch (err) {
        console.error(`Error loading ${fileName}:`, err.message);
    }
});

module.exports = router;
