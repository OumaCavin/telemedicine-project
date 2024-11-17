// controllers/PatientController.js

const  Patient  = require('../models/Patient');
const checkRole = require('../middlewares/checkRole');
const ROLES = require('../constants/roles');

// Patient-specific functions (accessible by authenticated patient)
const getPatientProfile = async (req, res) => {
    try {
        const patient = await Patient.findByPk(req.user.user_id); // Only the patient's own profile
        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }
        res.status(200).json(patient);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve patient profile', details: error.message });
    }
};

const updatePatientProfile = async (req, res) => {
    try {
        const patient = await Patient.findByPk(req.user.user_id);
        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }

        patient.medical_history = req.body.medical_history;
        await patient.save();

        res.status(200).json({ message: 'Patient profile updated', patient });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update patient profile', details: error.message });
    }
};

// Admin-only functions (accessible by admin)
const createPatient = async (req, res) => {
    try {
        const {
            user_id,
            medical_history,
            first_name,
            last_name,
            date_of_birth,
            gender,
            phone_number,
            address,
            created_by,
        } = req.body;

        const patient = await Patient.create({
            user_id,
            medical_history,
            first_name,
            last_name,
            date_of_birth,
            gender,
            phone_number,
            address,
            created_by,
        });
        res.status(201).json(patient);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllPatients = async (req, res) => {
    try {
        const patients = await Patient.findAll();
        res.status(200).json(patients);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getPatientById = async (req, res) => {
    try {
        const patient = await Patient.findByPk(req.params.id);
        if (patient) {
            res.status(200).json(patient);
        } else {
            res.status(404).json({ error: 'Patient not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Applying checkRole middleware to admin and patient routes
const updatePatient = [
    checkRole([ROLES.ADMIN]), // Only accessible by admin
    async (req, res) => {
        try {
            const [updated] = await Patient.update(req.body, {
                where: { patient_id: req.params.id },
            });
            if (updated) {
                const updatedPatient = await Patient.findByPk(req.params.id);
                res.status(200).json(updatedPatient);
            } else {
                res.status(404).json({ error: 'Patient not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
];

const deletePatient = [
    checkRole([ROLES.ADMIN]), // Only accessible by admin
    async (req, res) => {
        try {
            const deleted = await Patient.destroy({
                where: { patient_id: req.params.id },
            });
            if (deleted) {
                res.status(204).send();
            } else {
                res.status(404).json({ error: 'Patient not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
];

module.exports = {
    getPatientProfile,
    updatePatientProfile,
    createPatient,
    getAllPatients,
    getPatientById,
    updatePatient,
    deletePatient,
};

