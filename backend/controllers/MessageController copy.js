// controllers/MessageController.js

const Message = require('../models/Message');

exports.getMessages = async (req, res) => {
    try {
        const messages = await Message.find({ conversationId: req.params.conversationId });
        res.json(messages);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving messages' });
    }
};

exports.sendMessage = async (req, res) => {
    try {
        const newMessage = new Message(req.body);
        await newMessage.save();
        res.status(201).json(newMessage);
    } catch (err) {
        res.status(500).json({ message: 'Error sending message' });
    }
};

exports.deleteMessage = async (req, res) => {
    try {
        const message = await Message.findByIdAndDelete(req.params.messageId);
        if (!message) {
            return res.status(404).json({ message: 'Message not found' });
        }
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ message: 'Error deleting message' });
    }
};
