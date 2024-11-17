import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ViewStatus = () => {
    const { id } = useParams();  // Get the status ID from the URL
    const navigate = useNavigate();

    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch the status data on component mount
    useEffect(() => {
        axios.get(`/api/statuses/${id}`)
            .then(response => {
                setStatus(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError('Error fetching status');
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h2>Status Details</h2>
            {status && (
                <div>
                    <p><strong>Name:</strong> {status.name}</p>
                    <p><strong>Description:</strong> {status.description}</p>
                    <button onClick={() => navigate(`/statuses/edit/${status.id}`)}>Edit</button>
                </div>
            )}
        </div>
    );
};

export default ViewStatus;
