// models/EhrRecord.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Assumes sequelize instance is configured

class EhrRecord extends Model {}

EhrRecord.init(
    {
        ehr_record_id: {
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
            allowNull: true,
            references: {
                model: 'telemed_users',
                key: 'user_id',
            },
        },
        record_date: {
            type: DataTypes.TIMESTAMP,
            defaultValue: DataTypes.NOW,
        },
        medical_conditions: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        allergies: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        medications: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        visit_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        diagnosis: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        treatment: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        encounter_type: {
            type: DataTypes.ENUM('in-person', 'telehealth-visits'),
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
    },
    {
        sequelize,
        modelName: 'EhrRecord',
        tableName: 'telemed_ehr_records',
        timestamps: true, // Use timestamps for created_at and updated_at
    }
);

module.exports = { EhrRecord };
