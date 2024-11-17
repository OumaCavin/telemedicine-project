// models/Payment.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Assumes sequelize instance is configured

class Payment extends Model {}

Payment.init(
    {
        payment_id: {
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
        appointment_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'telemed_appointments',
                key: 'appointment_id',
            },
        },
        amount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        payment_date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        payment_method: {
            type: DataTypes.ENUM('credit_card', 'insurance', 'cash', 'debit_card', 'paypal', 'bank_transfer'),
            allowNull: false,
        },
        currency_code: {
            type: DataTypes.CHAR(3),
            allowNull: false,
            defaultValue: 'KES',
        },
        status: {
            type: DataTypes.ENUM('pending', 'completed', 'failed'),
            defaultValue: 'pending',
        },
        reference_number: {
            type: DataTypes.STRING(255),
            allowNull: true,
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
        modelName: 'Payment',
        tableName: 'telemed_payments',
        timestamps: true, // Use timestamps for created_at and updated_at
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
);
  // Associations
  Payment.associate = (models) => {
    // A Payment belongs to a Patient (user_id)
    Payment.belongsTo(models.Patient, { foreignKey: 'patient_id', as: 'patient' });

    // A Payment belongs to an Appointment (appointment_id)
    Payment.belongsTo(models.Appointment, { foreignKey: 'appointment_id', as: 'appointment' });

    // A Payment belongs to a User for created_by and updated_by
    Payment.belongsTo(models.User, { foreignKey: 'created_by', as: 'creator' });
    Payment.belongsTo(models.User, { foreignKey: 'updated_by', as: 'updater' });
  };
module.exports = Payment;
