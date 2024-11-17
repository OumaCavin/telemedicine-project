// models/search/EhrRecordSearch.js

const { Op } = require('sequelize');
const EhrRecord = require('../EhrRecord'); // Import the EhrRecord model

// EHR Record search model
class EhrRecordSearch {
    static async searchEhrRecords(queryParams) {
        try {
            const { patient_id, doctor_id, record_date, visit_date, encounter_type } = queryParams;

            // Build the search criteria dynamically based on provided query parameters
            const searchCriteria = {};

            if (patient_id) {
                searchCriteria.patient_id = patient_id; // Filter by patient_id
            }

            if (doctor_id) {
                searchCriteria.doctor_id = doctor_id; // Filter by doctor_id
            }

            if (record_date) {
                searchCriteria.record_date = { [Op.gte]: new Date(record_date) }; // Filter by record date (greater than or equal)
            }

            if (visit_date) {
                searchCriteria.visit_date = { [Op.gte]: new Date(visit_date) }; // Filter by visit date (greater than or equal)
            }

            if (encounter_type) {
                searchCriteria.encounter_type = encounter_type; // Filter by encounter type
            }

            // Query the EHR records based on the search criteria
            const ehrRecords = await EhrRecord.findAll({
                where: searchCriteria,
            });

            return ehrRecords;
        } catch (error) {
            throw new Error(`Error while searching EHR records: ${error.message}`);
        }
    }
}

module.exports = EhrRecordSearch;
