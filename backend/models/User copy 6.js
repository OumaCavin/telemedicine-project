// models/User.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Sequelize instance

class User extends Model {}

User.init(
    {
        user_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
        },
        password_hash: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                len: [8, 255],
            },
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        updated_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
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
        modelName: 'User',
        tableName: 'telemed_users',
        timestamps: true, // Set to true if Sequelize should handle timestamps
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
);

// // Hook for updating `updated_at` field
// User.beforeUpdate((user, options) => {
//     user.updated_at = new Date();
// });

// Define associations here
User.associate = (models) => {
    // Associations for the User model
    User.belongsTo(models.RoleAssignment, { foreignKey: 'role_assignment_id' }); // User belongs to RoleAssignment (foreignKey: role_id)
    User.hasMany(models.Appointment, { foreignKey: 'user_id' }); // One User can have many Appointments
    User.hasMany(models.Message, { foreignKey: 'user_id' }); // One User can have many Messages
    User.belongsTo(models.User, { foreignKey: 'created_by', as: 'creator' }); // One User can be the creator of another User
    User.belongsTo(models.User, { foreignKey: 'updated_by', as: 'updater' }); // One User can be the updater of another User
};

module.exports = User;
