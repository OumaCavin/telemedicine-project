// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
// const { promisify } = require('util'); //Modern versions of jsonwebtoken (v8+) support promises via jwt.verify() when you use async/await. The promisify call isn't necessary unless you're using an older version of jsonwebtoken
const User = require('../models/User'); // Import user model if needed

// Middleware to protect routes

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
   
        // const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);  
        
        // Optional: Fetch user from database if only user ID is in the token 
        // req.user = await User.findByPk(decoded.id); 

        req.user = decoded; // Attach user info to request(Attach decoded token data to the request)// The req.user = decoded assignment assumes the JWT contains the user object or essential user information. However, if the decoded token only contains the id or limited information, you'll likely need to fetch the user from the database. If your tokens already include all required user info, this step can be skipped.
        next();
    } catch (error) {
        // Handle different errors (e.g., token expiration)
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired, please log in again' });
        }
        return res.status(403).json({ message: 'Not authorized, invalid token' }); // Use 403 Forbidden instead of 401 Unauthorized when the user is authenticated but doesn't have permission.
    }
};

