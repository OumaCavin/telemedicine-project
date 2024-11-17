// models/RoleAssignment.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Assumes sequelize instance is configured

class RoleAssignment extends Model {}

RoleAssignment.init(
    {
        role_assignment_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'telemed_users',
                key: 'user_id',
            },
        },
        role_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'telemed_roles',
                key: 'role_id',
            },
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
        modelName: 'RoleAssignment',
        tableName: 'telemed_role_assignments',
        timestamps: true, // Use timestamps for created_at and updated_at
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
);
  // Associations
  RoleAssignment.associate = (models) => {
    // A RoleAssignment belongs to a User
    RoleAssignment.belongsTo(models.User, { foreignKey: 'user_id' });

    // A RoleAssignment belongs to a Role
    RoleAssignment.belongsTo(models.Role, { foreignKey: 'role_id' });

    // A RoleAssignment belongs to a User for created_by and updated_by
    RoleAssignment.belongsTo(models.User, { foreignKey: 'created_by', as: 'creator' });
    RoleAssignment.belongsTo(models.User, { foreignKey: 'updated_by', as: 'updater' });
  };
module.exports = RoleAssignment;
