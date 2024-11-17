// controllers/PaymentController.js

const Payment = require('../models/Payment');
const PaymentSearch = require('../models/search/PaymentSearch');

// Create a new payment record
const createPayment = async (req, res) => {
    try {
        const { patient_id, appointment_id, amount, payment_method, currency_code, status, created_by } = req.body;

        const newPayment = await Payment.create({
            patient_id,
            appointment_id,
            amount,
            payment_method,
            currency_code,
            status,
            created_by,
        });

        res.status(201).json(newPayment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all payment records
const getAllPayments = async (req, res) => {
    try {
        const payments = await Payment.findAll();
        res.status(200).json(payments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a specific payment by ID
const getPaymentById = async (req, res) => {
    try {
        const payment = await Payment.findByPk(req.params.id);
        if (payment) {
            res.status(200).json(payment);
        } else {
            res.status(404).json({ error: 'Payment not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update an existing payment record
const updatePayment = async (req, res) => {
    try {
        const { id } = req.params;
        const { patient_id, appointment_id, amount, payment_method, currency_code, status, updated_by } = req.body;

        const payment = await Payment.findByPk(id);

        if (!payment) {
            return res.status(404).json({ error: 'Payment not found' });
        }

        payment.patient_id = patient_id || payment.patient_id;
        payment.appointment_id = appointment_id || payment.appointment_id;
        payment.amount = amount || payment.amount;
        payment.payment_method = payment_method || payment.payment_method;
        payment.currency_code = currency_code || payment.currency_code;
        payment.status = status || payment.status;
        payment.updated_by = updated_by;

        await payment.save();

        res.status(200).json(payment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Search for payments
const searchPayments = async (req, res) => {
    try {
        const payments = await PaymentSearch.searchPayments(req.query);
        res.status(200).json(payments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createPayment,
    getAllPayments,
    getPaymentById,
    updatePayment,
    searchPayments,
};
