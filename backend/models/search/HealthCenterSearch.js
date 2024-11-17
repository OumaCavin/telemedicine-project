// models/search/HealthCenterSearch.js

const { Op } = require('sequelize');
const HealthCenter = require('../HealthCenter'); // Import the HealthCenter model

// HealthCenter search model
class HealthCenterSearch {
    static async searchHealthCenters(queryParams) {
        try {
            const { name, location, type } = queryParams;

            // Build the search criteria dynamically based on provided query parameters
            const searchCriteria = {};

            if (name) {
                searchCriteria.name = { [Op.like]: `%${name}%` }; // Search by name using 'like'
            }

            if (type) {
                searchCriteria.type = type; // Filter by health center type (hospital, clinic, lab)
            }

            if (location) {
                // Filter by location if provided
                searchCriteria.location = {
                    [Op.intersects]: sequelize.fn('ST_GeomFromText', location),
                };
            }

            // Query health centers based on search criteria
            const healthCenters = await HealthCenter.findAll({
                where: searchCriteria,
            });

            return healthCenters;
        } catch (error) {
            throw new Error(`Error while searching health centers: ${error.message}`);
        }
    }
}

module.exports = HealthCenterSearch;
