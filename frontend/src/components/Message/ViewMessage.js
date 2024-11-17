import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ViewMessage = () => {
    const { id } = useParams();
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the message details from the backend
        axios.get(`/api/messages/${id}`)
            .then(response => {
                setMessage(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError('Error fetching message data');
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h2>Message Details</h2>
            {error && <div>{error}</div>}
            {message && (
                <div>
                    <p><strong>Subject:</strong> {message.subject}</p>
                    <p><strong>Body:</strong> {message.body}</p>
                    <p><strong>Recipient:</strong> {message.recipient}</p>
                    <button onClick={() => navigate(`/messages/edit/${id}`)}>Edit Message</button>
                </div>
            )}
        </div>
    );
};

export default ViewMessage;
