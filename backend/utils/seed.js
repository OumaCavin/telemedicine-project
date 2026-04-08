// utils/seed.js
const { sequelize } = require('../config/db');
const logger = require('../utils/logger');

const seedDatabase = async () => {
    try {
        logger.info('Starting database seeding...');

        // Seed Roles
        await sequelize.query(`
            INSERT INTO telemed_roles (role_name, description) 
            VALUES 
                ('Admin', 'Administrator role with full access'),
                ('Doctor', 'Doctor role with access to patient records'),
                ('Patient', 'Patient role with access to their data')
            ON CONFLICT (role_name) DO NOTHING;
        `);
        logger.info('Roles seeded successfully');

        // Seed Status
        await sequelize.query(`
            INSERT INTO telemed_status (status_id, status_name, description) VALUES
                (1, 'REGISTERED', 'User has registered'),
                (2, 'PENDING_VERIFICATION', 'Pending verification'),
                (3, 'VERIFIED', 'Verified user'),
                (4, 'ACTIVE', 'Active user'),
                (5, 'INACTIVE', 'Inactive user'),
                (6, 'LOGGED_IN', 'Logged in'),
                (7, 'LOGGED_OUT', 'Logged out'),
                (8, 'BLOCKED', 'Blocked user'),
                (9, 'UNBLOCKED', 'Unblocked user'),
                (10, 'DELETED', 'Deleted user')
            ON CONFLICT (status_id) DO NOTHING;
        `);
        logger.info('Status seeded successfully');

        logger.info('Database seeding completed');
    } catch (error) {
        logger.error('Error seeding database:', error);
    }
};

module.exports = seedDatabase;
