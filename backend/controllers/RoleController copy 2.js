const Role = require('../models/Role');
const RoleAssignment = require('../models/RoleAssignment');

class RoleController {
    async createRole(req, res) {
        const { role_name } = req.body;

        try {
            const role = await Role.create({ role_name });
            res.status(201).json({ message: 'Role created successfully', role });
        } catch (error) {
            res.status(500).json({ error: 'Failed to create role', details: error.message });
        }
    }

    async assignRole(req, res) {
        const { user_id, role_id } = req.body;

        try {
            const assignment = await RoleAssignment.create({ user_id, role_id });
            res.status(201).json({ message: 'Role assigned successfully', assignment });
        } catch (error) {
            res.status(500).json({ error: 'Failed to assign role', details: error.message });
        }
    }
}

module.exports = new RoleController();
