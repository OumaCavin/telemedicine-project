// models/Patient.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Assumes sequelize instance is configured

class Patient extends Model {}

Patient.init(
    {
        patient_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'telemed_users',
                key: 'user_id',
            },
        },
        medical_history: {
            type: DataTypes.JSONB, // JSONB is used for storing sensitive medical data, can be encrypted as necessary
            allowNull: true,
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
        modelName: 'Patient',
        tableName: 'telemed_patients',
        timestamps: false,
    }
);

module.exports = { Patient };
