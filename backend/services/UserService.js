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
            logger.info('Registering user:', { username, email, hasPasswordHash: !!hashedPassword });

            // Create the user record
            const newUser = await User.create({
                username,
                email,
                password_hash: hashedPassword,
                created_by: createdBy,
            });

            logger.info('User created successfully:', { userId: newUser.user_id, username: newUser.username });

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

            logger.info('Authenticating user:', { identifier, userFound: !!user, hasPasswordHash: !!user?.password_hash });
            
            if (!user || !(await bcrypt.compare(password, user.password_hash))) {
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

    static async getUserById(userId) {
        try {
            const user = await User.findByPk(userId);
            return user;
        } catch (error) {
            logger.error('Error getting user by ID:', error);
            throw new Error('Error getting user by ID');
        }
    }
}

module.exports = UserService;
