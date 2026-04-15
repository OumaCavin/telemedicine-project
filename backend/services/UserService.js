// service/UserService
const bcrypt = require('bcrypt');
const User = require('../models/User');
const { sequelize } = require('../config/db'); // Import sequelize instance
const RoleAssignment = require('../models/RoleAssignment');
const ROLES = require('../constants/roles');
const logger = require('../utils/logger');

class UserService {
    static async registerUser({ username, email, password, role_id, createdBy }) {
        try {
            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);
            logger.info('Registering user:', { username, email, hasPasswordHash: !!hashedPassword, pwdLen: password.length });

            // Create the user record
            const newUser = await User.create({
                username,
                email,
                password_hash: hashedPassword,
                created_by: createdBy,
            });

            // Verify the user was created correctly
            const verifyUser = await User.findByPk(newUser.user_id);
            logger.info('User created successfully:', { 
                userId: newUser.user_id, 
                username: newUser.username,
                hasPasswordHashInDB: !!verifyUser?.password_hash,
                passwordHashLength: verifyUser?.password_hash?.length
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
            logger.info('=== AUTHENTICATE USER START ===');
            
            // Find user by username or email - use separate queries to avoid complex Op.or issues
            let user = null;
            
            // First try to find by email
            user = await User.findOne({
                where: { email: identifier },
            });
            
            // If not found by email, try username
            if (!user) {
                user = await User.findOne({
                    where: { username: identifier },
                });
            }

            logger.info('User findOne result:', { 
                identifier, 
                userFound: !!user,
                userId: user?.user_id,
                username: user?.username,
                hasPasswordHash: !!user?.password_hash,
                passwordHashLength: user?.password_hash?.length
            });
            
            if (!user) {
                logger.warn('User not found for identifier:', identifier);
                return null;
            }
            
            if (!user.password_hash) {
                logger.error('User found but no password_hash:', { userId: user.user_id, username: user.username });
                return null;
            }
            
            // Use a try-catch around bcrypt.compare
            let passwordMatch = false;
            try {
                logger.info('About to bcrypt.compare');
                passwordMatch = await bcrypt.compare(password, user.password_hash);
                logger.info('bcrypt.compare result:', { match: passwordMatch });
            } catch (bcryptError) {
                logger.error('Bcrypt compare error:', bcryptError);
                return null;
            }
            
            if (!passwordMatch) {
                return null; // Invalid credentials
            }

            logger.info('=== AUTHENTICATE USER END - SUCCESS ===');
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
