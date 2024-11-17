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
const { DB_HOST, DB_USER, DB_PASS, DB_NAME, NODE_ENV } = process.env;

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
Role.associate({ User, RoleAssignment });
RoleAssignment.associate({ Role });
RoleItem.associate({ Role });
Payment.associate({ User, Appointment, Patient });
Status.associate({ User });
AuditLog.associate({ User });
Admin.associate({ User });
Prescription.associate({ EhrRecord, Patient, User, Appointment, Doctor });//
EhrRecord.associate({ User, Prescription, Patient, Doctor});//
Patient.associate({ User, Appointment, Prescription });
Appointment.associate({ Patient, User, Prescription});
HealthCenter.associate({ User });
Message.associate({ User });
User.associate({ RoleAssignment, Appointment, Message, Prescription, HealthCenter, AuditLog });

// Sync Models with Database (Environment-based synchronization)
if (NODE_ENV === 'production') {
  console.log('Running in production, skipping sequelize.sync()');
} else {
  sequelize.sync({ alter: true })
    .then(() => console.log('Database & tables created!'))
    .catch(err => console.error('Error creating database:', err));
}

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
