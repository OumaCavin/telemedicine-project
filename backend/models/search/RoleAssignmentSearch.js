// models/search/RoleAssignmentSearch.js

const { Op } = require('sequelize');
const RoleAssignment = require('../RoleAssignment'); // Import the RoleAssignment model

// Role Assignment search model
class RoleAssignmentSearch {
    static async searchRoleAssignments(queryParams) {
        try {
            const { user_id, role_id, created_by } = queryParams;

            // Build the search criteria dynamically based on provided query parameters
            const searchCriteria = {};

            if (user_id) {
                searchCriteria.user_id = user_id; // Filter by user_id
            }

            if (role_id) {
                searchCriteria.role_id = role_id; // Filter by role_id
            }

            if (created_by) {
                searchCriteria.created_by = created_by; // Filter by created_by
            }

            // Query the role assignments based on the search criteria
            const roleAssignments = await RoleAssignment.findAll({
                where: searchCriteria,
            });

            return roleAssignments;
        } catch (error) {
            throw new Error(`Error while searching role assignments: ${error.message}`);
        }
    }
}

module.exports = RoleAssignmentSearch;
