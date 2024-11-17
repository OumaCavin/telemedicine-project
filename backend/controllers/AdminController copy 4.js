// controllers/AdminController.js

const { Admin } = require('../models/Admin');
const AdminSearch = require('../models/search/AdminSearch');

// Create a new admin
const createAdmin = async (req, res) => {
    try {
        const { user_id, first_name, last_name, date_of_birth, gender, phone_number, address, created_by } = req.body;

        const newAdmin = await Admin.create({
            user_id,
            first_name,
            last_name,
            date_of_birth,
            gender,
            phone_number,
            address,
            created_by,
        });

        res.status(201).json(newAdmin);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all admins
const getAllAdmins = async (req, res) => {
    try {
        const admins = await Admin.findAll();
        res.status(200).json(admins);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a specific admin by ID
const getAdminById = async (req, res) => {
    try {
        const admin = await Admin.findByPk(req.params.id);
        if (admin) {
            res.status(200).json(admin);
        } else {
            res.status(404).json({ error: 'Admin not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update an admin
const updateAdmin = async (req, res) => {
    try {
        const [updated] = await Admin.update(req.body, {
            where: { admin_id: req.params.id },
        });

        if (updated) {
            const updatedAdmin = await Admin.findByPk(req.params.id);
            res.status(200).json(updatedAdmin);
        } else {
            res.status(404).json({ error: 'Admin not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete an admin
const deleteAdmin = async (req, res) => {
    try {
        const deleted = await Admin.destroy({
            where: { admin_id: req.params.id },
        });

        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Admin not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Search for admins
const searchAdmins = async (req, res) => {
    try {
        const admins = await AdminSearch.searchAdmins(req.query);
        res.status(200).json(admins);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createAdmin,
    getAllAdmins,
    getAdminById,
    updateAdmin,
    deleteAdmin,
    searchAdmins,
};
