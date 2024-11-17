// controllers/AuthController
const UserService = require('../services/UserService');
const logger = require('../utils/logger');
const ROLES = require('../constants/roles');
const jwt = require('jsonwebtoken');

class AuthController {
    // User registration
    async register(req, res) {
        const { username, email, password, role_id } = req.body;

        try {
            const newUser = await UserService.registerUser({ username, email, password, role_id, createdBy: req.userId });
            res.status(201).json({
                message: 'User registered successfully',
                user: newUser,
            });
        } catch (error) {
            logger.error('Error registering user:', error);
            res.status(500).json({
                error: 'User registration failed',
                details: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
            });
        }
    }

    // User login
    async login(req, res) {
        const { identifier, password } = req.body;

        try {
            const user = await UserService.authenticateUser(identifier, password);
            if (!user) {
                return res.status(401).json({ error: 'Invalid username/email or password' });
            }

            const token = jwt.sign(
                { user_id: user.user_id },
                process.env.JWT_SECRET,
                { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
            );

            res.status(200).json({
                message: 'Login successful',
                token,
                user: { user_id: user.user_id, username: user.username, email: user.email },
            });
        } catch (error) {
            logger.error('Error logging in user:', error);
            res.status(500).json({
                error: 'Login failed',
                details: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
            });
        }
    }

    // User logout 
    async logout(req, res) {
        res.status(200).json({ message: 'Logout successful' });
    }
}

module.exports = new AuthController();
