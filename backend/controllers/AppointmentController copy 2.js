const Appointment = require('../models/Appointment');
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');

class AppointmentController {
    async bookAppointment(req, res) {
        const { doctor_id, appointment_time } = req.body;
        const patientId = req.user.user_id; // Assumes user ID is stored in the token

        try {
            const appointment = await Appointment.create({
                patient_id: patientId,
                doctor_id,
                appointment_time
            });

            res.status(201).json({ message: 'Appointment booked successfully', appointment });
        } catch (error) {
            res.status(500).json({ error: 'Failed to book appointment', details: error.message });
        }
    }

    async cancelAppointment(req, res) {
        const { appointment_id } = req.params;

        try {
            const appointment = await Appointment.findByPk(appointment_id);
            if (!appointment) return res.status(404).json({ error: 'Appointment not found' });

            await appointment.destroy();
            res.status(200).json({ message: 'Appointment canceled successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Failed to cancel appointment', details: error.message });
        }
    }
}

module.exports = new AppointmentController();
