// routes/reportRoutes.js
const express = require('express');
const router = express.Router();
const ReportController = require('../controllers/ReportController');
const { protect } = require('../middlewares/authMiddleware');

// Route to generate a report
router.post('/', protect, ReportController.generateReport);

// Route to get a specific report
router.get('/:reportId', protect, ReportController.getReport);

// Route to delete a report
router.delete('/:reportId', protect, ReportController.deleteReport);

module.exports = router;
