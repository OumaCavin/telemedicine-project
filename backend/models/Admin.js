// models/Admin.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const HistoryService = require('../services/HistoryService'); // Service to handle history logging

class Admin extends Model {}

Admin.init(
    {
        admin_id: {
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
        first_name: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        last_name: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        date_of_birth: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        gender: {
            type: DataTypes.ENUM('male', 'female', 'other'),
            allowNull: false,
        },
        phone_number: {
            type: DataTypes.STRING(15),
            allowNull: true,
        },
        address: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        created_by: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        updated_by: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: 'Admin',
        tableName: 'telemed_admins',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
);

// Hooks for setting created_by and updated_by
Admin.addHook('beforeCreate', async (admin, options) => {
    const userId = options.user.id; // Extract user ID from options
    admin.created_by = userId;

    // Log to history table
    await HistoryService.logHistory({
        user_id: userId,
        action: 'CREATE_ADMIN',
        status_id: 1, // Example status ID for created
        action_time: new Date(),
        created_by: userId,
    });
});

Admin.addHook('beforeUpdate', async (admin, options) => {
    const userId = options.user.id; // Extract user ID from options
    admin.updated_by = userId;

    // Log to history table
    await HistoryService.logHistory({
        user_id: userId,
        action: 'UPDATE_ADMIN',
        status_id: 2, // Example status ID for updated
        action_time: new Date(),
        created_by: userId,
    });
});

module.exports = Admin;
