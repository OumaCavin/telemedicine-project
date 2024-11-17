// routes/statusRoutes.js
const express = require('express');
const router = express.Router();
const StatusController = require('../controllers/StatusController');
const { protect } = require('../middlewares/authMiddleware');

// Route to get user's status
router.get('/:userId', protect, StatusController.getStatus);

// Route to update user's status
router.put('/:userId', protect, StatusController.updateStatus);

module.exports = router;
