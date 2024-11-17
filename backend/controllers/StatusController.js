// controllers/StatusController.js

const Status = require('../models/Status');
const StatusSearch = require('../models/search/StatusSearch');

// Create a new status record
const createStatus = async (req, res) => {
    try {
        const { status_name, description, created_by } = req.body;

        const newStatus = await Status.create({
            status_name,
            description,
            created_by,
        });

        res.status(201).json(newStatus);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all status records
const getAllStatuses = async (req, res) => {
    try {
        const statuses = await Status.findAll();
        res.status(200).json(statuses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a specific status by ID
const getStatusById = async (req, res) => {
    try {
        const status = await Status.findByPk(req.params.id);
        if (status) {
            res.status(200).json(status);
        } else {
            res.status(404).json({ error: 'Status not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update an existing status record
const updateStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status_name, description, updated_by } = req.body;

        const status = await Status.findByPk(id);

        if (!status) {
            return res.status(404).json({ error: 'Status not found' });
        }

        status.status_name = status_name || status.status_name;
        status.description = description || status.description;
        status.updated_by = updated_by;

        await status.save();

        res.status(200).json(status);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Search for statuses
const searchStatuses = async (req, res) => {
    try {
        const statuses = await StatusSearch.searchStatuses(req.query);
        res.status(200).json(statuses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createStatus,
    getAllStatuses,
    getStatusById,
    updateStatus,
    searchStatuses,
};
