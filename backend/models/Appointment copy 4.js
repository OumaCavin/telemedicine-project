// models/Appointment.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Assumes sequelize instance is configured

class Appointment extends Model {}

Appointment.init(
    {
        appointment_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        patient_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'telemed_users',
                key: 'user_id',
            },
        },
        doctor_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'telemed_users',
                key: 'user_id',
            },
        },
        appointment_time: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM('scheduled', 'canceled', 'completed'),
            defaultValue: 'scheduled',
        },
        appointment_type: {
            type: DataTypes.ENUM('physical', 'virtual'),
            defaultValue: 'physical',
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
        modelName: 'Appointment',
        tableName: 'telemed_appointments',
        timestamps: false,
    }
);

module.exports = { Appointment };
