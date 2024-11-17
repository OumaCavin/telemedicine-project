// middlewares/checkStatus.js
const StatusConstants = require('../utils/statusConstants');

function checkIfActive(req, res, next) {
    // Ensure req.user exists and has a valid status property
    if (!req.user || typeof req.user.status === 'undefined') {
        return res.status(400).json({
            message: 'User status not available or user is not authenticated.'
        });
    }

    const userStatus = req.user.status;

    if (userStatus !== StatusConstants.ACTIVE) {
        return res.status(403).json({
            message: 'Account is not active.'
        });
    }

    next();
}

module.exports = checkIfActive;

