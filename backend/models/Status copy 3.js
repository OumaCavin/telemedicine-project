// models/Status.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Assumes sequelize instance is configured

class Status extends Model {}

Status.init(
    {
        status_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        status_name: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
        },
        description: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        created_by: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'telemed_users',
                key: 'user_id',
            },
        },
        updated_by: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'telemed_users',
                key: 'user_id',
            },
        },
        created_at: {
            type: DataTypes.TIMESTAMP,
            defaultValue: DataTypes.NOW,
        },
        updated_at: {
            type: DataTypes.TIMESTAMP,
            defaultValue: DataTypes.NOW,
            onUpdate: DataTypes.NOW,
        },
    },
    {
        sequelize,
        modelName: 'Status',
        tableName: 'telemed_status',
        timestamps: true, // Use timestamps for created_at and updated_at
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
);

module.exports = { Status };
