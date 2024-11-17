// models/Doctor.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Ensure this exports a Sequelize instance

const Doctor = sequelize.define('Doctor', {
    doctor_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    specialization: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    availability: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
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
        type: DataTypes.DATEONLY,
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
    qualifications: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    bio: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
}, {
    tableName: 'telemed_doctors',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

module.exports = Doctor;
