const Doctor = require('../models/Doctor');

class DoctorController {
    // Retrieve the doctor's profile
    async getProfile(req, res) {
        const doctorId = req.user.user_id; // Assumes user ID is stored in the token

        try {
            const doctor = await Doctor.findOne({ where: { user_id: doctorId } }); // Sequelize syntax
            if (!doctor) return res.status(404).json({ error: 'Doctor not found' });

            res.status(200).json({ doctor });
        } catch (error) {
            res.status(500).json({ error: 'Failed to retrieve doctor profile', details: error.message });
        }
    }

    // Get all doctors
    async getAllDoctors(req, res) {
        try {
            const doctors = await Doctor.findAll();
            res.status(200).json({ doctors });
        } catch (error) {
            res.status(500).json({ error: 'Failed to retrieve doctors', details: error.message });
        }
    }
    
    async getDoctorById(req, res) {
        try {
            const doctor = await Doctor.findByPk(req.params.doctor_id);
            if (!doctor) return res.status(404).json({ message: 'Doctor not found' });

            res.status(200).json({ doctor });
        } catch (error) {
            res.status(500).json({ error: 'Failed to retrieve doctor', details: error.message });
        }
    }
    
    // Update the doctor's availability schedule
    async updateSchedule(req, res) {
        const doctorId = req.user.user_id; // Assumes user ID is stored in the token
        const { availability } = req.body;

        try {
            const doctor = await Doctor.findOne({ where: { user_id: doctorId } });
            if (!doctor) return res.status(404).json({ error: 'Doctor not found' });

            doctor.availability = availability;
            await doctor.save();

            res.status(200).json({ message: 'Doctor schedule updated', doctor });
        } catch (error) {
            res.status(500).json({ error: 'Failed to update doctor schedule', details: error.message });
        }
    }

    // Add a new doctor profile
    async createDoctor(req, res) {
        const { user_id, first_name, last_name, date_of_birth, gender, phone_number, address, specialization, qualifications, bio } = req.body;

        try {
            const newDoctor = await Doctor.create({
                user_id,
                first_name,
                last_name,
                date_of_birth,
                gender,
                phone_number,
                address,
                specialization,
                qualifications,
                bio,
            });

            res.status(201).json({ message: 'Doctor profile created', newDoctor });
        } catch (error) {
            res.status(500).json({ error: 'Failed to create doctor profile', details: error.message });
        }
    }
    async updateDoctor(req, res) {
        try {
            const doctor = await Doctor.findByPk(req.params.doctor_id);
            if (!doctor) return res.status(404).json({ message: 'Doctor not found' });

            const updatedDoctor = await doctor.update(req.body);
            res.status(200).json({ message: 'Doctor updated successfully', updatedDoctor });
        } catch (error) {
            res.status(500).json({ error: 'Failed to update doctor', details: error.message });
        }
    }

    // Delete a doctor's profile
    async deleteDoctor(req, res) {
        const doctorId = req.params.doctor_id;

        try {
            const doctor = await Doctor.findOne({ where: { doctor_id: doctorId } });
            if (!doctor) return res.status(404).json({ error: 'Doctor not found' });

            await doctor.destroy();
            res.status(200).json({ message: 'Doctor profile deleted' });
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete doctor profile', details: error.message });
        }
    }


}

module.exports = new DoctorController();
