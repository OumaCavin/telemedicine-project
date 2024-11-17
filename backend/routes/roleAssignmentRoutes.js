// routes/roleAssignmentRoutes.js
const express = require('express');
const router = express.Router();
const RoleAssignmentController = require('../controllers/RoleAssignmentController');
const { protect } = require('../middlewares/authMiddleware');

// Route to assign a role to a user
router.post('/:userId', protect, RoleAssignmentController.assignRole);

// Route to remove a role from a user
router.delete('/:userId/:roleId', protect, RoleAssignmentController.removeRole);

module.exports = router;
