// routes/chatRoutes.js
const express = require('express');
const router = express.Router();
const MessageController = require('../controllers/MessageController');
const { protect } = require('../middlewares/authMiddleware');

// Route to get all messages in a chat
router.get('/:chatId', protect, MessageController.searchMessages);

// Route to send a new message in a chat
router.post('/:chatId', protect, MessageController.createMessage);

// Route to delete a message in a chat
router.delete('/:chatId/:messageId', protect, MessageController.deleteMessage);

module.exports = router;
