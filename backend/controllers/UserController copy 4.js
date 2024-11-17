// Updated 5/10/2024 9:27am - Initial version with basic CRUD functionality for user creation and updating.
// Updated 15/11/2024 2:10pm - Integrated bcrypt hashing and added status constants import.
const User = require('../models/User');
const UserSearch = require('../models/search/UserSearch');
const logger = require('../utils/logger');
const bcrypt = require('bcrypt');
const StatusConstants = require('../utils/statusConstants');  // Importing status constants

class UserController {
    static async createUser(req, res) {
        try {
            const { username, email, password, role_id } = req.body;

            // Hash the password before saving
            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = await User.create({
                username,
                email,
                password: hashedPassword,
                role_id,
                created_by: req.userId, // Assuming the user's ID is in the request
                status: StatusConstants.ACTIVE // Setting default status as Active
            });

            res.status(201).json(newUser);
        } catch (error) {
            logger.error('Error creating user:', error);
            res.status(500).json({ message: 'Error creating user', error });
        }
    }

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

    static async searchUsers(req, res) {
        try {
            const users = await UserSearch.searchUsers(req.query);
            res.json(users);
        } catch (error) {
            logger.error('Error searching users:', error);
            res.status(500).json({ message: 'Error searching users', error });
        }
    }
}

module.exports = UserController;
