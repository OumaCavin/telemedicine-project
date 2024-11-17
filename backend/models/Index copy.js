// models/Index.js
const { Sequelize } = require('sequelize');

// Importing all models
const DoctorModel = require('./Doctor');
const HistoryModel = require('./History');
const RoleModel = require('./Role');
const RoleAssignmentModel = require('./RoleAssignment');
const RoleItemModel = require('./RoleItem');
const EhrRecordModel = require('./EhrRecord');
const PaymentModel = require('./Payment');
const StatusModel = require('./Status');
const AuditLogModel = require('./AuditLog');
const UserModel = require('./User');
const AdminModel = require('./Admin');
const PatientModel = require('./Patient');
const AppointmentModel = require('./Appointment');
const PrescriptionModel = require('./Prescription');
const MessageModel = require('./Message');
const HealthCenterModel = require('./HealthCenter');


// Using environment variables for sensitive data
const { DB_HOST, DB_USER, DB_PASS, DB_NAME } = process.env;

// Initialize Sequelize
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: 'mysql',
  logging: false, // Disable logging for production
});

// Initialize Models
const User = UserModel(sequelize, Sequelize.DataTypes);
const Admin = AdminModel(sequelize, Sequelize.DataTypes);
const Patient = PatientModel(sequelize, Sequelize.DataTypes);
const Doctor = DoctorModel(sequelize, Sequelize.DataTypes);
const Appointment = AppointmentModel(sequelize, Sequelize.DataTypes);
const Prescription = PrescriptionModel(sequelize, Sequelize.DataTypes);
const Message = MessageModel(sequelize, Sequelize.DataTypes);
const History = HistoryModel(sequelize, Sequelize.DataTypes);
const Role = RoleModel(sequelize, Sequelize.DataTypes);
const RoleAssignment = RoleAssignmentModel(sequelize, Sequelize.DataTypes);
const RoleItem = RoleItemModel(sequelize, Sequelize.DataTypes);
const EhrRecord = EhrRecordModel(sequelize, Sequelize.DataTypes);
const Payment = PaymentModel(sequelize, Sequelize.DataTypes);
const Status = StatusModel(sequelize, Sequelize.DataTypes);
const AuditLog = AuditLogModel(sequelize, Sequelize.DataTypes);
const HealthCenter = HealthCenterModel(sequelize, Sequelize.DataTypes);


// Define Associations
Doctor.associate({ User, History });
History.associate({ User, Status });


// Define Associations
Role.associate({ User, RoleAssignment });
RoleAssignment.associate({ User, Role });

// Define Associations
RoleItem.associate({ Role, User });
EhrRecord.associate({ User });

// Define Associations
Payment.associate({ User, Appointment });
Status.associate({ User });

// Define Associations
AuditLog.associate({ User });

// Define Associations
Admin.associate({ User });

Prescription.associate({ EhrRecord, Patient, User, Appointment });
EhrRecord.associate({ Prescription });
Patient.associate({ Prescription });
User.associate({ Prescription });
Appointment.associate({ Prescription });


// Define Associations
Appointment.associate({ Patient, User, Prescription });
Patient.associate({ Appointment });
User.associate({ Appointment });
Prescription.associate({ Appointment });


// Define Associations
Patient.associate({ User, Appointment, Prescription });
User.associate({ Patient });
Appointment.associate({ Patient });
Prescription.associate({ Patient });


// Define Associations
HealthCenter.associate({ User });
User.associate({ HealthCenter });

// Define Associations
Message.associate({ User });
User.associate({ Message });

// Define Associations
HealthCenter.associate({ User });
User.associate({ HealthCenter });

// Define Associations
Message.associate({ User });
User.associate({ Message });


// Define Relationships

// Admins and Users
Admin.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
User.hasOne(Admin, { foreignKey: 'user_id', as: 'admin' });

// Patients and Users
Patient.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
User.hasOne(Patient, { foreignKey: 'user_id', as: 'patient' });

// Appointments relationships
Appointment.belongsTo(User, { foreignKey: 'patient_id', as: 'patient' });
Appointment.belongsTo(User, { foreignKey: 'doctor_id', as: 'doctor' });

// Prescriptions relationships
Prescription.belongsTo(User, { foreignKey: 'patient_id', as: 'patient' });
Prescription.belongsTo(User, { foreignKey: 'doctor_id', as: 'doctor' });
Prescription.belongsTo(Appointment, { foreignKey: 'appointment_id', as: 'appointment' });

// Messages relationships
Message.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

// Doctor belongs to User (via user_id)
Doctor.belongsTo(User, { foreignKey: 'user_id' });
User.hasOne(Doctor, { foreignKey: 'user_id' });

// History belongs to User (via user_id) and Status (via status_id)
History.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(History, { foreignKey: 'user_id' });
History.belongsTo(Status, { foreignKey: 'status_id' });
Status.hasMany(History, { foreignKey: 'status_id' });

// Role Assignments belongs to User and Role
RoleAssignment.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });
User.hasMany(RoleAssignment, { foreignKey: 'user_id' });
RoleAssignment.belongsTo(Role, { foreignKey: 'role_id', onDelete: 'CASCADE' });
Role.hasMany(RoleAssignment, { foreignKey: 'role_id' });

// Role Items belong to Role
RoleItem.belongsTo(Role, { foreignKey: 'role_id', onDelete: 'CASCADE' });
Role.hasMany(RoleItem, { foreignKey: 'role_id' });

// EHR Record belongs to Patient (User) and Doctor (User)
EhrRecord.belongsTo(User, { as: 'Patient', foreignKey: 'patient_id', onDelete: 'CASCADE' });
User.hasMany(EhrRecord, { as: 'PatientRecords', foreignKey: 'patient_id' });
EhrRecord.belongsTo(User, { as: 'Doctor', foreignKey: 'doctor_id', onDelete: 'SET NULL' });
User.hasMany(EhrRecord, { as: 'DoctorRecords', foreignKey: 'doctor_id' });

// Payment belongs to Patient (User) and Appointment
Payment.belongsTo(User, { as: 'Patient', foreignKey: 'patient_id', onDelete: 'CASCADE' });
User.hasMany(Payment, { foreignKey: 'patient_id' });
Payment.belongsTo(Appointment, { foreignKey: 'appointment_id', onDelete: 'SET NULL' });
Appointment.hasMany(Payment, { foreignKey: 'appointment_id' });

// Audit Log belongs to User
AuditLog.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(AuditLog, { foreignKey: 'user_id' });

// Sync Models with Database
sequelize.sync({ alter: true })
  .then(() => console.log('Database & tables created!'))
  .catch(err => console.error('Error creating database:', err));

module.exports = {
  sequelize,
  User,
  Admin,
  Patient,
  Appointment,
  Prescription,
  Message,
  HealthCenter,
  Doctor,
  History,
  Role,
  RoleAssignment,
  RoleItem,
  EhrRecord,
  Payment,
  Status,
  AuditLog,
};
