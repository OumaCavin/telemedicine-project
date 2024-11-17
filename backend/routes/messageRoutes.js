// routes/messageRoutes.js
const express = require('express');
const router = express.Router();
const MessageController = require('../controllers/MessageController');
const { protect } = require('../middlewares/authMiddleware');

// Route to get all messages for a user
router.get('/:userId', protect, MessageController.getMessages);

// Route to send a new message
router.post('/', protect, MessageController.sendMessage);

// Route to delete a message
router.delete('/:messageId', protect, MessageController.deleteMessage);

module.exports = router;
