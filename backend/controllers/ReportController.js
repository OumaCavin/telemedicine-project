// controllers/ReportController.js

const Report = require('../models/Report');

// Generate a new report
const generateReport = async (req, res) => {
    try {
        const { report_type, title, data, generated_by } = req.body;

        const newReport = await Report.create({
            report_type,
            title,
            data,
            generated_by,
        });

        res.status(201).json(newReport);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a specific report by ID
const getReport = async (req, res) => {
    try {
        const report = await Report.findByPk(req.params.reportId);
        if (report) {
            res.status(200).json(report);
        } else {
            res.status(404).json({ error: 'Report not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a report
const deleteReport = async (req, res) => {
    try {
        const deleted = await Report.destroy({
            where: { report_id: req.params.reportId },
        });

        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Report not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    generateReport,
    getReport,
    deleteReport,
};
