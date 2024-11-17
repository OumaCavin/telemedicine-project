// routes/index.js

const express = require('express');
const authRoutes = require('./authRoutes');
const patientRoutes = require('./patientRoutes');
const doctorRoutes = require('./doctorRoutes');
const appointmentRoutes = require('./appointmentRoutes');
const adminRoutes = require('./adminRoutes');
const healthCenterRoutes = require('./healthCenterRoutes');
const auditRoutes = require('./auditRoutes');
const roleRoutes = require('./roleRoutes');
const profileRoutes = require('./profileRoutes'); // New profile routes
const prescriptionRoutes = require('./prescriptionRoutes'); // New prescription routes
// const chatRoutes = require('./chatRoutes'); // New chat routes
const paymentRoutes = require('./paymentRoutes'); // New payment routes
const reportRoutes = require('./reportRoutes'); // New report routes
const historyRoutes = require('./historyRoutes'); // New history routes
const messageRoutes = require('./messageRoutes.js'); // New message routes
const roleAssignmentRoutes = require('./roleAssignmentRoutes'); // New role assignment routes
const roleItemRoutes = require('./roleItemRoutes'); // New role item routes
const ehrRecordRoutes = require('./ehrRecordRoutes'); // New EHR record routes
const statusRoutes = require('./statusRoutes'); // New status routes
const auditLogRoutes = require('./auditLogRoutes'); // New audit log routes

const router = express.Router();

// Authentication routes
router.use('/auth', authRoutes);

// Patient routes
router.use('/patients', patientRoutes);

// Doctor routes
router.use('/doctors', doctorRoutes);

// Appointment routes
router.use('/appointments', appointmentRoutes);

// Admin routes
router.use('/admin', adminRoutes);

// Health Center routes
router.use('/healthcenters', healthCenterRoutes);

// Audit routes
router.use('/audit', auditRoutes);

// Role management routes
router.use('/roles', roleRoutes);

// User profile management routes (e.g., update patient/doctor profile)
router.use('/profiles', profileRoutes);

// Prescription management routes
router.use('/prescriptions', prescriptionRoutes);

// Chat routes (for doctor-patient communication)
// router.use('/chats', chatRoutes);

// Payment and invoice routes
router.use('/payments', paymentRoutes);

// Reporting routes (e.g., doctor performance, patient visits)
router.use('/reports', reportRoutes);

// History routes (e.g., patient's medical history)
router.use('/history', historyRoutes);

// Messages routes (e.g., internal messaging between staff and patients)
router.use('/messages', messageRoutes);

// Role Assignment routes (assign roles to users)
router.use('/role-assignments', roleAssignmentRoutes);

// Role Items routes (managing roles and associated permissions)
router.use('/role-items', roleItemRoutes);

// EHR (Electronic Health Records) routes
router.use('/ehr-records', ehrRecordRoutes);

// Status routes (e.g., account status management)
router.use('/statuses', statusRoutes);

// Audit Logs routes (to track activity)
router.use('/audit-logs', auditLogRoutes);

module.exports = router;



