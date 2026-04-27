// controllers/HistoryController.js

const History = require('../models/History');
const HistorySearch = require('../models/search/HistorySearch');

// Create a new history record
const createHistory = async (req, res) => {
    try {
        const { user_id, status_id, action, created_by } = req.body;

        const newHistory = await History.create({
            user_id,
            status_id,
            action,
            created_by,
        });

        res.status(201).json(newHistory);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all history records
const getAllHistory = async (req, res) => {
    try {
        const historyRecords = await History.findAll({
            include: [{ model: require('../models/User'), as: 'user', attributes: ['user_id', 'user_name'] }],
        });

        const transformedRecords = historyRecords.map(record => {
            const data = record.toJSON();
            return {
                ...data,
                userName: data.user ? data.user.user_name : null,
            };
        });

        res.status(200).json(transformedRecords);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a specific history record by ID
const getHistoryById = async (req, res) => {
    try {
        const history = await History.findByPk(req.params.id);
        if (history) {
            res.status(200).json(history);
        } else {
            res.status(404).json({ error: 'History record not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Search for history records
const searchHistory = async (req, res) => {
    try {
        const historyRecords = await HistorySearch.searchHistory(req.query);
        res.status(200).json(historyRecords);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a history record
const updateHistory = async (req, res) => {
    try {
        const [updated] = await History.update(req.body, {
            where: { history_id: req.params.id },
        });

        if (updated) {
            const updatedHistory = await History.findByPk(req.params.id);
            res.status(200).json(updatedHistory);
        } else {
            res.status(404).json({ error: 'History record not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a history record
const deleteHistory = async (req, res) => {
    try {
        const deleted = await History.destroy({
            where: { history_id: req.params.id },
        });

        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'History record not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createHistory,
    getAllHistory,
    getHistoryById,
    searchHistory,
    updateHistory,
    deleteHistory,
};
