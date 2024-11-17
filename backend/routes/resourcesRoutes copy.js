// routes/resources.js

const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const db = require('../config/db'); // Database connection

// Helper function to set created_by and updated_by
const setCreatedAndUpdatedBy = (data, userId) => {
    data.created_by = userId;
    data.updated_by = userId;
    return data;
};

// POST route (create resource)
router.post('/', protect, async (req, res) => {
    try {
        const userId = req.user.user_id; // Use the `id` or relevant field from decoded token
        let resourceData = req.body;

        // Add created_by and updated_by fields
        resourceData = setCreatedAndUpdatedBy(resourceData, userId);

        // Insert resource into database
        const result = await db.query(
            'INSERT INTO resources (name, created_by, updated_by) VALUES (?, ?, ?)',
            [resourceData.name, resourceData.created_by, resourceData.updated_by]
        );

        res.status(201).json({ success: true, resourceId: result.insertId });
    } catch (error) {
        console.error('Error creating resource:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

// PUT route (update resource)
router.put('/:id', protect, async (req, res) => {
    try {
        const userId = req.user.user_id; // Extracted from JWT
        const resourceId = req.params.id;
        let resourceData = req.body;

        // Update updated_by field
        resourceData.updated_by = userId;

        // Update resource in the database
        const result = await db.query(
            'UPDATE resources SET name = ?, updated_by = ? WHERE id = ?',
            [resourceData.name, resourceData.updated_by, resourceId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Resource not found' });
        }

        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Error updating resource:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});


// GET route (get resource)
router.get('/:id', async (req, res) => {
    try {
        const resourceId = req.params.id;

        const resource = await db.query(
            'SELECT * FROM resources WHERE id = ?',
            [resourceId]
        );

        if (!resource || resource.length === 0) {
            return res.status(404).json({ success: false, message: 'Resource not found' });
        }

        res.status(200).json({ success: true, resource: resource[0] });
    } catch (error) {
        console.error('Error fetching resource:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

module.exports = router;
