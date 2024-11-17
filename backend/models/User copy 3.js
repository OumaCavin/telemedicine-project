// models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Import Sequelize instance

const User = sequelize.define('User', {
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
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
}, {
    tableName: 'telemed_users',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});


// // Associations can be defined here, if needed
// User.associate = (models) => {
//     User.belongsTo(models.User, { as: 'creator', foreignKey: 'created_by' });
//     User.belongsTo(models.User, { as: 'updater', foreignKey: 'updated_by' });
// };

module.exports = User;
