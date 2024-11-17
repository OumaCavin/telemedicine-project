// models/search/MessageSearch.js

const { Op } = require('sequelize');
const Message = require('../Message'); // Import the Message model

// Message search model
class MessageSearch {
    static async searchMessages(queryParams) {
        try {
            const { user_id, is_read, priority, created_at } = queryParams;

            // Build the search criteria dynamically based on provided query parameters
            const searchCriteria = {};

            if (user_id) {
                searchCriteria.user_id = user_id;
            }

            if (is_read !== undefined) {
                searchCriteria.is_read = is_read;
            }

            if (priority) {
                searchCriteria.priority = priority;
            }

            if (created_at) {
                searchCriteria.created_at = {
                    [Op.gte]: new Date(created_at), // Filter by created date
                };
            }

            // Query messages based on search criteria
            const messages = await Message.findAll({
                where: searchCriteria,
            });

            return messages;
        } catch (error) {
            throw new Error(`Error while searching messages: ${error.message}`);
        }
    }
}

module.exports = MessageSearch;
