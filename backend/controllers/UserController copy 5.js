const { User } = require('../models/User');
const UserService = require('../services/UserService'); // Assuming we create a service

const logger = require('../utils/logger');
const StatusConstants = require('../utils/statusConstants');

class UserController {
    // Create a new user
    static async createUser(req, res) {
        const { username, email, password, role_id } = req.body;

        try {
            const newUser = await UserService.registerUser({ username, email, password, role_id, createdBy: req.userId });
            res.status(201).json(newUser);
        } catch (error) {
            logger.error('Error creating user:', error);
            res.status(500).json({ message: 'Error creating user', error });
        }
    }

    // Update a user
    static async updateUser(req, res) {
        const { user_id } = req.params;
        const { username, email, password, role_id, status } = req.body;

        try {
            const user = await User.findByPk(user_id);
            if (!user) return res.status(404).json({ message: 'User not found' });

            if (password) {
                user.password = await bcrypt.hash(password, 10); // Hash the password
            }

            user.username = username || user.username;
            user.email = email || user.email;
            user.role_id = role_id || user.role_id;
            user.status = status || user.status || StatusConstants.ACTIVE; // Set status to ACTIVE if not provided
            user.updated_by = req.userId;

            await user.save();
            res.json(user);
        } catch (error) {
            logger.error('Error updating user:', error);
            res.status(500).json({ message: 'Error updating user', error });
        }
    }

    // Get all users
    static async getAllUsers(req, res) {
        try {
            const users = await User.findAll();
            res.status(200).json(users);
        } catch (error) {
            logger.error('Error fetching users:', error);
            res.status(500).json({ message: 'Error fetching users', error });
        }
    }

    // Search for users
    static async searchUsers(req, res) {
        try {
            const users = await UserService.searchUsers(req.query);
            res.json(users);
        } catch (error) {
            logger.error('Error searching users:', error);
            res.status(500).json({ message: 'Error searching users', error });
        }
    }
}

module.exports = UserController;
