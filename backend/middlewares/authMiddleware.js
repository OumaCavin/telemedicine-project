// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User'); 


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
        // Verify token and get user data
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; 
        next();
    } catch (error) {
        // Handle different errors (e.g., token expiration)
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired, please log in again' });
        }
        return res.status(403).json({ message: 'Not authorized, invalid token' });
    }
};

