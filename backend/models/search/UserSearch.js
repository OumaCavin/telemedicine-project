// models/search/UserSearch.js

const { Op } = require('sequelize');
const User = require('../User'); // Importing the User model

// User search model
class UserSearch {
    static async searchUsers(queryParams) {
        try {
            const { username, email, is_active } = queryParams;

            // Build the search criteria dynamically based on provided query parameters
            const searchCriteria = {};

            if (username) {
                searchCriteria.username = { [Op.like]: `%${username}%` };
            }

            if (email) {
                searchCriteria.email = { [Op.like]: `%${email}%` };
            }

            if (is_active !== undefined) {
                searchCriteria.is_active = is_active === 'true'; // Converts string to boolean
            }

            // Query users based on search criteria
            const users = await User.findAll({
                where: searchCriteria,
            });

            return users;
        } catch (error) {
            throw new Error(`Error while searching users: ${error.message}`);
        }
    }
}

module.exports = UserSearch;
