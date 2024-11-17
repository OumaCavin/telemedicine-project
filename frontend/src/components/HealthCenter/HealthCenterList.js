import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const HealthCenterList = () => {
    const [healthCenters, setHealthCenters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch all health centers from the backend
        axios.get('/api/health-centers')
            .then(response => {
                setHealthCenters(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError('Error fetching health centers');
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h2>Health Centers</h2>
            <Link to="/health-centers/create">Create New Health Center</Link>
            <ul>
                {healthCenters.map(center => (
                    <li key={center.id}>
                        <Link to={`/health-centers/${center.id}`}>{center.name}</Link> | 
                        <Link to={`/health-centers/edit/${center.id}`}> Edit</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HealthCenterList;
