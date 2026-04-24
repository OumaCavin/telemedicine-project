// routes/roleAssignmentRoutes.js
const express = require('express');
const router = express.Router();
const RoleAssignmentController = require('../controllers/RoleAssignmentController');
const { protect } = require('../middlewares/authMiddleware');

// Route to get all role assignments
router.get('/', protect, RoleAssignmentController.getAllRoleAssignments);

// Route to get a specific role assignment by ID
router.get('/:id', protect, RoleAssignmentController.getRoleAssignmentById);

// Route to assign a role to a user
router.post('/', protect, RoleAssignmentController.createRoleAssignment);

// Route to assign a role to a user (alternative endpoint)
router.post('/:userId', protect, RoleAssignmentController.assignRole);

// Route to remove a role from a user
router.delete('/:userId/:roleId', protect, RoleAssignmentController.removeRole);

// Route to delete a role assignment by ID
router.delete('/:id', protect, async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await require('../models/RoleAssignment').destroy({
            where: { role_assignment_id: id }
        });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Role Assignment not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
