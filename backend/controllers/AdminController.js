// controllers/AdminController.js

const Admin = require('../models/Admin');
const AdminSearch = require('../models/search/AdminSearch');
const TeledHistory = require('../models/TeledHistory'); // Import the TeledHistory model
const TelemedStatus = require('../models/TelemedStatus'); // Import the TelemedStatus model

// Create a new admin
const createAdmin = async (req, res) => {
    try {
        const { user_id, first_name, last_name, date_of_birth, gender, phone_number, address, created_by } = req.body;

        // Create the new admin
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

        // Get the status ID for 'Created'
        const statusId = await getStatusId('Created');

        // Insert into teled_history to track the create action
        await TeledHistory.create({
            user_id: created_by,
            action: 'CREATE',
            status_id: statusId,
            action_time: new Date(),
            created_by: created_by,
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

            // Get the status ID for 'Updated'
            const statusId = await getStatusId('Updated');

            // Insert into teled_history to track the update action
            await TeledHistory.create({
                user_id: req.body.updated_by,
                action: 'UPDATE',
                status_id: statusId,
                action_time: new Date(),
                created_by: req.body.updated_by,
            });

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
            // Get the status ID for 'Deleted'
            const statusId = await getStatusId('Deleted');

            // Insert into teled_history to track the delete action
            await TeledHistory.create({
                user_id: req.body.deleted_by,
                action: 'DELETE',
                status_id: statusId,
                action_time: new Date(),
                created_by: req.body.deleted_by,
            });

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

// Helper function to fetch status ID from the telemed_status table
const getStatusId = async (statusName) => {
    try {
        // Find the status by name
        const status = await TelemedStatus.findOne({
            where: { status_name: statusName },
        });
        if (status) {
            return status.status_id; // Return the status_id
        } else {
            throw new Error(`Status with name "${statusName}" not found.`);
        }
    } catch (error) {
        throw new Error('Error fetching status ID: ' + error.message);
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
