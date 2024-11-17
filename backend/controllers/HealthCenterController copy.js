const HealthCenter = require('../models/HealthCenter');

class HealthCenterController {
    async findNearby(req, res) {
        const { latitude, longitude } = req.query;

        try {
            const healthCenters = await HealthCenter.findAll({
                where: {
                    location: {
                        // Use spatial query here if necessary
                    }
                }
            });

            res.status(200).json({ healthCenters });
        } catch (error) {
            res.status(500).json({ error: 'Failed to find health centers', details: error.message });
        }
    }
}

module.exports = new HealthCenterController();
