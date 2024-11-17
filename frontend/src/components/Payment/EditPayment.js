import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditPayment = () => {
    const { id } = useParams();  // Get the ID of the payment from the URL
    const navigate = useNavigate();
    
    const [payment, setPayment] = useState({
        paymentMethod: '',
        amount: '',
        paymentDate: '',
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch the existing payment data when the component mounts
    useEffect(() => {
        axios.get(`/api/payments/${id}`)
            .then(response => {
                setPayment(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError('Error fetching payment data');
                setLoading(false);
            });
    }, [id]);

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setPayment(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Handle form submission to update payment
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        axios.put(`/api/payments/${id}`, payment)
            .then(() => {
                setLoading(false);
                navigate(`/payments/${id}`);  // Redirect to the view page of the updated payment
            })
            .catch(err => {
                setError('Error updating payment');
                setLoading(false);
            });
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h2>Edit Payment</h2>
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
                <button type="submit" disabled={loading}>Save Changes</button>
            </form>
        </div>
    );
};

export default EditPayment;
