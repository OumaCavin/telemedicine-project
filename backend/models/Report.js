// models/Report.js

const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

class Report extends Model {}

Report.init(
    {
        report_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        report_type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        data: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        generated_by: {
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
        modelName: 'Report',
        tableName: 'telemed_reports',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
);

// Define associations
Report.associate = (models) => {
    Report.belongsTo(models.User, { foreignKey: 'generated_by', as: 'generator' });
};

module.exports = Report;
