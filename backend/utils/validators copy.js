const { body, validationResult } = require('express-validator');

// Middleware for validating user input
exports.validateRegistration = [
    body('email').isEmail().withMessage('Must be a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Must be at least 6 characters long'),
    body('name').notEmpty().withMessage('Name is required'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

// Add more validators as needed

