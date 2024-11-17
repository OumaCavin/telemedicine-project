// routes/doctorRoutes.js
// Updated 15/11/2024 2:10pm  

const express = require('express');
const router = express.Router();
const DoctorController = require('../controllers/DoctorController');
const { protect } = require('../middlewares/authMiddleware');

// Route to get all doctors
router.get('/', protect, DoctorController.getAllDoctors);

// Route to get a specific doctor by ID
router.get('/:doctorId', protect, DoctorController.getDoctorById);

// Route to add a new doctor
router.post('/', protect, DoctorController.createDoctor);

// Route to update a doctor's details
router.put('/:doctorId', protect, DoctorController.updateDoctor);

// Route to delete a doctor
router.delete('/:doctorId', protect, DoctorController.deleteDoctor);

module.exports = router;
