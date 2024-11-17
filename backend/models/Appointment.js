// models/Appointment.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db'); 

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
                model: 'telemed_patients',
                key: 'user_id',
            },
        },
        doctor_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'telemed_doctors', 
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
        // created_at: {
        //     type: DataTypes.TIMESTAMP,
        //     defaultValue: DataTypes.NOW,
        // },
        // updated_at: {
        //     type: DataTypes.TIMESTAMP,
        //     defaultValue: DataTypes.NOW,
        //     onUpdate: DataTypes.NOW,
        // },
        created_by: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'telemed_users', // Assuming `telemed_users` is the name of the Users table
                key: 'user_id',
            },
        },
        updated_by: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'telemed_users', // Assuming `telemed_users` is the name of the Users table
                key: 'user_id',
            },
        },
    },
    {
        sequelize,
        modelName: 'Appointment',
        tableName: 'telemed_appointments',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
);

// Define associations
Appointment.associate = (models) => {
    // Appointment belongs to a Patient (one-to-one relationship)
    Appointment.belongsTo(models.Patient, { foreignKey: 'patient_id', as: 'patient' });
    
    // Appointment belongs to a Doctor (one-to-one relationship)
    Appointment.belongsTo(models.Doctor, { foreignKey: 'doctor_id', as: 'doctor' });

    // Appointment belongs to a User (for created_by relationship)
    Appointment.belongsTo(models.User, { foreignKey: 'created_by', as: 'creator' });

    // Appointment belongs to a User (for updated_by relationship)
    Appointment.belongsTo(models.User, { foreignKey: 'updated_by', as: 'updater' });
    // An Appointment has many Prescriptions
    Appointment.hasMany(models.Prescription, { foreignKey: 'appointment_id', as: 'prescriptions' });
};

module.exports = Appointment;
