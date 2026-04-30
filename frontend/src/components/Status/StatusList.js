import React, { useState, useEffect } from 'react';
import axios from '../../axios';
import { Link } from 'react-router-dom';

const StatusList = () => {
    const [statuses, setStatuses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch the list of statuses when the component mounts
    useEffect(() => {
        axios.get('/statuses')
            .then(response => {
                if (Array.isArray(response.data)) {
                    setStatuses(response.data);
                } else {
                    setStatuses([]);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching statuses:', err);
                setError('Error fetching statuses');
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h2>Status List</h2>
            {statuses.length === 0 ? (
                <p>No statuses found</p>
            ) : (
                <ul>
                    {statuses.map(status => (
                        <li key={status.status_id || status.id}>
                            <Link to={`/statuses/${status.status_id || status.id}`}>{status.name}</Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default StatusList;
