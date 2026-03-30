const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const { protect } = require('../middlewares/authMiddleware');

// Define the routes for user operations

// Get all users (protected route)
router.get('/', protect, UserController.getAllUsers);

// Create a new user (protected route)
router.post('/', protect, UserController.createUser);

// Get a single user by ID (protected route)
router.get('/:id', protect, UserController.getUserById);

// Update a user by ID (protected route)
router.put('/:id', protect, UserController.updateUser);

// Delete a user by ID (protected route)
router.delete('/:id', protect, UserController.deleteUser);

module.exports = router;
