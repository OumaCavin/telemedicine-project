// models/search/PatientSearch.js

const { Op } = require('sequelize');
const Patient = require('../Patient'); // Import the Patient model

// Patient search model
class PatientSearch {
    static async searchPatients(queryParams) {
        try {
            const { first_name, last_name, gender, phone_number, address } = queryParams;

            // Build the search criteria dynamically based on provided query parameters
            const searchCriteria = {};

            if (first_name) {
                searchCriteria.first_name = { [Op.like]: `%${first_name}%` };
            }

            if (last_name) {
                searchCriteria.last_name = { [Op.like]: `%${last_name}%` };
            }

            if (gender) {
                searchCriteria.gender = gender;
            }

            if (phone_number) {
                searchCriteria.phone_number = { [Op.like]: `%${phone_number}%` };
            }

            if (address) {
                searchCriteria.address = { [Op.like]: `%${address}%` };
            }

            // Query patients based on search criteria
            const patients = await Patient.findAll({
                where: searchCriteria,
            });

            return patients;
        } catch (error) {
            throw new Error(`Error while searching patients: ${error.message}`);
        }
    }
}

module.exports = PatientSearch;
