// ontrollers/UserController
const User = require('../models/User');
const UserService = require('../services/UserService');
const logger = require('../utils/logger');
const StatusConstants = require('../utils/statusConstants');
const bcrypt = require('bcrypt'); // For password hashing

// Create a new user
const createUser = async (req, res) => {
    const { username, email, password, role_id } = req.body;

    try {
        const newUser = await UserService.registerUser({
            username,
            email,
            password,
            role_id,
            createdBy: req.userId,
        });

        res.status(201).json(newUser);
    } catch (error) {
        logger.error('Error creating user:', error);
        res.status(500).json({ message: 'Error creating user', error });
    }
};

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        logger.error('Error fetching users:', error);
        res.status(500).json({ message: 'Error fetching users', error });
    }
};

// Get a specific user by ID
const getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.user_id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        logger.error('Error fetching user by ID:', error);
        res.status(500).json({ message: 'Error fetching user by ID', error });
    }
};

// Update a user
const updateUser = async (req, res) => {
    const { user_id } = req.params;
    const { username, email, password, role_id, status } = req.body;

    try {
        const user = await User.findByPk(user_id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (password) {
            user.password = await bcrypt.hash(password, 10); // Hash the password if provided
        }

        user.username = username || user.username;
        user.email = email || user.email;
        user.role_id = role_id || user.role_id;
        user.status = status || user.status || StatusConstants.ACTIVE; // Default to ACTIVE
        user.updated_by = req.userId;

        await user.save();

        res.json(user);
    } catch (error) {
        logger.error('Error updating user:', error);
        res.status(500).json({ message: 'Error updating user', error });
    }
};

// Delete a user
const deleteUser = async (req, res) => {
    try {
        const { user_id } = req.params;

        const deleted = await User.destroy({ where: { user_id } });

        if (!deleted) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(204).send();
    } catch (error) {
        logger.error('Error deleting user:', error);
        res.status(500).json({ message: 'Error deleting user', error });
    }
};

// Search for users
const searchUsers = async (req, res) => {
    try {
        const users = await UserService.searchUsers(req.query);
        res.status(200).json(users);
    } catch (error) {
        logger.error('Error searching users:', error);
        res.status(500).json({ message: 'Error searching users', error });
    }
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    searchUsers,
};
