const Status = require('../models/Status');

exports.getStatuses = async (req, res) => {
    try {
        const statuses = await Status.find();
        res.json(statuses);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving statuses' });
    }
};

exports.updateStatus = async (req, res) => {
    try {
        const status = await Status.findByIdAndUpdate(req.params.statusId, req.body, { new: true });
        if (!status) {
            return res.status(404).json({ message: 'Status not found' });
        }
        res.json(status);
    } catch (err) {
        res.status(500).json({ message: 'Error updating status' });
    }
};
