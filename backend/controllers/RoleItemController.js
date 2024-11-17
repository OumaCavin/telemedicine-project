// controllers/RoleItemController.js

const RoleItem = require('../models/RoleItem');
const RoleItemSearch = require('../models/search/RoleItemSearch');

// Create a new role item
const createRoleItem = async (req, res) => {
    try {
        const { role_id, permission, description, created_by } = req.body;

        const newRoleItem = await RoleItem.create({
            role_id,
            permission,
            description,
            created_by,
        });

        res.status(201).json(newRoleItem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all role items
const getAllRoleItems = async (req, res) => {
    try {
        const roleItems = await RoleItem.findAll();
        res.status(200).json(roleItems);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a specific role item by ID
const getRoleItemById = async (req, res) => {
    try {
        const roleItem = await RoleItem.findByPk(req.params.id);
        if (roleItem) {
            res.status(200).json(roleItem);
        } else {
            res.status(404).json({ error: 'Role Item not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update an existing role item
const updateRoleItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { role_id, permission, description, updated_by } = req.body;

        const roleItem = await RoleItem.findByPk(id);

        if (!roleItem) {
            return res.status(404).json({ error: 'Role Item not found' });
        }

        roleItem.role_id = role_id || roleItem.role_id;
        roleItem.permission = permission || roleItem.permission;
        roleItem.description = description || roleItem.description;
        roleItem.updated_by = updated_by;

        await roleItem.save();

        res.status(200).json(roleItem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Search for role items
const searchRoleItems = async (req, res) => {
    try {
        const roleItems = await RoleItemSearch.searchRoleItems(req.query);
        res.status(200).json(roleItems);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createRoleItem,
    getAllRoleItems,
    getRoleItemById,
    updateRoleItem,
    searchRoleItems,
};
