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

// Doctor and History associations
Doctor.associate({ User, History });
History.associate({ User, Status });

// Role and RoleAssignment associations
Role.associate({ User, RoleAssignment });
RoleAssignment.associate({ User, Role });

// RoleItem and Role associations
RoleItem.associate({ Role, User });

// EhrRecord and User associations
EhrRecord.associate({ User });

// Payment and Appointment associations
Payment.associate({ User, Appointment });

// Status and User associations
Status.associate({ User });

// AuditLog and User associations
AuditLog.associate({ User });

// Admin and User associations
Admin.associate({ User });

// Prescription and related models
Prescription.associate({ EhrRecord, Patient, User, Appointment });
EhrRecord.associate({ Prescription });
Patient.associate({ Prescription });
User.associate({ Prescription });

// Appointment and related models
Appointment.associate({ Patient, User, Prescription });
Patient.associate({ Appointment });
User.associate({ Appointment });

// Patient associations
Patient.associate({ User, Appointment, Prescription });
User.associate({ Patient });
Appointment.associate({ Patient });
Prescription.associate({ Patient });

// HealthCenter associations
HealthCenter.associate({ User });
User.associate({ HealthCenter });

// Message associations
Message.associate({ User });
User.associate({ Message });

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
