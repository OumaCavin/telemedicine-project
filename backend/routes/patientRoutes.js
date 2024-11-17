// routes/patientRoutes.js
const express = require('express');
const router = express.Router();
const PatientController = require('../controllers/PatientController');
const { protect } = require('../middlewares/authMiddleware');

// Route to get all patients
router.get('/', protect, PatientController.getAllPatients);

// Route to get a specific patient by ID
router.get('/:patientId', protect, PatientController.getPatientById);

// Route to add a new patient
router.post('/', protect, PatientController.createPatient);

// Route to update a patient's details
router.put('/:patientId', protect, PatientController.updatePatient);

// Route to delete a patient
router.delete('/:patientId', protect, PatientController.deletePatient);

module.exports = router;
