const AuditLog = require('../models/AuditLog');

exports.getAuditLogs = async (req, res) => {
    try {
        const logs = await AuditLog.find();
        res.json(logs);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving audit logs' });
    }
};

exports.createAuditLog = async (req, res) => {
    try {
        const newLog = new AuditLog(req.body);
        await newLog.save();
        res.status(201).json(newLog);
    } catch (err) {
        res.status(500).json({ message: 'Error creating audit log' });
    }
};
