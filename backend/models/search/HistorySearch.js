// models/search/HistorySearch.js

const { Op } = require('sequelize');
const History = require('../History'); // Import the History model

// History search model
class HistorySearch {
    static async searchHistory(queryParams) {
        try {
            const { user_id, status_id, action, action_time_start, action_time_end } = queryParams;

            // Build the search criteria dynamically based on provided query parameters
            const searchCriteria = {};

            if (user_id) {
                searchCriteria.user_id = user_id; // Filter by user_id
            }

            if (status_id) {
                searchCriteria.status_id = status_id; // Filter by status_id
            }

            if (action) {
                searchCriteria.action = { [Op.like]: `%${action}%` }; // Filter by action (like search)
            }

            if (action_time_start && action_time_end) {
                searchCriteria.action_time = {
                    [Op.between]: [action_time_start, action_time_end], // Filter by action time range
                };
            }

            // Query the history based on the search criteria
            const historyRecords = await History.findAll({
                where: searchCriteria,
            });

            return historyRecords;
        } catch (error) {
            throw new Error(`Error while searching history: ${error.message}`);
        }
    }
}

module.exports = HistorySearch;
