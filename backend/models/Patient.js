// models/Patient.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Assumes sequelize instance is configured

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
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
);
    // Associations
    Patient.associate = (models) => {
        // A Patient belongs to a User
        Patient.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    
        // A Patient has many Appointments
        Patient.hasMany(models.Appointment, { foreignKey: 'appointment_id', as: 'appointments' });
    
        // A Patient has many Prescriptions
        Patient.hasMany(models.Prescription, { foreignKey: 'prescription_id', as: 'prescriptions' });
    
        // A Patient tracks created_by and updated_by relationships
        Patient.belongsTo(models.User, { foreignKey: 'created_by', as: 'creator' });
        Patient.belongsTo(models.User, { foreignKey: 'updated_by', as: 'updater' });
      };
    
module.exports =  Patient;
