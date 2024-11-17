// models/EHRRecord.js

module.exports = (sequelize, DataTypes) => {
  const EHRRecord = sequelize.define('EHRRecord', {
    ehr_record_id: {
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
      allowNull: true,
    },
    record_date: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: false,
    },
    medical_conditions: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    allergies: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    medications: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    visit_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    diagnosis: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    treatment: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    encounter_type: {
      type: DataTypes.ENUM('in-person', 'telehealth-visits'),
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
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: false,
    },
  }, {
    tableName: 'telemed_ehr_records',
    timestamps: false,
  });

  // Associations
  EHRRecord.associate = (models) => {
    // An EHRRecord belongs to a Patient (user_id)
    EHRRecord.belongsTo(models.User, { foreignKey: 'patient_id', as: 'patient' });

    // An EHRRecord belongs to a Doctor (user_id)
    EHRRecord.belongsTo(models.User, { foreignKey: 'doctor_id', as: 'doctor' });

    // An EHRRecord belongs to a User for created_by and updated_by
    EHRRecord.belongsTo(models.User, { foreignKey: 'created_by', as: 'creator' });
    EHRRecord.belongsTo(models.User, { foreignKey: 'updated_by', as: 'updater' });
  };

  return EHRRecord;
};
