import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const HistoryList = () => {
    const [histories, setHistories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch all health history entries from the backend
        axios.get('/api/histories')
            .then(response => {
                setHistories(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError('Error fetching history records');
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h2>Health Histories</h2>
            <Link to="/histories/create">Create New Health History</Link>
            <ul>
                {histories.map(history => (
                    <li key={history.id}>
                        <Link to={`/histories/${history.id}`}>{history.title}</Link> | 
                        <Link to={`/histories/edit/${history.id}`}> Edit</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HistoryList;
