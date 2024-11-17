// controllers/AppointmentController.js

const { Appointment } = require('../models/Appointment');
const AppointmentSearch = require('../models/search/AppointmentSearch');

// Create a new appointment
const createAppointment = async (req, res) => {
    try {
        const { patient_id, doctor_id, appointment_time, status, appointment_type, created_by } = req.body;

        const newAppointment = await Appointment.create({
            patient_id,
            doctor_id,
            appointment_time,
            status: status || 'scheduled',
            appointment_type: appointment_type || 'physical',
            created_by,
        });

        res.status(201).json(newAppointment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all appointments
const getAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.findAll();
        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a specific appointment by ID
const getAppointmentById = async (req, res) => {
    try {
        const appointment = await Appointment.findByPk(req.params.id);
        if (appointment) {
            res.status(200).json(appointment);
        } else {
            res.status(404).json({ error: 'Appointment not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update an appointment
const updateAppointment = async (req, res) => {
    try {
        const [updated] = await Appointment.update(req.body, {
            where: { appointment_id: req.params.id },
        });

        if (updated) {
            const updatedAppointment = await Appointment.findByPk(req.params.id);
            res.status(200).json(updatedAppointment);
        } else {
            res.status(404).json({ error: 'Appointment not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete an appointment
const deleteAppointment = async (req, res) => {
    try {
        const deleted = await Appointment.destroy({
            where: { appointment_id: req.params.id },
        });

        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Appointment not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Search for appointments
const searchAppointments = async (req, res) => {
    try {
        const appointments = await AppointmentSearch.searchAppointments(req.query);
        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createAppointment,
    getAllAppointments,
    getAppointmentById,
    updateAppointment,
    deleteAppointment,
    searchAppointments,
};
