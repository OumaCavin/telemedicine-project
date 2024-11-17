// routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
const PaymentController = require('../controllers/PaymentController');
const { protect } = require('../middlewares/authMiddleware');

// Route to get payment details
router.get('/:paymentId', protect, PaymentController.getPaymentDetails);

// Route to create a new payment
router.post('/', protect, PaymentController.createPayment);

// Route to update payment details
router.put('/:paymentId', protect, PaymentController.updatePayment);

// Route to cancel a payment
router.delete('/:paymentId', protect, PaymentController.cancelPayment);

module.exports = router;
