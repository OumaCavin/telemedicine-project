// routes/historyRoutes.js
const express = require('express');
const router = express.Router();
const HistoryController = require('../controllers/HistoryController');
const { protect } = require('../middlewares/authMiddleware');

// Route to get patient's medical history
router.get('/:patientId', protect, HistoryController.getHistories);

// Route to add a new medical history record
router.post('/:patientId', protect, HistoryController.createHistory);

// Route to update a medical history record
router.put('/:historyId', protect, HistoryController.updateHistory);

// Route to delete a medical history record
router.delete('/:historyId', protect, HistoryController.deleteHistory);

module.exports = router;
