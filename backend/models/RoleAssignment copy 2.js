// models/RoleAssignment.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const RoleAssignment = sequelize.define('RoleAssignment', {
    role_assignment_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'telemed_users',
            key: 'user_id',
        },
        onDelete: 'CASCADE',
    },
    role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'telemed_roles',
            key: 'role_id',
        },
        onDelete: 'CASCADE',
    },
    created_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'telemed_users',
            key: 'user_id',
        },
        onDelete: 'SET NULL',
    },
    updated_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'telemed_users',
            key: 'user_id',
        },
        onDelete: 'SET NULL',
    },
}, {
    tableName: 'telemed_role_assignments',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
});

module.exports = RoleAssignment;
