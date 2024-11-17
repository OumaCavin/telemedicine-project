// controllers/PrescriptionController.js

const Prescription = require('../models/Prescription');
const PrescriptionSearch = require('../models/search/PrescriptionSearch');

// Create a new prescription
const createPrescription = async (req, res) => {
    try {
        const { ehr_id, patient_id, doctor_id, appointment_id, medication_name, dosage, frequency, medication, dosage_instructions, refill_date, created_by } = req.body;

        const newPrescription = await Prescription.create({
            ehr_id,
            patient_id,
            doctor_id,
            appointment_id,
            medication_name,
            dosage,
            frequency,
            medication,
            dosage_instructions,
            refill_date,
            created_by,
        });

        res.status(201).json(newPrescription);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all prescriptions
const getAllPrescriptions = async (req, res) => {
    try {
        const prescriptions = await Prescription.findAll();
        res.status(200).json(prescriptions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a specific prescription by ID
const getPrescriptionById = async (req, res) => {
    try {
        const prescription = await Prescription.findByPk(req.params.id);
        if (prescription) {
            res.status(200).json(prescription);
        } else {
            res.status(404).json({ error: 'Prescription not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a prescription
const updatePrescription = async (req, res) => {
    try {
        const [updated] = await Prescription.update(req.body, {
            where: { prescription_id: req.params.id },
        });

        if (updated) {
            const updatedPrescription = await Prescription.findByPk(req.params.id);
            res.status(200).json(updatedPrescription);
        } else {
            res.status(404).json({ error: 'Prescription not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a prescription
const deletePrescription = async (req, res) => {
    try {
        const deleted = await Prescription.destroy({
            where: { prescription_id: req.params.id },
        });

        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Prescription not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Search for prescriptions
const searchPrescriptions = async (req, res) => {
    try {
        const prescriptions = await PrescriptionSearch.searchPrescriptions(req.query);
        res.status(200).json(prescriptions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createPrescription,
    getAllPrescriptions,
    getPrescriptionById,
    updatePrescription,
    deletePrescription,
    searchPrescriptions,
};
