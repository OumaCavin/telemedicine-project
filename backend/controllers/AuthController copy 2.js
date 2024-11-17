// controllers/AuthController.js
const User = require('../models/User');
const RoleAssignment = require('../models/RoleAssignment'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ROLES = require('../constants/roles'); 
class AuthController {
    // User registration
    async register(req, res) {
        const { username, email, password, role_id } = req.body;

        try {
            // Hash password
            const saltRounds = parseInt(process.env.SALT_ROUNDS) || 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            // Create the user record
            const newUser = await User.create({
                username,
                email,
                password: hashedPassword,
            });

            // Assign the default role to the user
            if (role_id) {
                await RoleAssignment.create({
                    user_id: newUser.user_id,
                    role_id: ROLES.PATIENT, 
                    created_by: newUser.user_id, // Set the creator as the user themselves
                });
            }
           // Return success message
            res.status(201).json({
                message: 'User registered successfully',
                user: newUser,
                // user: { user_id: newUser.user_id, username: newUser.username, email: newUser.email }, 
            });
        } catch (error) {
            res.status(500).json({
                error: 'User registration failed',
                details: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
            });
        }
    }


    // User login
    async login(req, res) {
        const { identifier, password } = req.body; // Accepts either username or email as identifier

        try {
            // Find user by username or email
            const user = await User.findOne({
                where: {
                    [User.sequelize.Op.or]: [{ username: identifier }, { email: identifier }],
                },
            });

            // Validate user existence and password
            if (!user || !(await bcrypt.compare(password, user.password))) {
                return res.status(401).json({ error: 'Invalid username/email or password' });
            }

            // If authentication is successful, Generate a JWT token
            const token = jwt.sign(
                { user_id: user.id },
                process.env.JWT_SECRET,
                { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
            );
           // Return the token to the client, along with user details
            res.status(200).json({
                message: 'Login successful',
                token,
                user: { user_id: user.user_id, username: user.username, email: user.email },
  
            });
        } catch (error) {
            res.status(500).json({
                error: 'Login failed',
                details: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
            });
        }
    }
    // User logout 
    async logout(req, res) {
        // Client-side handles token deletion  (no server-side action needed)
        res.status(200).json({ message: 'Logout successful' });
    }
}

module.exports = new AuthController();