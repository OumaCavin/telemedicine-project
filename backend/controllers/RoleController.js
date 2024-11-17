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
    try {
        const roles = await Role.findAll();
        res.status(200).json(roles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
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

module.exports = {
    createRole,
    getAllRoles,
    getRoleById,
    searchRoles,
};
