// routes/roleRoutes.js
const express = require('express');
const router = express.Router();
const RoleController = require('../controllers/RoleController');
const { protect } = require('../middlewares/authMiddleware');

// Route to get all roles
router.get('/', protect, RoleController.getAllRoles);

// Route to get a specific role by ID
router.get('/:roleId', protect, RoleController.getRoleById);

// Route to create a new role
router.post('/', protect, RoleController.createRole);

// Route to update a role
router.put('/:roleId', protect, RoleController.updateRole);

// Route to delete a role
router.delete('/:roleId', protect, RoleController.deleteRole);

module.exports = router;
