import React, { useState, useEffect } from 'react';
import axios from '../../axios';
import { Link } from 'react-router-dom';

const PaymentList = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch the list of payments when the component mounts
    useEffect(() => {
        axios.get('/payments')
            .then(response => {
                // Ensure we have an array
                const data = Array.isArray(response.data) ? response.data : [];
                setPayments(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching payments:', err);
                setError(err.response?.data?.error || 'Error fetching payments');
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="payment-list-container">
            <h2>Payment List</h2>
            {payments.length === 0 ? (
                <p>No payments found.</p>
            ) : (
                <ul>
                    {payments.map(payment => (
                        <li key={payment.payment_id}>
                            <Link to={`/payments/${payment.payment_id}`}>
                                {payment.paymentMethod} - {payment.amount}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default PaymentList;
