import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreatePayment = () => {
    const [payment, setPayment] = useState({
        paymentMethod: '',
        amount: '',
        paymentDate: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setPayment(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Handle form submission to create payment
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        axios.post('/api/payments', payment)
            .then(() => {
                setLoading(false);
                navigate('/payments');  // Redirect to the payments list after creation
            })
            .catch(err => {
                setError('Error creating payment');
                setLoading(false);
            });
    };

    return (
        <div>
            <h2>Create Payment</h2>
            {error && <div>{error}</div>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Payment Method</label>
                    <input
                        type="text"
                        name="paymentMethod"
                        value={payment.paymentMethod}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Amount</label>
                    <input
                        type="number"
                        name="amount"
                        value={payment.amount}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Payment Date</label>
                    <input
                        type="date"
                        name="paymentDate"
                        value={payment.paymentDate}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" disabled={loading}>Submit</button>
            </form>
        </div>
    );
};

export default CreatePayment;
