// models/EhrRecord.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Assumes sequelize instance is configured

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
                model: 'telemed_patients', 
                key: 'user_id',
            },
        },
        doctor_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'telemed_doctors', 
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
                model: 'telemed_users', // Assuming 'telemed_users' is the Users table
                key: 'user_id',
            },
        },
        updated_by: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'telemed_users', // Assuming 'telemed_users' is the Users table
                key: 'user_id',
            },
        },
    },
    {
        sequelize,
        modelName: 'EhrRecord',
        tableName: 'telemed_ehr_records',
        timestamps: true, // Sequelize will automatically handle created_at and updated_at
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
);

// Define associations (optional)
EhrRecord.associate = (models) => {
    // EhrRecord belongs to a Patient (patient_id)
    EhrRecord.belongsTo(models.Patient, { foreignKey: 'patient_id', as: 'patient' });

    // EhrRecord belongs to a Doctor (doctor_id)
    EhrRecord.belongsTo(models.Doctor, { foreignKey: 'doctor_id', as: 'doctor' });

    // EhrRecord is created by a User (created_by)
    EhrRecord.belongsTo(models.User, { foreignKey: 'created_by', as: 'createdBy' });

    // EhrRecord is updated by a User (updated_by)
    EhrRecord.belongsTo(models.User, { foreignKey: 'updated_by', as: 'updatedBy' });
};

module.exports = EhrRecord;
