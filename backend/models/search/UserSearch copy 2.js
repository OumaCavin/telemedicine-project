const User = require('../User');

class UserSearch {
    static async searchUsers(query) {
        const where = {};
        
        if (query.username) {
            where.username = {
                [Op.like]: `%${query.username}%`
            };
        }

        if (query.email) {
            where.email = {
                [Op.like]: `%${query.email}%`
            };
        }

        return await User.findAll({
            where: where,
            order: [['created_at', 'DESC']]
        });
    }
}

module.exports = UserSearch;
