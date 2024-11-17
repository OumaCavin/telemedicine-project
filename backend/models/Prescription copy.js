// models/Prescription.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Import Sequelize instance

const Prescription = sequelize.define('Prescription', {
    prescription_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    ehr_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    patient_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    doctor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    appointment_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
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
}, {
    tableName: 'telemed_prescriptions',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

module.exports = Prescription;
