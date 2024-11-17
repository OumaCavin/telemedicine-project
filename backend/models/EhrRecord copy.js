// EHR Records Table
const EhrRecord = sequelize.define('EhrRecord', {
  ehr_record_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  patient_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  doctor_id: DataTypes.INTEGER,
  record_date: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
  medical_conditions: DataTypes.TEXT,
  allergies: DataTypes.TEXT,
  medications: DataTypes.TEXT,
  visit_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  diagnosis: DataTypes.TEXT,
  treatment: DataTypes.JSON,
  encounter_type: {
    type: DataTypes.ENUM('in-person', 'telehealth-visits'),
  },
  created_by: DataTypes.INTEGER,
  updated_by: DataTypes.INTEGER,
}, {
  tableName: 'telemed_ehr_records',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});