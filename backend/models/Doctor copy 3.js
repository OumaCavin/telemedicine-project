// models/Doctor.js

module.exports = (sequelize, DataTypes) => {
    const Doctor = sequelize.define('Doctor', {
      doctor_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
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
        type: DataTypes.DATEONLY,
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
      specialization: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      availability: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      qualifications: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      bio: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
        allowNull: false
      },
      created_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      updated_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
      }
    }, {
      tableName: 'telemed_doctors',
      timestamps: false,
    });
  
    // Associations
    Doctor.associate = (models) => {
      // Doctor belongs to User (foreign key user_id)
      Doctor.belongsTo(models.User, { foreignKey: 'user_id' });
  
      // Doctor has many History entries
      Doctor.hasMany(models.History, { foreignKey: 'user_id' });
  
      // Doctor belongs to User for created_by and updated_by
      Doctor.belongsTo(models.User, { foreignKey: 'created_by', as: 'creator' });
      Doctor.belongsTo(models.User, { foreignKey: 'updated_by', as: 'updater' });
    };
  
    return Doctor;
  };
  