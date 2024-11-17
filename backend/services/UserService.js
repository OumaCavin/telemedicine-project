// service/UserService
const bcrypt = require('bcrypt');
const User = require('../models/User');
const RoleAssignment = require('../models/RoleAssignment');
const ROLES = require('../constants/roles');
const logger = require('../utils/logger');

class UserService {
    static async registerUser({ username, email, password, role_id, createdBy }) {
        try {
            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create the user record
            const newUser = await User.create({
                username,
                email,
                password: hashedPassword,
                created_by: createdBy,
            });

            // Assign a default role to the user
            if (role_id) {
                await RoleAssignment.create({
                    user_id: newUser.user_id,
                    role_id: role_id || ROLES.PATIENT, // default to PATIENT role
                    created_by: createdBy,
                });
            }

            return newUser;
        } catch (error) {
            logger.error('Error registering user:', error);
            throw new Error('Error registering user');
        }
    }

    static async authenticateUser(identifier, password) {
        try {
            // Find user by username or email
            const user = await User.findOne({
                where: {
                    [User.sequelize.Op.or]: [{ username: identifier }, { email: identifier }],
                },
            });

            if (!user || !(await bcrypt.compare(password, user.password))) {
                return null; // Invalid credentials
            }

            return user; // User authenticated
        } catch (error) {
            logger.error('Error authenticating user:', error);
            throw new Error('Authentication failed');
        }
    }

    static async searchUsers(query) {
        try {
            // Implement your search logic (e.g., using Sequelize or another method)
            const users = await User.findAll({ where: query });
            return users;
        } catch (error) {
            logger.error('Error searching users:', error);
            throw new Error('Error searching users');
        }
    }
}

module.exports = UserService;
