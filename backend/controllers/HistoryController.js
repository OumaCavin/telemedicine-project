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
        const historyRecords = await History.findAll();
        res.status(200).json(historyRecords);
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

module.exports = {
    createHistory,
    getAllHistory,
    getHistoryById,
    searchHistory,
};
