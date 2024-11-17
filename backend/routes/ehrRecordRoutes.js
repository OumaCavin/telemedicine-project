// routes/ehrRecordRoutes.js
const express = require('express');
const router = express.Router();
const EhrRecordController = require('../controllers/EhrRecordController');
const { protect } = require('../middlewares/authMiddleware');

// Route to get a patient's EHR record
router.get('/:patientId', protect, EhrRecordController.getEhrRecord);

// Route to add a new EHR record
router.post('/:patientId', protect, EhrRecordController.addEHRRecord);

// Route to update an EHR record
router.put('/:ehrRecordId', protect, EhrRecordController.updateEHRRecord);

// Route to delete an EHR record
router.delete('/:ehrRecordId', protect, EhrRecordController.deleteEHRRecord);

module.exports = router;
