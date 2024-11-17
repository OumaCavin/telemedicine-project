// routes/roleItemRoutes.js
const express = require('express');
const router = express.Router();
const RoleItemController = require('../controllers/RoleItemController');
const { protect } = require('../middlewares/authMiddleware');

// Route to get role items (permissions) for a specific role
router.get('/:roleId', protect, RoleItemController.getRoleItems);

// Route to add a new permission to a role
router.post('/:roleId', protect, RoleItemController.addRoleItem);

// Route to remove a permission from a role
router.delete('/:roleId/:permissionId', protect, RoleItemController.removeRoleItem);

module.exports = router;
