import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ViewHealthCenter = () => {
    const { id } = useParams();
    const [healthCenter, setHealthCenter] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the health center details from the backend
        axios.get(`/api/health-centers/${id}`)
            .then(response => {
                setHealthCenter(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError('Error fetching health center data');
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h2>Health Center Details</h2>
            {error && <div>{error}</div>}
            {healthCenter && (
                <div>
                    <p><strong>Name:</strong> {healthCenter.name}</p>
                    <p><strong>Address:</strong> {healthCenter.address}</p>
                    <p><strong>Contact Number:</strong> {healthCenter.contactNumber}</p>
                    <button onClick={() => navigate(`/health-centers/edit/${id}`)}>Edit Health Center</button>
                </div>
            )}
        </div>
    );
};

export default ViewHealthCenter;
