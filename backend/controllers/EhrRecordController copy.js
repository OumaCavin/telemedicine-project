const EHRRecord = require('../models/EhrRecord.js');

exports.getRecords = async (req, res) => {
    try {
        const records = await EHRRecord.find({ patientId: req.params.patientId });
        res.json(records);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving EHR records' });
    }
};

exports.createRecord = async (req, res) => {
    try {
        const newRecord = new EHRRecord(req.body);
        await newRecord.save();
        res.status(201).json(newRecord);
    } catch (err) {
        res.status(500).json({ message: 'Error creating EHR record' });
    }
};

