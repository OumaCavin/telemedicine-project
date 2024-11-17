import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ViewPayment = () => {
    const { id } = useParams();  // Get the ID of the payment from the URL
    const navigate = useNavigate();

    const [payment, setPayment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch the payment data when the component mounts
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

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h2>Payment Details</h2>
            {payment && (
                <div>
                    <p><strong>Payment Method:</strong> {payment.paymentMethod}</p>
                    <p><strong>Amount:</strong> {payment.amount}</p>
                    <p><strong>Payment Date:</strong> {payment.paymentDate}</p>
                    <button onClick={() => navigate(`/payments/edit/${payment.id}`)}>Edit</button>
                </div>
            )}
        </div>
    );
};

export default ViewPayment;
