// models/search/AuditLogSearch.js

const { Op } = require('sequelize');
const AuditLog = require('../AuditLog'); // Import the AuditLog model

// Audit log search model
class AuditLogSearch {
    static async searchAuditLogs(queryParams) {
        try {
            const { user_id, action, affected_table, start_date, end_date } = queryParams;

            // Build the search criteria dynamically based on provided query parameters
            const searchCriteria = {};

            if (user_id) {
                searchCriteria.user_id = user_id;
            }

            if (action) {
                searchCriteria.action = { [Op.like]: `%${action}%` }; // Search for action with partial match
            }

            if (affected_table) {
                searchCriteria.affected_table = { [Op.like]: `%${affected_table}%` }; // Search for affected table with partial match
            }

            if (start_date && end_date) {
                searchCriteria.created_at = {
                    [Op.between]: [new Date(start_date), new Date(end_date)], // Filter by date range
                };
            }

            // Query the audit logs based on the search criteria
            const auditLogs = await AuditLog.findAll({
                where: searchCriteria,
            });

            return auditLogs;
        } catch (error) {
            throw new Error(`Error while searching audit logs: ${error.message}`);
        }
    }
}

module.exports = AuditLogSearch;
