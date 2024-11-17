// models/Admin.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db'); 
class Admin extends Model {}

Admin.init(
    {
        admin_id: {
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
        // created_at: {
        //     type: DataTypes.TIMESTAMP,
        //     defaultValue: DataTypes.NOW,
        // },
        // updated_at: {
        //     type: DataTypes.TIMESTAMP,
        //     defaultValue: DataTypes.NOW,
        //     onUpdate: DataTypes.NOW,  
        // },
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
        modelName: 'Admin',
        tableName: 'telemed_admins',
        timestamps: true, // Set to true if Sequelize should handle timestamps
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
);

// Define associations
Admin.associate = (models) => {
    // Admin belongs to a User (one-to-one relationship)
    Admin.belongsTo(models.User, { foreignKey: 'user_id' });
    // Admin belongs to a User (for created_by relationship)
    Admin.belongsTo(models.User, { foreignKey: 'created_by', as: 'creator' });
    // Admin belongs to a User (for updated_by relationship)
    Admin.belongsTo(models.User, { foreignKey: 'updated_by', as: 'updater' });
};

module.exports = Admin;
