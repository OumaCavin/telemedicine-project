// routes/auditLogRoutes.js
const express = require('express');
const router = express.Router();
const AuditLogController = require('../controllers/AuditLogController');
const { protect } = require('../middlewares/authMiddleware');

// Route to get all audit logs
router.get('/', protect, AuditLogController.getAuditLogs);

// Route to get a specific audit log by ID
router.get('/:logId', protect, AuditLogController.getAuditLog);

// Route to create a new audit log
router.post('/', protect, AuditLogController.createAuditLog);

module.exports = router;
