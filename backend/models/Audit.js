// models/Audit.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Assumes sequelize instance is configured

class Audit extends Model {}

Audit.init(
    {
        audit_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        action: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'telemed_users', 
                key: 'user_id',
            },
        },
        timestamp: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize,
        modelName: 'Audit',
        tableName: 'Audit',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
);

Audit.associate = (models) => {
    // Audit belongs to a User (for user_id)
    Audit.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
};

module.exports = Audit;
