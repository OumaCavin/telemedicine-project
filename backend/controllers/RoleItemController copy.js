const RoleItem = require('../models/RoleItem');

exports.getRoleItems = async (req, res) => {
    try {
        const items = await RoleItem.find();
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving role items' });
    }
};

exports.createRoleItem = async (req, res) => {
    try {
        const newItem = new RoleItem(req.body);
        await newItem.save();
        res.status(201).json(newItem);
    } catch (err) {
        res.status(500).json({ message: 'Error creating role item' });
    }
};

exports.updateRoleItem = async (req, res) => {
    try {
        const item = await RoleItem.findByIdAndUpdate(req.params.itemId, req.body, { new: true });
        if (!item) {
            return res.status(404).json({ message: 'Role item not found' });
        }
        res.json(item);
    } catch (err) {
        res.status(500).json({ message: 'Error updating role item' });
    }
};
