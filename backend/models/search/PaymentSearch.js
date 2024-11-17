// models/search/PaymentSearch.js

const { Op } = require('sequelize');
const Payment = require('../Payment'); // Import the Payment model

// Payment search model
class PaymentSearch {
    static async searchPayments(queryParams) {
        try {
            const { patient_id, appointment_id, payment_date, status, payment_method, currency_code } = queryParams;

            // Build the search criteria dynamically based on provided query parameters
            const searchCriteria = {};

            if (patient_id) {
                searchCriteria.patient_id = patient_id; // Filter by patient_id
            }

            if (appointment_id) {
                searchCriteria.appointment_id = appointment_id; // Filter by appointment_id
            }

            if (payment_date) {
                searchCriteria.payment_date = { [Op.gte]: new Date(payment_date) }; // Filter by payment_date (greater than or equal)
            }

            if (status) {
                searchCriteria.status = status; // Filter by payment status
            }

            if (payment_method) {
                searchCriteria.payment_method = payment_method; // Filter by payment_method
            }

            if (currency_code) {
                searchCriteria.currency_code = currency_code; // Filter by currency code
            }

            // Query the payments based on the search criteria
            const payments = await Payment.findAll({
                where: searchCriteria,
            });

            return payments;
        } catch (error) {
            throw new Error(`Error while searching payments: ${error.message}`);
        }
    }
}

module.exports = PaymentSearch;
