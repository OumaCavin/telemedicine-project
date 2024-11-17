// models/search/PrescriptionSearch.js

const { Op } = require('sequelize');
const Prescription = require('../Prescription'); // Import the Prescription model

// Prescription search model
class PrescriptionSearch {
    static async searchPrescriptions(queryParams) {
        try {
            const { patient_id, doctor_id, status, medication_name, prescribed_date } = queryParams;

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

            if (medication_name) {
                searchCriteria.medication_name = {
                    [Op.like]: `%${medication_name}%`, // Partial match for medication name
                };
            }

            if (prescribed_date) {
                searchCriteria.prescribed_date = {
                    [Op.gte]: new Date(prescribed_date), // Filter by prescribed date
                };
            }

            // Query prescriptions based on search criteria
            const prescriptions = await Prescription.findAll({
                where: searchCriteria,
            });

            return prescriptions;
        } catch (error) {
            throw new Error(`Error while searching prescriptions: ${error.message}`);
        }
    }
}

module.exports = PrescriptionSearch;
