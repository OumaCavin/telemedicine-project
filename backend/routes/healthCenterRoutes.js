// routes/healthCenterRoutes.js
// Updated 15/11/2024 2:10pm  

const express = require('express');
const router = express.Router();
const HealthCenterController = require('../controllers/HealthCenterController');
const { protect } = require('../middlewares/authMiddleware');

// Route to get all health centers
router.get('/', protect, HealthCenterController.getAllHealthCenters);

// Route to get a specific health center by ID
router.get('/:healthCenterId', protect, HealthCenterController.getHealthCenterById);

// Route to add a new health center
router.post('/', protect, HealthCenterController.createHealthCenter);

// Route to update a health center's details
router.put('/:healthCenterId', protect, HealthCenterController.updateHealthCenter);

// Route to delete a health center
router.delete('/:healthCenterId', protect, HealthCenterController.deleteHealthCenter);

module.exports = router;

