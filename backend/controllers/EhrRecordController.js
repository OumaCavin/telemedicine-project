// controllers/EhrRecordController.js

const EhrRecord = require('../models/EhrRecord');
const EhrRecordSearch = require('../models/search/EhrRecordSearch');

// Create a new EHR record
const createEhrRecord = async (req, res) => {
    try {
        const { patient_id, doctor_id, medical_conditions, allergies, medications, visit_date, diagnosis, treatment, encounter_type, created_by } = req.body;

        const newEhrRecord = await EhrRecord.create({
            patient_id,
            doctor_id,
            medical_conditions,
            allergies,
            medications,
            visit_date,
            diagnosis,
            treatment,
            encounter_type,
            created_by,
        });

        res.status(201).json(newEhrRecord);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all EHR records
const getAllEhrRecords = async (req, res) => {
    try {
        const ehrRecords = await EhrRecord.findAll();
        res.status(200).json(ehrRecords);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a specific EHR record by ID
const getEhrRecordById = async (req, res) => {
    try {
        const ehrRecord = await EhrRecord.findByPk(req.params.id);
        if (ehrRecord) {
            res.status(200).json(ehrRecord);
        } else {
            res.status(404).json({ error: 'EHR Record not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update an existing EHR record
const updateEhrRecord = async (req, res) => {
    try {
        const { id } = req.params;
        const { patient_id, doctor_id, medical_conditions, allergies, medications, visit_date, diagnosis, treatment, encounter_type, updated_by } = req.body;

        const ehrRecord = await EhrRecord.findByPk(id);

        if (!ehrRecord) {
            return res.status(404).json({ error: 'EHR Record not found' });
        }

        ehrRecord.patient_id = patient_id || ehrRecord.patient_id;
        ehrRecord.doctor_id = doctor_id || ehrRecord.doctor_id;
        ehrRecord.medical_conditions = medical_conditions || ehrRecord.medical_conditions;
        ehrRecord.allergies = allergies || ehrRecord.allergies;
        ehrRecord.medications = medications || ehrRecord.medications;
        ehrRecord.visit_date = visit_date || ehrRecord.visit_date;
        ehrRecord.diagnosis = diagnosis || ehrRecord.diagnosis;
        ehrRecord.treatment = treatment || ehrRecord.treatment;
        ehrRecord.encounter_type = encounter_type || ehrRecord.encounter_type;
        ehrRecord.updated_by = updated_by;

        await ehrRecord.save();

        res.status(200).json(ehrRecord);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Search for EHR records
const searchEhrRecords = async (req, res) => {
    try {
        const ehrRecords = await EhrRecordSearch.searchEhrRecords(req.query);
        res.status(200).json(ehrRecords);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createEhrRecord,
    getAllEhrRecords,
    getEhrRecordById,
    updateEhrRecord,
    searchEhrRecords,
};
