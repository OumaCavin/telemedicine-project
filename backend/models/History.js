// models/History.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Assumes sequelize instance is configured

class History extends Model {}

History.init(
    {
        history_id: {
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
        status_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'telemed_status',
                key: 'status_id',
            },
        },
        action: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        action_time: {
            type: DataTypes.TIMESTAMP,
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
    },
    {
        sequelize,
        modelName: 'History',
        tableName: 'telemed_history',
        timestamps: true, // Disable auto timestamps since we have explicit `action_time`
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
);
  // Associations
  History.associate = (models) => {
    // History belongs to User (foreign key user_id)
    History.belongsTo(models.User, { foreignKey: 'user_id' });

    // History belongs to Status (foreign key status_id)
    History.belongsTo(models.Status, { foreignKey: 'status_id' });

    // History belongs to User for created_by
    History.belongsTo(models.User, { foreignKey: 'created_by', as: 'creator' });
  };

module.exports =  History;
