// models/AuditLog.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db'); 

class AuditLog extends Model {}

AuditLog.init(
    {
        log_id: {
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
        action: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        previous_state: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        current_state: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        affected_table: {
            type: DataTypes.STRING(255),
            allowNull: false,
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
    },
    {
        sequelize,
        modelName: 'AuditLog',
        tableName: 'telemed_audit_logs',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
);

// Define associations (optional)
AuditLog.associate = (models) => {
    // AuditLog belongs to a User (for user_id)
    AuditLog.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    // AuditLog also belongs to a User (for created_by)
    AuditLog.belongsTo(models.User, { foreignKey: 'created_by', as: 'createdBy' });
};

module.exports = AuditLog;
