// middlewares/checkRole.js
const  RoleAssignment  = require('../models/RoleAssignment');  // Assuming Sequelize model for RoleAssignment
const ROLES = require('../constants/roles');

const checkRole = (allowedRoles) => {
    return async (req, res, next) => {
        try {
            const userId = req.user.user_id;  // Assuming user ID is set by authentication middleware

            // Find the role assignment for the user
            const roleAssignment = await RoleAssignment.findOne({
                where: { user_id: userId },
                include: [{ model: Role, attributes: ['role_id', 'role_name'] }],  // Assuming you have a Role model
            });

            // Check if role assignment exists
            if (!roleAssignment) {
                return res.status(403).json({ error: 'No role assigned to user' });
            }

            const userRoleId = roleAssignment.role_id;
            const userRoleName = roleAssignment.Role ? roleAssignment.Role.role_name : 'Unknown';

            // Check if the user's role is in the allowed roles
            if (!allowedRoles.includes(userRoleId)) {
                return res.status(403).json({ error: 'Access denied, insufficient role' });
            }

            // Attach the user's role to the request for further use
            req.user.role = {
                role_id: userRoleId,
                role_name: userRoleName,
            };

            // Proceed to the next middleware or route handler
            next();
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    };
};

module.exports = checkRole;
