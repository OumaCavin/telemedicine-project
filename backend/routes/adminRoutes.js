// routes/adminRoutes.js
// Updated 15/11/2024 2:10pm  

const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/AdminController');
const { protect, admin } = require('../middlewares/authMiddleware');

// Admin routes
router.get('/', AdminController.getAllAdmins);
router.post('/', AdminController.createAdmin);
router.get('/:id', AdminController.getAdminById);
router.put('/:id', AdminController.updateAdmin);
router.delete('/:id', AdminController.deleteAdmin);
router.get('/search', AdminController.searchAdmins);

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