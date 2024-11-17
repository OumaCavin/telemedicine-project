// models/search/AdminSearch.js

const { Op } = require('sequelize');
const Admin = require('../Admin'); // Importing the Admin model

// Admin search model
class AdminSearch {
    static async searchAdmins(queryParams) {
        const { page = 1, limit = 10 } = queryParams;
        const offset = (page - 1) * limit;
        try {
            const { first_name, last_name, gender, phone_number } = queryParams;

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

            // Query admins based on search criteria
            const admins = await Admin.findAll({
                where: searchCriteria,
                order: [[sortBy, sortOrder]],
                offset,
                limit
            });

            return admins;
        } catch (error) {
            throw new Error(`Error while searching admins: ${error.message}`);
        }
    }
}

module.exports = AdminSearch;
