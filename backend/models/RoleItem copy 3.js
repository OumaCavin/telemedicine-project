// models/RoleItem.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Assumes sequelize instance is configured

class RoleItem extends Model {}

RoleItem.init(
    {
        role_item_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        role_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'telemed_roles',
                key: 'role_id',
            },
        },
        permission: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
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
        modelName: 'RoleItem',
        tableName: 'telemed_role_items',
        timestamps: true, // Use timestamps for created_at and updated_at
    }
);

module.exports = { RoleItem };
