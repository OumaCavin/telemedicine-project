// controllers/RoleAssignmentController.js

const RoleAssignment = require('../models/RoleAssignment');
const RoleAssignmentSearch = require('../models/search/RoleAssignmentSearch');
const User = require('../models/User');
const Role = require('../models/Role');

// Create a new role assignment
const createRoleAssignment = async (req, res) => {
    try {
        const { user_id, role_id, created_by } = req.body;

        const newRoleAssignment = await RoleAssignment.create({
            user_id,
            role_id,
            created_by,
        });

        // Fetch the created assignment with relations
        const created = await RoleAssignment.findByPk(newRoleAssignment.role_assignment_id, {
            include: [
                { model: User, as: 'user', attributes: ['user_id', 'username', 'email'] },
                { model: Role, as: 'role', attributes: ['role_id', 'name'] }
            ]
        });

        // Transform response
        const transformed = {
            role_assignment_id: created.role_assignment_id,
            user_id: created.user_id,
            role_id: created.role_id,
            userName: created.user ? created.user.username : `User ${created.user_id}`,
            roleName: created.role ? created.role.name : `Role ${created.role_id}`,
            created_by: created.created_by,
            created_at: created.created_at
        };

        res.status(201).json(transformed);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all role assignments with user and role names
const getAllRoleAssignments = async (req, res) => {
    try {
        const roleAssignments = await RoleAssignment.findAll({
            include: [
                { model: User, as: 'user', attributes: ['user_id', 'username', 'email'] },
                { model: Role, as: 'role', attributes: ['role_id', 'name'] }
            ]
        });
        
        // Transform data to include userName and roleName
        const transformed = roleAssignments.map(ra => ({
            role_assignment_id: ra.role_assignment_id,
            user_id: ra.user_id,
            role_id: ra.role_id,
            userName: ra.user ? ra.user.username : `User ${ra.user_id}`,
            roleName: ra.role ? ra.role.name : `Role ${ra.role_id}`,
            created_by: ra.created_by,
            updated_by: ra.updated_by,
            created_at: ra.created_at,
            updated_at: ra.updated_at
        }));
        
        res.status(200).json(transformed);
    } catch (error) {
        console.error('Error fetching role assignments:', error);
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

// Assign a role to a user
const assignRole = async (req, res) => {
    try {
        const { role_id, created_by } = req.body;
        const { userId } = req.params;

        const newRoleAssignment = await RoleAssignment.create({
            user_id: userId,
            role_id,
            created_by,
        });

        res.status(201).json(newRoleAssignment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Remove a role from a user
const removeRole = async (req, res) => {
    try {
        const { userId, roleId } = req.params;

        const deleted = await RoleAssignment.destroy({
            where: { user_id: userId, role_id: roleId },
        });

        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Role Assignment not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createRoleAssignment,
    getAllRoleAssignments,
    getRoleAssignmentById,
    searchRoleAssignments,
    assignRole,
    removeRole,
};
