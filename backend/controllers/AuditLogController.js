// controllers/AuditLogController.js

const AuditLog = require('../models/AuditLog');
const AuditLogSearch = require('../models/search/AuditLogSearch');

// Create a new audit log
const createAuditLog = async (req, res) => {
    try {
        const { user_id, action, previous_state, current_state, affected_table, created_by } = req.body;

        const newAuditLog = await AuditLog.create({
            user_id,
            action,
            previous_state,
            current_state,
            affected_table,
            created_by,
        });

        res.status(201).json(newAuditLog);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all audit log records
const getAllAuditLogs = async (req, res) => {
    try {
        const auditLogs = await AuditLog.findAll();
        res.status(200).json(auditLogs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a specific audit log by ID
const getAuditLogById = async (req, res) => {
    try {
        const auditLog = await AuditLog.findByPk(req.params.id);
        if (auditLog) {
            res.status(200).json(auditLog);
        } else {
            res.status(404).json({ error: 'Audit log not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Search for audit logs
const searchAuditLogs = async (req, res) => {
    try {
        const auditLogs = await AuditLogSearch.searchAuditLogs(req.query);
        res.status(200).json(auditLogs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createAuditLog,
    getAllAuditLogs,
    getAuditLogById,
    searchAuditLogs,
};
