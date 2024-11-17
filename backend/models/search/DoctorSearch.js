// models/search/DoctorSearch.js

const { Op } = require('sequelize');
const Doctor = require('../Doctor'); // Import the Doctor model

// Doctor search model
class DoctorSearch {
    static async searchDoctors(queryParams) {
        try {
            const { first_name, last_name, specialization, phone_number, address, availability } = queryParams;

            // Build the search criteria dynamically based on provided query parameters
            const searchCriteria = {};

            if (first_name) {
                searchCriteria.first_name = { [Op.like]: `%${first_name}%` };
            }

            if (last_name) {
                searchCriteria.last_name = { [Op.like]: `%${last_name}%` };
            }

            if (specialization) {
                searchCriteria.specialization = { [Op.like]: `%${specialization}%` };
            }

            if (phone_number) {
                searchCriteria.phone_number = { [Op.like]: `%${phone_number}%` };
            }

            if (address) {
                searchCriteria.address = { [Op.like]: `%${address}%` };
            }

            if (availability !== undefined) {
                searchCriteria.availability = availability === 'true' ? true : false;
            }

            // Query doctors based on search criteria
            const doctors = await Doctor.findAll({
                where: searchCriteria,
            });

            return doctors;
        } catch (error) {
            throw new Error(`Error while searching doctors: ${error.message}`);
        }
    }
}

module.exports = DoctorSearch;
