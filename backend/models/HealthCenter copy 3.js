// models/HealthCenter.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Assumes sequelize instance is configured

class HealthCenter extends Model {}

HealthCenter.init(
    {
        center_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        location: {
            type: DataTypes.GEOMETRY('POINT'), // Using POINT geometry for spatial data
            allowNull: true,
        },
        contact_info: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        type: {
            type: DataTypes.ENUM('hospital', 'clinic', 'lab'),
            allowNull: false,
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
    },
    {
        sequelize,
        modelName: 'HealthCenter',
        tableName: 'telemed_health_centers',
        timestamps: false,
    }
);

module.exports = { HealthCenter };
