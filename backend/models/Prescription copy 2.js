// models/Prescription.js
module.exports = (sequelize, DataTypes) => {
    const Prescription = sequelize.define('Prescription', {
      prescription_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      ehr_id: {
        type: DataTypes.INTEGER,
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
      appointment_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      medication_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      dosage: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      frequency: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      medication: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      dosage_instructions: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      prescribed_date: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false,
      },
      refill_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM('active', 'completed', 'canceled'),
        defaultValue: 'active',
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
      tableName: 'telemed_prescriptions',
      timestamps: false,
    });
  
    // Associations
    Prescription.associate = (models) => {
      // A Prescription belongs to an EHR Record
      Prescription.belongsTo(models.EhrRecord, { foreignKey: 'ehr_id', as: 'ehrRecord' });
  
      // A Prescription belongs to a Patient
      Prescription.belongsTo(models.Patient, { foreignKey: 'patient_id', as: 'patient' });
  
      // A Prescription belongs to a Doctor (User)
      Prescription.belongsTo(models.User, { foreignKey: 'doctor_id', as: 'doctor' });
  
      // A Prescription belongs to an Appointment
      Prescription.belongsTo(models.Appointment, { foreignKey: 'appointment_id', as: 'appointment' });
  
      // A Prescription tracks created_by and updated_by relationships
      Prescription.belongsTo(models.User, { foreignKey: 'created_by', as: 'creator' });
      Prescription.belongsTo(models.User, { foreignKey: 'updated_by', as: 'updater' });
    };
  
    return Prescription;
  };
  
