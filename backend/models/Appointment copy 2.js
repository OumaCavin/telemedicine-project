// models/Appointment.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Import Sequelize instance

const Appointment = sequelize.define('Appointment', {
    appointment_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    patient_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    doctor_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
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
    appointment_duration: {
        type: DataTypes.INTEGER,
        allowNull: true, // Specify the unit (e.g., minutes) in the app layer
    },
}, {
    tableName: 'telemed_appointments',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

module.exports = Appointment;
