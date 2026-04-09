// utils/seed.js
const { sequelize } = require('../config/db');
const logger = require('../utils/logger');

const seedDatabase = async () => {
    try {
        logger.info('Starting database seeding...');

        // Seed Roles
        await sequelize.query(`
            INSERT INTO telemed_roles (role_name, description, created_at, updated_at) 
            VALUES 
                ('Admin', 'Administrator role with full access', NOW(), NOW()),
                ('Doctor', 'Doctor role with access to patient records', NOW(), NOW()),
                ('Patient', 'Patient role with access to their data', NOW(), NOW())
            ON CONFLICT (role_name) DO NOTHING;
        `);
        logger.info('Roles seeded successfully');

        // Seed Status
        await sequelize.query(`
            INSERT INTO telemed_status (status_id, status_name, description, created_at, updated_at) VALUES
                (1, 'REGISTERED', 'User has registered', NOW(), NOW()),
                (2, 'PENDING_VERIFICATION', 'Pending verification', NOW(), NOW()),
                (3, 'VERIFIED', 'Verified user', NOW(), NOW()),
                (4, 'ACTIVE', 'Active user', NOW(), NOW()),
                (5, 'INACTIVE', 'Inactive user', NOW(), NOW()),
                (6, 'LOGGED_IN', 'Logged in', NOW(), NOW()),
                (7, 'LOGGED_OUT', 'Logged out', NOW(), NOW()),
                (8, 'BLOCKED', 'Blocked user', NOW(), NOW()),
                (9, 'UNBLOCKED', 'Unblocked user', NOW(), NOW()),
                (10, 'DELETED', 'Deleted user', NOW(), NOW())
            ON CONFLICT (status_id) DO NOTHING;
        `);
        logger.info('Status seeded successfully');

        logger.info('Database seeding completed');
    } catch (error) {
        logger.error('Error seeding database:', error);
    }
};

module.exports = seedDatabase;
