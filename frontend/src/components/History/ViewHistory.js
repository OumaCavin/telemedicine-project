import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ViewHistory = () => {
    const { id } = useParams();
    const [history, setHistory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the health history details from the backend
        axios.get(`/api/histories/${id}`)
            .then(response => {
                setHistory(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError('Error fetching health history data');
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h2>Health History Details</h2>
            {error && <div>{error}</div>}
            {history && (
                <div>
                    <p><strong>Title:</strong> {history.title}</p>
                    <p><strong>Description:</strong> {history.description}</p>
                    <p><strong>Date:</strong> {history.date}</p>
                    <button onClick={() => navigate(`/histories/edit/${id}`)}>Edit Health History</button>
                </div>
            )}
        </div>
    );
};

export default ViewHistory;
