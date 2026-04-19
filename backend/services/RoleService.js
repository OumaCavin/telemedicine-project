// services/RoleService.js
const RoleAssignment = require('../models/RoleAssignment');
const logger = require('../utils/logger');

class RoleService {
    static async getUserRole(userId) {
        try {
            const roleAssignment = await RoleAssignment.findOne({
                where: { user_id: userId },
                order: [['created_at', 'DESC']],
            });
            
            if (!roleAssignment) {
                return null;
            }
            
            return roleAssignment.role_id;
        } catch (error) {
            logger.error('Error getting user role:', error);
            throw new Error('Failed to get user role');
        }
    }
}

module.exports = RoleService;