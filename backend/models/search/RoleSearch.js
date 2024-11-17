// models/search/RoleSearch.js

const { Op } = require('sequelize');
const Role = require('../Role'); // Import the Role model

// Role search model
class RoleSearch {
    static async searchRoles(queryParams) {
        try {
            const { role_name, description, created_by } = queryParams;

            // Build the search criteria dynamically based on provided query parameters
            const searchCriteria = {};

            if (role_name) {
                searchCriteria.role_name = { [Op.like]: `%${role_name}%` }; // Filter by role_name (like search)
            }

            if (description) {
                searchCriteria.description = { [Op.like]: `%${description}%` }; // Filter by description (like search)
            }

            if (created_by) {
                searchCriteria.created_by = created_by; // Filter by created_by
            }

            // Query the roles based on the search criteria
            const roles = await Role.findAll({
                where: searchCriteria,
            });

            return roles;
        } catch (error) {
            throw new Error(`Error while searching roles: ${error.message}`);
        }
    }
}

module.exports = RoleSearch;
