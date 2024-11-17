// controllers/PatientController.js

const Patient = require('../models/Patient');
const PatientSearch = require('../models/search/PatientSearch');

// Create a new patient
const createPatient = async (req, res) => {
    try {
        const { user_id, medical_history, first_name, last_name, date_of_birth, gender, phone_number, address, created_by } = req.body;

        const newPatient = await Patient.create({
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

        res.status(201).json(newPatient);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all patients
const getAllPatients = async (req, res) => {
    try {
        const patients = await Patient.findAll();
        res.status(200).json(patients);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a specific patient by ID
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

// Update a patient
const updatePatient = async (req, res) => {
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
};

// Delete a patient
const deletePatient = async (req, res) => {
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
};

// Search for patients
const searchPatients = async (req, res) => {
    try {
        const patients = await PatientSearch.searchPatients(req.query);
        res.status(200).json(patients);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createPatient,
    getAllPatients,
    getPatientById,
    updatePatient,
    deletePatient,
    searchPatients,
};
