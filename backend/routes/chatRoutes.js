// routes/chatRoutes.js
const express = require('express');
const router = express.Router();
const ChatController = require('../controllers/ChatController');
const { protect } = require('../middlewares/authMiddleware');

// Route to get all messages in a chat
router.get('/:chatId', protect, ChatController.getChatMessages);

// Route to send a new message in a chat
router.post('/:chatId', protect, ChatController.sendMessage);

// Route to delete a message in a chat
router.delete('/:chatId/:messageId', protect, ChatController.deleteMessage);

module.exports = router;
