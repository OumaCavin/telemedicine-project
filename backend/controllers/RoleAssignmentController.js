// controllers/RoleAssignmentController.js

const RoleAssignment = require('../models/RoleAssignment');
const RoleAssignmentSearch = require('../models/search/RoleAssignmentSearch');

// Create a new role assignment
const createRoleAssignment = async (req, res) => {
    try {
        const { user_id, role_id, created_by } = req.body;

        const newRoleAssignment = await RoleAssignment.create({
            user_id,
            role_id,
            created_by,
        });

        res.status(201).json(newRoleAssignment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all role assignments
const getAllRoleAssignments = async (req, res) => {
    try {
        const roleAssignments = await RoleAssignment.findAll();
        res.status(200).json(roleAssignments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a specific role assignment by ID
const getRoleAssignmentById = async (req, res) => {
    try {
        const roleAssignment = await RoleAssignment.findByPk(req.params.id);
        if (roleAssignment) {
            res.status(200).json(roleAssignment);
        } else {
            res.status(404).json({ error: 'Role Assignment not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Search for role assignments
const searchRoleAssignments = async (req, res) => {
    try {
        const roleAssignments = await RoleAssignmentSearch.searchRoleAssignments(req.query);
        res.status(200).json(roleAssignments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createRoleAssignment,
    getAllRoleAssignments,
    getRoleAssignmentById,
    searchRoleAssignments,
};
