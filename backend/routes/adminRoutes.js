// routes/adminRoutes.js
// Updated 15/11/2024 2:10pm  

const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/AdminController');
const { protect, admin } = require('../middlewares/authMiddleware');

// Admin-only route to view all users
router.get('/users', protect, admin, AdminController.getUsers);

// Admin-only route to delete a user
router.delete('/users/:userId', protect, admin, AdminController.deleteUser);

// Admin-only route to update user roles
router.put('/users/:userId/roles', protect, admin, AdminController.updateUserRoles);

module.exports = router;


// const express = require('express');
// const AdminController = require('../controllers/AdminController');

// const router = express.Router();

// // Retrieve all users
// router.get('/users', AdminController.getAllUsers);

// // Retrieve all roles
// router.get('/roles', AdminController.getAllRoles);

// // Create a new role
// router.post('/roles', AdminController.createRole);

// // Update an existing role
// router.put('/roles/:id', AdminController.updateRole);

// // Delete a role
// router.delete('/roles/:id', AdminController.deleteRole);

// // Assign a role to a user
// router.post('/assign', RoleController.assignRole);

// module.exports = router;