// routes/index.js

const fs = require('fs');
const path = require('path');
const express = require('express');

const router = express.Router();

// Automatically load all route files in the routes directory
const routeFiles = fs.readdirSync(__dirname).filter(file => file.endsWith('Routes.js'));

routeFiles.forEach(file => {
    const route = require(path.join(__dirname, file));

    // Convert camelCase filenames to kebab-case for route paths
    const routePath = `/${file
        .replace('Routes.js', '')
        .replace(/([a-z])([A-Z])/g, '$1-$2') // Convert camelCase to kebab-case
        .toLowerCase()}`;

    router.use(routePath, route);
});

module.exports = router;
