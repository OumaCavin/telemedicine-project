// models/Message.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db'); 

class Message extends Model {}

Message.init(
    {
        message_id: {
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
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        is_read: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        priority: {
            type: DataTypes.ENUM('low', 'medium', 'high'),
            allowNull: true,
        },
        // created_at: {
        //     type: DataTypes.TIMESTAMP,
        //     defaultValue: DataTypes.NOW,
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
        modelName: 'Message',
        tableName: 'telemed_messages',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
);
    // Associations
    Message.associate = (models) => {
        // A Message belongs to a User
        Message.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    
        // A Message tracks created_by and updated_by relationships
        Message.belongsTo(models.User, { foreignKey: 'created_by', as: 'creator' });
        Message.belongsTo(models.User, { foreignKey: 'updated_by', as: 'updater' });
      };
module.exports =  Message;
