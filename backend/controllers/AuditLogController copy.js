const AuditLog = require('../models/AuditLog');

class AuditLogController {
    async getLogs(req, res) {
        try {
            const logs = await AuditLog.findAll();
            res.status(200).json({ logs });
        } catch (error) {
            res.status(500).json({ error: 'Failed to retrieve audit logs', details: error.message });
        }
    }
}

module.exports = new AuditLogController();
