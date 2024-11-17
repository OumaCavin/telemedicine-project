// models/Appointment.js
module.exports = (sequelize, DataTypes) => {
    const Appointment = sequelize.define('Appointment', {
      appointment_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      patient_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      doctor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      appointment_time: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('scheduled', 'canceled', 'completed'),
        defaultValue: 'scheduled',
        allowNull: false,
      },
      appointment_type: {
        type: DataTypes.ENUM('physical', 'virtual'),
        defaultValue: 'physical',
        allowNull: false,
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
      tableName: 'telemed_appointments',
      timestamps: false,
    });
  
    // Associations
    Appointment.associate = (models) => {
      // An Appointment belongs to a Patient
      Appointment.belongsTo(models.Patient, { foreignKey: 'patient_id', as: 'patient' });
  
      // An Appointment belongs to a Doctor (User)
      Appointment.belongsTo(models.User, { foreignKey: 'doctor_id', as: 'doctor' });
  
      // An Appointment tracks created_by and updated_by relationships
      Appointment.belongsTo(models.User, { foreignKey: 'created_by', as: 'creator' });
      Appointment.belongsTo(models.User, { foreignKey: 'updated_by', as: 'updater' });
  
      // An Appointment has many Prescriptions
      Appointment.hasMany(models.Prescription, { foreignKey: 'appointment_id', as: 'prescriptions' });
    };
  
    return Appointment;
  };
  
