// routes/roleItemRoutes.js
const express = require('express');
const router = express.Router();
const RoleItemController = require('../controllers/RoleItemController');
const { protect } = require('../middlewares/authMiddleware');

// Route to get role items (permissions) for a specific role
router.get('/:id', protect, RoleItemController.searchRoleItems);

// Route to add a new permission to a role
router.post('/:id', protect, RoleItemController.createRoleItem);

// Route to remove a permission from a role
router.delete('/:id/:permissionId', protect, RoleItemController.removeRoleItem);

module.exports = router;
