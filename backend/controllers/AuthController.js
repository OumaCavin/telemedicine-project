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
            // When registering, there's no authenticated user, so createdBy will be undefined
            const newUser = await UserService.registerUser({ username, email, password, role_id });
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
        const { email, password, identifier } = req.body;
        
        // Support both identifier and email fields for backward compatibility
        const loginIdentifier = identifier || email;

        logger.info('Login attempt:', { loginIdentifier });

        try {
            const user = await UserService.authenticateUser(loginIdentifier, password);
            if (!user) {
                return res.status(401).json({ error: 'Invalid username/email or password' });
            }

            logger.info('Login successful, generating token:', { userId: user.user_id });

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

    // Get authenticated user's details
    async getMe(req, res) {
        try {
            const user = await UserService.getUserById(req.user_id);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.status(200).json(user);
        } catch (error) {
            logger.error('Error getting user:', error);
            res.status(500).json({ error: 'Failed to get user details' });
        }
    }
}

module.exports = new AuthController();
