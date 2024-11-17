// models/History.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Assumes sequelize instance is configured

class History extends Model {}

History.init(
    {
        history_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'telemed_users',
                key: 'user_id',
            },
        },
        status_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'telemed_status',
                key: 'status_id',
            },
        },
        action: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        action_time: {
            type: DataTypes.TIMESTAMP,
            defaultValue: DataTypes.NOW,
        },
        created_by: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'telemed_users',
                key: 'user_id',
            },
        },
    },
    {
        sequelize,
        modelName: 'History',
        tableName: 'telemed_history',
        timestamps: false, // Disable auto timestamps since we have explicit `action_time`
    }
);

module.exports = { History };
