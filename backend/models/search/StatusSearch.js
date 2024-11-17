// models/search/StatusSearch.js

const { Op } = require('sequelize');
const Status = require('../Status'); // Import the Status model

// Status search model
class StatusSearch {
    static async searchStatuses(queryParams) {
        try {
            const { status_name, description } = queryParams;

            // Build the search criteria dynamically based on provided query parameters
            const searchCriteria = {};

            if (status_name) {
                searchCriteria.status_name = { [Op.like]: `%${status_name}%` }; // Search for status_name with partial match
            }

            if (description) {
                searchCriteria.description = { [Op.like]: `%${description}%` }; // Search for description with partial match
            }

            // Query the statuses based on the search criteria
            const statuses = await Status.findAll({
                where: searchCriteria,
            });

            return statuses;
        } catch (error) {
            throw new Error(`Error while searching statuses: ${error.message}`);
        }
    }
}

module.exports = StatusSearch;
