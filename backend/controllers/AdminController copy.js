const User = require('../models/User');

class AdminController {
    async manageUsers(req, res) {
        try {
            const users = await User.findAll();
            res.status(200).json({ users });
        } catch (error) {
            res.status(500).json({ error: 'Failed to retrieve users', details: error.message });
        }
    }

    async deleteUser(req, res) {
        const { user_id } = req.params;

        try {
            const user = await User.findByPk(user_id);
            if (!user) return res.status(404).json({ error: 'User not found' });

            await user.destroy();
            res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete user', details: error.message });
        }
    }
}

module.exports = new AdminController();
