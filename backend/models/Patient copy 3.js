module.exports = (sequelize, DataTypes) => {
    const Patient = sequelize.define('Patient', {
      patient_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      medical_history: {
        type: DataTypes.JSON,
        allowNull: true,
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
      tableName: 'telemed_patients',
      timestamps: false,
    });
  
    // Associations
    Patient.associate = (models) => {
      // A Patient belongs to a User
      Patient.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  
      // A Patient has many Appointments
      Patient.hasMany(models.Appointment, { foreignKey: 'patient_id', as: 'appointments' });
  
      // A Patient has many Prescriptions
      Patient.hasMany(models.Prescription, { foreignKey: 'patient_id', as: 'prescriptions' });
  
      // A Patient tracks created_by and updated_by relationships
      Patient.belongsTo(models.User, { foreignKey: 'created_by', as: 'creator' });
      Patient.belongsTo(models.User, { foreignKey: 'updated_by', as: 'updater' });
    };
  
    return Patient;
  };
  