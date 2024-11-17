const sequelize = require('../config/db');
const { QueryTypes } = require('sequelize');
const Status = require('../models/Status'); // Model for telemed_status table

class HistoryService {
    static async logHistory({ user_id, action, status_id, action_time, created_by }) {
        try {
            // Decode status_id to get full meaning (if needed)
            const status = await Status.findOne({
                where: { status_id },
                attributes: ['status_description'],
            });

            const statusDescription = status ? status.status_description : null;

            // Insert into teled_history
            await sequelize.query(
                `INSERT INTO teled_history (user_id, action, status_id, action_time, created_by) VALUES (?, ?, ?, ?, ?)`,
                {
                    replacements: [user_id, action, status_id, action_time, created_by],
                    type: QueryTypes.INSERT,
                }
            );

            return { success: true };
        } catch (error) {
            console.error('Error logging history:', error.message);
            throw error;
        }
    }
}

module.exports = HistoryService;
