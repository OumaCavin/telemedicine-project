// models/search/RoleItemSearch.js

const { Op } = require('sequelize');
const RoleItem = require('../RoleItem'); // Import the RoleItem model

// Role Item search model
class RoleItemSearch {
    static async searchRoleItems(queryParams) {
        try {
            const { role_id, permission, description } = queryParams;

            // Build the search criteria dynamically based on provided query parameters
            const searchCriteria = {};

            if (role_id) {
                searchCriteria.role_id = role_id; // Filter by role_id
            }

            if (permission) {
                searchCriteria.permission = { [Op.like]: `%${permission}%` }; // Filter by permission with partial match
            }

            if (description) {
                searchCriteria.description = { [Op.like]: `%${description}%` }; // Filter by description with partial match
            }

            // Query the role items based on the search criteria
            const roleItems = await RoleItem.findAll({
                where: searchCriteria,
            });

            return roleItems;
        } catch (error) {
            throw new Error(`Error while searching role items: ${error.message}`);
        }
    }
}

module.exports = RoleItemSearch;
