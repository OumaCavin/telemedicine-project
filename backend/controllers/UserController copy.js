const User = require('../models/User');

class UserController {
    async getAllUsers(req, res) {
        try {
            const users = await User.findAll();
            res.status(200).json({ users });
        } catch (error) {
            res.status(500).json({ error: 'Failed to retrieve users', details: error.message });
        }
    }

    async updateUser(req, res) {
        const { user_id } = req.params;
        const { email, role_id } = req.body;

        try {
            const user = await User.findByPk(user_id);
            if (!user) return res.status(404).json({ error: 'User not found' });

            user.email = email;
            user.role_id = role_id;
            await user.save();

            res.status(200).json({ message: 'User updated successfully', user });
        } catch (error) {
            res.status(500).json({ error: 'Failed to update user', details: error.message });
        }
    }
}

module.exports = new UserController();
