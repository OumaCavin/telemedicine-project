import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PaymentList = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch the list of payments when the component mounts
    useEffect(() => {
        axios.get('/api/payments')
            .then(response => {
                setPayments(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError('Error fetching payments');
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h2>Payment List</h2>
            <Link to="/payments/create">Create Payment</Link>
            <ul>
                {payments.map(payment => (
                    <li key={payment.id}>
                        <Link to={`/payments/${payment.id}`}>{payment.paymentMethod} - {payment.amount}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PaymentList;
