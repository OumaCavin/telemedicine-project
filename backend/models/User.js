// models/User.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db'); 

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
        timestamps: true, 
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
);


User.associate = (models) => {
    // Associations for the User model
    User.belongsTo(models.RoleAssignment, { foreignKey: 'role_assignment_id' }); 
    User.hasMany(models.Appointment, { foreignKey: 'user_id' }); 
    User.hasMany(models.Message, { foreignKey: 'user_id' }); 
    User.belongsTo(models.User, { foreignKey: 'created_by', as: 'creator' }); 
    User.belongsTo(models.User, { foreignKey: 'updated_by', as: 'updater' }); 
};

module.exports = User;
