// routes/appointmentRoutes.js
// Updated 15/11/2024 2:10pm  

const express = require('express');
const router = express.Router();
const AppointmentController = require('../controllers/AppointmentController');
const { protect } = require('../middlewares/authMiddleware');

// Route to get all appointments
router.get('/', protect, AppointmentController.getAllAppointments);

// Route to get a specific appointment by ID
router.get('/:appointmentId', protect, AppointmentController.getAppointmentById);

// Route to create a new appointment
router.post('/', protect, AppointmentController.bookAppointment);

// Route to update an appointment
router.put('/:appointmentId', protect, AppointmentController.updateAppointment);

// Route to cancel an appointment
router.delete('/:appointmentId', protect, AppointmentController.cancelAppointment);

module.exports = router;
