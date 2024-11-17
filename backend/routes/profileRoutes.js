// routes/profileRoutes.js
const express = require('express');
const router = express.Router();
const ProfileController = require('../controllers/ProfileController');
const { protect } = require('../middlewares/authMiddleware');

// Route to get the profile of the authenticated user
router.get('/', protect, ProfileController.getProfile);

// Route to update the profile of the authenticated user
router.put('/', protect, ProfileController.updateProfile);

module.exports = router;
