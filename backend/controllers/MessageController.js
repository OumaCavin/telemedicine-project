// controllers/MessageController.js

const Message = require('../models/Message');
const MessageSearch = require('../models/search/MessageSearch');

// Create a new message
const createMessage = async (req, res) => {
    try {
        const { user_id, content, priority, created_by } = req.body;

        const newMessage = await Message.create({
            user_id,
            content,
            priority,
            created_by,
        });

        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all messages for a user
const getAllMessages = async (req, res) => {
    try {
        const messages = await Message.findAll({
            where: { user_id: req.params.user_id },
        });
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a specific message by ID
const getMessageById = async (req, res) => {
    try {
        const message = await Message.findByPk(req.params.id);
        if (message) {
            res.status(200).json(message);
        } else {
            res.status(404).json({ error: 'Message not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update message status (mark as read)
const updateMessageStatus = async (req, res) => {
    try {
        const [updated] = await Message.update(req.body, {
            where: { message_id: req.params.id },
        });

        if (updated) {
            const updatedMessage = await Message.findByPk(req.params.id);
            res.status(200).json(updatedMessage);
        } else {
            res.status(404).json({ error: 'Message not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a message
const deleteMessage = async (req, res) => {
    try {
        const deleted = await Message.destroy({
            where: { message_id: req.params.id },
        });

        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Message not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Search for messages
const searchMessages = async (req, res) => {
    try {
        const messages = await MessageSearch.searchMessages(req.query);
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createMessage,
    getAllMessages,
    getMessageById,
    updateMessageStatus,
    deleteMessage,
    searchMessages,
};
