const User = require('../models/User');
const UserSearch = require('../models/search/UserSearch');
const logger = require('../utils/logger');

class UserController {
    static async createUser(req, res) {
        try {
            const userData = req.body;
            const newUser = await User.createUser(userData);
            res.status(201).json(newUser);
        } catch (error) {
            logger.error('Error creating user:', error);
            res.status(500).json({ message: 'Error creating user' });
        }
    }

    static async getUser(req, res) {
        try {
            const userId = req.params.id;
            const user = await User.getUserById(userId);
            if (user) {
                res.json(user);
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            logger.error('Error fetching user:', error);
            res.status(500).json({ message: 'Error fetching user' });
        }
    }

    static async updateUser(req, res) {
        try {
            const userId = req.params.id;
            const updateData = req.body;
            const updatedUser = await User.updateUser(userId, updateData);
            res.json(updatedUser);
        } catch (error) {
            logger.error('Error updating user:', error);
            res.status(500).json({ message: 'Error updating user' });
        }
    }

    static async deleteUser(req, res) {
        try {
            const userId = req.params.id;
            await User.deleteUser(userId);
            res.status(204).send();
        } catch (error) {
            logger.error('Error deleting user:', error);
            res.status(500).json({ message: 'Error deleting user' });
        }
    }

    static async searchUsers(req, res) {
        try {
            const { username, email, role_id } = req.query;
            let users;
            if (username) {
                users = await UserSearch.searchByUsername(username);
            } else if (email) {
                users = await UserSearch.searchByEmail(email);
            } else if (role_id) {
                users = await UserSearch.searchByRoleId(role_id);
            } else {
                users = await UserSearch.searchAll();
            }
            res.json(users);
        } catch (error) {
            logger.error('Error searching users:', error);
            res.status(500).json({ message: 'Error searching users' });
        }
    }
}

module.exports = UserController;
