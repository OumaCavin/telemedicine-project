// controllers/ProfileController.js

const User = require('../models/User');

// Get the profile of the authenticated user
const getProfile = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id, {
            attributes: { exclude: ['password'] }
        });
        
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update the profile of the authenticated user
const updateProfile = async (req, res) => {
    try {
        const { first_name, last_name, phone, date_of_birth, gender, address } = req.body;
        
        const user = await User.findByPk(req.user.id);
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        user.first_name = first_name || user.first_name;
        user.last_name = last_name || user.last_name;
        user.phone = phone || user.phone;
        user.date_of_birth = date_of_birth || user.date_of_birth;
        user.gender = gender || user.gender;
        user.address = address || user.address;
        
        await user.save();
        
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getProfile,
    updateProfile,
};
