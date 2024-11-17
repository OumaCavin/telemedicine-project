const Doctor = require('../models/Doctor');

class DoctorController {
    async getProfile(req, res) {
        const doctorId = req.user.user_id; // Assumes user ID is stored in the token

        try {
            const doctor = await Doctor.findByPk(doctorId);
            if (!doctor) return res.status(404).json({ error: 'Doctor not found' });

            res.status(200).json({ doctor });
        } catch (error) {
            res.status(500).json({ error: 'Failed to retrieve doctor profile', details: error.message });
        }
    }

    async updateSchedule(req, res) {
        const doctorId = req.user.user_id; // Assumes user ID is stored in the token
        const { availability } = req.body;

        try {
            const doctor = await Doctor.findByPk(doctorId);
            if (!doctor) return res.status(404).json({ error: 'Doctor not found' });

            doctor.availability = availability;
            await doctor.save();

            res.status(200).json({ message: 'Doctor schedule updated', doctor });
        } catch (error) {
            res.status(500).json({ error: 'Failed to update doctor schedule', details: error.message });
        }
    }
}

module.exports = new DoctorController();
