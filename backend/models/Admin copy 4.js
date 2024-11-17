// models/Admin.js
module.exports = (sequelize, DataTypes) => {
    const Admin = sequelize.define('Admin', {
      admin_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
      created_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      updated_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false,
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
        allowNull: false,
      },
    }, {
      tableName: 'telemed_admins',
      timestamps: false,
    });
  
    Admin.associate = (models) => {
      // An Admin belongs to a User
      Admin.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  
      // An Admin tracks created_by and updated_by relationships
      Admin.belongsTo(models.User, { foreignKey: 'created_by', as: 'creator' });
      Admin.belongsTo(models.User, { foreignKey: 'updated_by', as: 'updater' });
    };
  
    return Admin;
  };
  
