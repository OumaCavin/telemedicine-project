const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware'); // Import authentication middleware

// Define the routes for user operations

// Get all users (protected route)
router.get('/', protect, userController.getAllUsers);

// Create a new user (protected route)
router.post('/', protect, userController.createUser);

// Get a single user by ID (protected route)
router.get('/:id', protect, userController.getUserById);

// Update a user by ID (protected route)
router.put('/:id', protect, userController.updateUser);

// Delete a user by ID (protected route)
router.delete('/:id', protect, userController.deleteUser);

module.exports = router;
