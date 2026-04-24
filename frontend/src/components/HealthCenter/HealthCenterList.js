import React, { useState, useEffect } from 'react';
import axios from '../../axios';
import { Link } from 'react-router-dom';

const HealthCenterList = () => {
    const [healthCenters, setHealthCenters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch all health centers from the backend
        axios.get('/api/health-centers')
            .then(response => {
                // Ensure we have an array
                const data = Array.isArray(response.data) ? response.data : [];
                setHealthCenters(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching health centers:', err);
                setError(err.response?.data?.error || 'Error fetching health centers');
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="healthcenter-list-container">
            <h2>Health Centers</h2>
            {healthCenters.length === 0 ? (
                <p>No health centers found.</p>
            ) : (
                <ul>
                    {healthCenters.map(center => (
                        <li key={center.health_center_id}>
                            <Link to={`/health-centers/${center.health_center_id}`}>
                                {center.name}
                            </Link> | 
                            <Link to={`/health-centers/edit/${center.health_center_id}`}> Edit</Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default HealthCenterList;
