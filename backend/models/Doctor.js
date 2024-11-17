const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Assumes sequelize instance is configured

class Doctor extends Model {}

Doctor.init(
  {
    doctor_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'telemed_users', // Ensure this table exists
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
    specialization: {
      type: DataTypes.STRING(100),
      allowNull: false,
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
    // created_at: {
    //   type: DataTypes.DATE,
    //   defaultValue: DataTypes.NOW,
    // },
    // updated_at: {
    //   type: DataTypes.DATE,
    //   defaultValue: DataTypes.NOW,
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
    modelName: 'Doctor',
    tableName: 'telemed_doctors',
    timestamps: true, // Disable automatic timestamps; use hooks if needed
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

// // Hook for updating `updated_at`
// Doctor.beforeUpdate((doctor, options) => {
//   doctor.updated_at = new Date();
// });

// Associations
Doctor.associate = (models) => {
  Doctor.belongsTo(models.User, { foreignKey: 'user_id' });
  Doctor.hasMany(models.History, { foreignKey: 'doctor_id' }); // Fix: 'doctor_id' instead of 'user_id'
  Doctor.belongsTo(models.User, { foreignKey: 'created_by', as: 'creator' });
  Doctor.belongsTo(models.User, { foreignKey: 'updated_by', as: 'updater' });
};

module.exports = Doctor;
