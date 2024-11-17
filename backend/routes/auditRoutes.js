// routes/auditRoutes.js
// Updated 15/11/2024 2:10pm  

const express = require('express');
const router = express.Router();
const AuditController = require('../controllers/AuditController');
const { protect } = require('../middlewares/authMiddleware');

// Route to get all audit logs
router.get('/', protect, AuditController.getAllAuditLogs);

// Route to get a specific audit log by ID
router.get('/:logId', protect, AuditController.getAuditLogById);

module.exports = router;
