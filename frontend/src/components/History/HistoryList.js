import React, { useState, useEffect } from 'react';
import axios from '../../axios';
import { Link } from 'react-router-dom';

const HistoryList = () => {
    const [histories, setHistories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch all health history entries from the backend
        axios.get('/histories')
            .then(response => {
                if (Array.isArray(response.data)) {
                    setHistories(response.data);
                } else {
                    setHistories([]);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching history records:', err);
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
                {histories.length === 0 ? (
                    <li>No health history records found.</li>
                ) : (
                    histories.map(history => (
                        <li key={history.history_id || history.id}>
                            <Link to={`/histories/${history.id}`}>{history.title}</Link> | 
                            <Link to={`/histories/edit/${history.id}`}> Edit</Link>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default HistoryList;
