// controllers/RoleController.js

const Role = require('../models/Role');
const RoleSearch = require('../models/search/RoleSearch');

// Create a new role
const createRole = async (req, res) => {
    try {
        const { role_name, description, created_by } = req.body;

        const newRole = await Role.create({
            role_name,
            description,
            created_by,
        });

        res.status(201).json(newRole);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all roles
const getAllRoles = async (req, res) => {
    const roles = await Role.findAll();
    res.status(200).json(roles);
};

// Get a specific role by ID
const getRoleById = async (req, res) => {
    try {
        const role = await Role.findByPk(req.params.id);
        if (role) {
            res.status(200).json(role);
        } else {
            res.status(404).json({ error: 'Role not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Search for roles
const searchRoles = async (req, res) => {
    try {
        const roles = await RoleSearch.searchRoles(req.query);
        res.status(200).json(roles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a role
const updateRole = async (req, res) => {
    try {
        const [updated] = await Role.update(req.body, {
            where: { role_id: req.params.id },
        });

        if (updated) {
            const updatedRole = await Role.findByPk(req.params.id);
            res.status(200).json(updatedRole);
        } else {
            res.status(404).json({ error: 'Role not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a role
const deleteRole = async (req, res) => {
    try {
        const deleted = await Role.destroy({
            where: { role_id: req.params.id },
        });

        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Role not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createRole,
    getAllRoles,
    getRoleById,
    searchRoles,
    updateRole,
    deleteRole,
};
