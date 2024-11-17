// routes/prescriptionRoutes.js
const express = require('express');
const router = express.Router();
const PrescriptionController = require('../controllers/PrescriptionController');
const { protect } = require('../middlewares/authMiddleware');

// Route to get all prescriptions
router.get('/', protect, PrescriptionController.getAllPrescriptions);

// Route to add a new prescription
router.post('/', protect, PrescriptionController.createPrescription);

// Route to update a prescription
router.put('/:prescriptionId', protect, PrescriptionController.updatePrescription);

// Route to delete a prescription
router.delete('/:prescriptionId', protect, PrescriptionController.deletePrescription);

module.exports = router;
