// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User'); 
const RoleService = require('../services/RoleService');
const ROLES = require('../constants/roles');


exports.protect = async (req, res, next) => {
    let token;
    
    // Check if token is in the authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    // If no token, return unauthorized error
    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }

    try {
        // Verify token and get user data - use fallback secret if needed
        const jwtSecret = process.env.JWT_SECRET || 'development-secret-key-do-not-use-in-production';
        const decoded = jwt.verify(token, jwtSecret);
        
        // Get user's role from database
        const role_id = await RoleService.getUserRole(decoded.user_id);
        
        req.user = { 
            user_id: decoded.user_id,
            role_id: role_id 
        }; 
        next();
    } catch (error) {
        // Handle different errors (e.g., token expiration)
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired, please log in again' });
        }
        return res.status(403).json({ message: 'Not authorized, invalid token' });
    }
};

// Admin middleware - checks if user has admin role
exports.admin = async (req, res, next) => {
    try {
        if (req.user && req.user.role_id === ROLES.ADMIN) {
            next();
        } else {
            res.status(403).json({ message: 'Not authorized as an admin' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error checking admin status' });
    }
};

