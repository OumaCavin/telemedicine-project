// models/Role.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Assumes sequelize instance is configured

class Role extends Model {}

Role.init(
    {
        role_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        role_name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
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
        modelName: 'Role',
        tableName: 'telemed_roles',
        timestamps: true, // Use timestamps for created_at and updated_at
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
);
  // Associations
  Role.associate = (models) => {
    // A Role belongs to a User (for created_by and updated_by)
    Role.belongsTo(models.User, { foreignKey: 'created_by', as: 'creator' });
    Role.belongsTo(models.User, { foreignKey: 'updated_by', as: 'updater' });

    // A Role has many RoleAssignments
    Role.hasMany(models.RoleAssignment, { foreignKey: 'role_id' });
  };
module.exports = Role;
