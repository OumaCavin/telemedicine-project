// routes/authRoutes.js
// Updated 15/11/2024 2:10pm  

const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');
const { protect } = require('../middlewares/authMiddleware');

// Route to register a new user
router.post('/register', AuthController.register);

// Route to login a user
router.post('/login', AuthController.login);

// Route to get the authenticated user's details
router.get('/me', protect, AuthController.getMe);

// User logout
// router.get('/logout', AuthController.logout);

module.exports = router;
