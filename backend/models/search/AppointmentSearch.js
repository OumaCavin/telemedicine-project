// models/search/AppointmentSearch.js

const { Op } = require('sequelize');
const Appointment = require('../Appointment'); // Import the Appointment model

// Appointment search model
class AppointmentSearch {
    static async searchAppointments(queryParams) {
        try {
            const { patient_id, doctor_id, status, appointment_time, appointment_type } = queryParams;

            // Build the search criteria dynamically based on provided query parameters
            const searchCriteria = {};

            if (patient_id) {
                searchCriteria.patient_id = patient_id;
            }

            if (doctor_id) {
                searchCriteria.doctor_id = doctor_id;
            }

            if (status) {
                searchCriteria.status = status;
            }

            if (appointment_time) {
                searchCriteria.appointment_time = {
                    [Op.gte]: new Date(appointment_time), // Filter by appointment time
                };
            }

            if (appointment_type) {
                searchCriteria.appointment_type = appointment_type;
            }

            // Query appointments based on search criteria
            const appointments = await Appointment.findAll({
                where: searchCriteria,
            });

            return appointments;
        } catch (error) {
            throw new Error(`Error while searching appointments: ${error.message}`);
        }
    }
}

module.exports = AppointmentSearch;
