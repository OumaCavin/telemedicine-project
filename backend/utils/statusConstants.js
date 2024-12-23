// utils/statusConstants.js

const StatusConstants = {
    // Common Statuses

    REGISTERED: 1,
    PENDING_VERIFICATION: 2,
    VERIFIED: 3,
    ACTIVE: 4,
    INACTIVE: 5,
    LOGGED_IN: 6,
    LOGGED_OUT: 7, 
    BLOCKED: 8,
    UNBLOCKED: 9,
    DELETED: 10,
    
    // Patient-Specific Statuses
    PATIENT_PROFILE_UPDATED: 12,
    PROFILE_NOT_UPDATED: 13,
    APPOINTMENT_BOOKED: 14,
    APPOINTMENT_CANCELLED: 15,
    PRESCRIPTION_UPLOADED: 16,
    PRESCRIPTION_NOT_UPLOADED: 17,
    APPOINTMENT_CONFIRMED: 18,
    APPOINTMENT_NOT_CONFIRMED: 19,
    REMINDER_NOTIFICATION_SENT: 20,
    REMINDER_NOTIFICATION_NOT_SENT: 21,
    PAYMENT_DONE: 22,
    CONSULTATION_SCHEDULED: 23,
    CONSULTATION_COMPLETED: 24,
    CONSULTATION_CANCELLED: 25,
    VIRTUAL_CONSULTATION_STARTED: 26,
    VIRTUAL_CONSULTATION_COMPLETED: 27,
    VIRTUAL_CONSULTATION_CANCELLED: 28,
    PRESCRIPTION_SENT: 29,

    // Doctor-Specific Statuses
    DOCTOR_PROFILE_UPDATED: 30,
    SCHEDULED_APPOINTMENT_REVIEWED: 31,
    CONSULTATION_COMPLETED_DOCTOR: 32,
    PATIENT_MEDICAL_HISTORY_EXAMINED: 33,
    PRESCRIPTION_ISSUED: 34,
    PRESCRIPTION_UPLOADED_DOCTOR: 35,
    POST_APPOINTMENT_DONE: 36,
    FOLLOW_UP_DONE: 37,

    // Admin-Specific Statuses
    ADMIN_LOGGED_IN: 38,
    USER_ROLE_UPDATED: 39,
    USER_APPROVED: 40,
    USER_ACTIVITY_MONITORED: 41,
    AUDIT_LOGS_REVIEWED: 42,
    PERMISSIONS_UPDATED: 43,
    SECURITY_CHECKS_PERFORMED: 44,
    BACKEND_SERVICES_MONITORED: 45,
    MAINTENANCE_PERFORMED: 46,
    REPORT_GENERATED: 47
};

module.exports = StatusConstants;
