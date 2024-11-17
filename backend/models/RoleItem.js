// models/RoleItem.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Assumes sequelize instance is configured

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
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
);
  // Associations
  RoleItem.associate = (models) => {
    // A RoleItem belongs to a Role
    RoleItem.belongsTo(models.Role, { foreignKey: 'role_id' });

    // A RoleItem belongs to a User for created_by and updated_by
    RoleItem.belongsTo(models.User, { foreignKey: 'created_by', as: 'creator' });
    RoleItem.belongsTo(models.User, { foreignKey: 'updated_by', as: 'updater' });
  };

module.exports = RoleItem;
