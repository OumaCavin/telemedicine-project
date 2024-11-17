// models/Prescription.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Assumes sequelize instance is configured

class Prescription extends Model {}

Prescription.init(
    {
        prescription_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        ehr_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'telemed_ehr_records',
                key: 'ehr_record_id',
            },
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
        appointment_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'telemed_appointments',
                key: 'appointment_id',
            },
        },
        medication_name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        dosage: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        frequency: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        medication: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        dosage_instructions: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        prescribed_date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        refill_date: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        status: {
            type: DataTypes.ENUM('active', 'completed', 'canceled'),
            defaultValue: 'active',
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
        modelName: 'Prescription',
        tableName: 'telemed_prescriptions',
        timestamps: false,
    }
);

module.exports = { Prescription };
