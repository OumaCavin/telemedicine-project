const RoleAssignment = require('../models/RoleAssignment');

exports.getAssignments = async (req, res) => {
    try {
        const assignments = await RoleAssignment.find();
        res.json(assignments);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving role assignments' });
    }
};

exports.assignRole = async (req, res) => {
    try {
        const newAssignment = new RoleAssignment(req.body);
        await newAssignment.save();
        res.status(201).json(newAssignment);
    } catch (err) {
        res.status(500).json({ message: 'Error assigning role' });
    }
};

exports.removeAssignment = async (req, res) => {
    try {
        const assignment = await RoleAssignment.findByIdAndDelete(req.params.assignmentId);
        if (!assignment) {
            return res.status(404).json({ message: 'Assignment not found' });
        }
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ message: 'Error removing assignment' });
    }
};
