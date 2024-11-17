// utils/validator.js
const { body, validationResult } = require('express-validator');

// Reusable Validators
const emailValidation = body('email')
  .isEmail().withMessage('Must be a valid email address')
  .normalizeEmail();

const passwordValidation = body('password')
  .isString().withMessage('Password must be a string')
  .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long');

const currencyValidation = body('currency_code')
  .isString().withMessage('Currency code must be a string')
  .isIn(['KES', 'USD', 'EUR']).withMessage('Invalid currency code. Allowed: KES, USD, EUR');

const nameValidation = body('name')
  .isString().withMessage('Name must be a string')
  .isLength({ min: 1 }).withMessage('Name cannot be empty');

// Middleware for validating user input
// Validation rules for user registration
const validateRegistration = [
  body('username')
    .isString().withMessage('Username must be a string')
    .isLength({ min: 3, max: 30 }).withMessage('Username must be between 3 and 30 characters long')
    .matches(/^[a-zA-Z0-9_.-]*$/).withMessage('Username can only contain letters, numbers, underscores, dashes, and dots'),
  emailValidation,
  passwordValidation,
  body('confirm_password')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords must match');
      }
      return true;
    }),
];

// Validation rules for user login
const validateLogin = [
  emailValidation,
  passwordValidation.withMessage('Password is required'),
];

// Validation rules for the Message model
const validateMessage = [
  body('user_id')
    .isInt().withMessage('User ID must be an integer')
    .notEmpty().withMessage('User ID is required'),
  body('content')
    .isString().withMessage('Content must be a string')
    .isLength({ min: 1 }).withMessage('Content cannot be empty'),
  body('is_read')
    .isBoolean().withMessage('is_read must be a boolean'),
];

// Validation rules for the Health Center model
const validateHealthCenter = [
  nameValidation,
  body('location')
    .custom(value => {
      if (!Array.isArray(value) || value.length !== 2) {
        throw new Error('Location must be a point with two coordinates [latitude, longitude]');
      }
      return true;
    }),
  body('contact_info')
    .optional()
    .isString().withMessage('Contact info must be a string'),
];

// Validation rules for the Role model
const validateRole = [
  nameValidation.withMessage('Role name must be a string'),
  body('role_name')
    .isLength({ max: 50 }).withMessage('Role name must not exceed 50 characters'),
  body('description')
    .optional()
    .isString().withMessage('Description must be a string'),
];

// Validation rules for EHR Records model
const validateEhrRecords = [
  body('patient_id')
    .isInt().withMessage('Patient ID must be an integer')
    .notEmpty().withMessage('Patient ID is required'),
  body('doctor_id')
    .optional()
    .isInt().withMessage('Doctor ID must be an integer'),
  body('visit_date')
    .isISO8601().withMessage('Visit date must be a valid date format (ISO 8601)')
    .custom(value => {
      const visitDate = new Date(value);
      if (visitDate > new Date()) {
        throw new Error('Visit date cannot be in the future');
      }
      return true;
    }),
  body('medical_conditions')
    .optional()
    .isString().withMessage('Medical conditions must be a string'),
  body('allergies')
    .optional()
    .isString().withMessage('Allergies must be a string'),
  body('medications')
    .optional()
    .isString().withMessage('Medications must be a string'),
  body('diagnosis')
    .optional()
    .isString().withMessage('Diagnosis must be a string'),
];

// Middleware to validate request
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  validateRegistration,
  validateLogin,
  validateMessage,
  validateHealthCenter,
  validateRole,
  validateEhrRecords,
  validateRequest,
};
