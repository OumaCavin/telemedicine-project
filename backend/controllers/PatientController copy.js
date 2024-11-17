const Patient = require('../models/Patient');
const User = require('../models/User');

class PatientController {
    async getProfile(req, res) {
        const patientId = req.user.user_id; // Assumes user ID is stored in the token

        try {
            const patient = await Patient.findByPk(patientId);
            if (!patient) return res.status(404).json({ error: 'Patient not found' });

            res.status(200).json({ patient });
        } catch (error) {
            res.status(500).json({ error: 'Failed to retrieve patient profile', details: error.message });
        }
    }

    async updateProfile(req, res) {
        const patientId = req.user.user_id; // Assumes user ID is stored in the token
        const { medical_history } = req.body;

        try {
            const patient = await Patient.findByPk(patientId);
            if (!patient) return res.status(404).json({ error: 'Patient not found' });

            patient.medical_history = medical_history;
            await patient.save();

            res.status(200).json({ message: 'Patient profile updated', patient });
        } catch (error) {
            res.status(500).json({ error: 'Failed to update patient profile', details: error.message });
        }
    }

    async deleteAccount(req, res) {
        const patientId = req.user.user_id; // Assumes user ID is stored in the token

        try {
            const patient = await Patient.findByPk(patientId);
            if (!patient) return res.status(404).json({ error: 'Patient not found' });

            await patient.destroy();
            res.status(200).json({ message: 'Patient account deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete patient account', details: error.message });
        }
    }
}

module.exports = new PatientController();
