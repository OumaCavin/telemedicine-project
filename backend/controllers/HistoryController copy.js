// controllers/HistoryController.js
const History = require('../models/History'); // Assuming a History model

exports.getAllHistory = async (req, res) => {
    try {
        const history = await History.find({ patientId: req.params.patientId });
        if (!history) {
            return res.status(404).json({ message: 'No history found' });
        }
        res.json(history);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving medical history' });
    }
};

exports.createHistory = async (req, res) => {
    try {
        const newHistory = new History({
            patientId: req.params.patientId,
            description: req.body.description,
            date: req.body.date,
        });
        await newHistory.save();
        res.status(201).json(newHistory);
    } catch (err) {
        res.status(500).json({ message: 'Error adding medical history' });
    }
};

exports.updateHistory = async (req, res) => {
    try {
        const history = await History.findByIdAndUpdate(req.params.historyId, req.body, { new: true });
        if (!history) {
            return res.status(404).json({ message: 'History not found' });
        }
        res.json(history);
    } catch (err) {
        res.status(500).json({ message: 'Error updating medical history' });
    }
};

exports.deleteHistory = async (req, res) => {
    try {
        const history = await History.findByIdAndDelete(req.params.historyId);
        if (!history) {
            return res.status(404).json({ message: 'History not found' });
        }
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ message: 'Error deleting medical history' });
    }
};
