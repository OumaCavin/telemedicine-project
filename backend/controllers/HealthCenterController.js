// controllers/HealthCenterController.js

const HealthCenter = require('../models/HealthCenter');
const HealthCenterSearch = require('../models/search/HealthCenterSearch');

// Create a new health center
const createHealthCenter = async (req, res) => {
    try {
        const { name, location, contact_info, type, created_by } = req.body;

        const newHealthCenter = await HealthCenter.create({
            name,
            location,
            contact_info,
            type,
            created_by,
        });

        res.status(201).json(newHealthCenter);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all health centers
const getAllHealthCenters = async (req, res) => {
    try {
        const healthCenters = await HealthCenter.findAll();
        res.status(200).json(healthCenters);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a specific health center by ID
const getHealthCenterById = async (req, res) => {
    try {
        const healthCenter = await HealthCenter.findByPk(req.params.id);
        if (healthCenter) {
            res.status(200).json(healthCenter);
        } else {
            res.status(404).json({ error: 'Health Center not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a health center
const updateHealthCenter = async (req, res) => {
    try {
        const [updated] = await HealthCenter.update(req.body, {
            where: { center_id: req.params.id },
        });

        if (updated) {
            const updatedHealthCenter = await HealthCenter.findByPk(req.params.id);
            res.status(200).json(updatedHealthCenter);
        } else {
            res.status(404).json({ error: 'Health Center not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a health center
const deleteHealthCenter = async (req, res) => {
    try {
        const deleted = await HealthCenter.destroy({
            where: { center_id: req.params.id },
        });

        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Health Center not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Search for health centers
const searchHealthCenters = async (req, res) => {
    try {
        const healthCenters = await HealthCenterSearch.searchHealthCenters(req.query);
        res.status(200).json(healthCenters);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createHealthCenter,
    getAllHealthCenters,
    getHealthCenterById,
    updateHealthCenter,
    deleteHealthCenter,
    searchHealthCenters,
};
