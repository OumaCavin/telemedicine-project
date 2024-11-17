// controllers/DoctorController.js

const Doctor = require('../models/Doctor');
const DoctorSearch = require('../models/search/DoctorSearch');

// Create a new doctor
const createDoctor = async (req, res) => {
    try {
        const { user_id, first_name, last_name, date_of_birth, gender, phone_number, address, specialization, availability, qualifications, bio, created_by } = req.body;

        const newDoctor = await Doctor.create({
            user_id,
            first_name,
            last_name,
            date_of_birth,
            gender,
            phone_number,
            address,
            specialization,
            availability,
            qualifications,
            bio,
            created_by,
        });

        res.status(201).json(newDoctor);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all doctors
const getAllDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.findAll();
        res.status(200).json(doctors);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a specific doctor by ID
const getDoctorById = async (req, res) => {
    try {
        const doctor = await Doctor.findByPk(req.params.id);
        if (doctor) {
            res.status(200).json(doctor);
        } else {
            res.status(404).json({ error: 'Doctor not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a doctor
const updateDoctor = async (req, res) => {
    try {
        const [updated] = await Doctor.update(req.body, {
            where: { doctor_id: req.params.id },
        });

        if (updated) {
            const updatedDoctor = await Doctor.findByPk(req.params.id);
            res.status(200).json(updatedDoctor);
        } else {
            res.status(404).json({ error: 'Doctor not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a doctor
const deleteDoctor = async (req, res) => {
    try {
        const deleted = await Doctor.destroy({
            where: { doctor_id: req.params.id },
        });

        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Doctor not found' });
        }
    } catch (error)        {
        res.status(500).json({ error: error.message });
    }
};

// Search for doctors
const searchDoctors = async (req, res) => {
    try {
        const doctors = await DoctorSearch.searchDoctors(req.query);
        res.status(200).json(doctors);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createDoctor,
    getAllDoctors,
    getDoctorById,
    updateDoctor,
    deleteDoctor,
    searchDoctors,
};
