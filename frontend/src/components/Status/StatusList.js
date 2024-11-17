import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const StatusList = () => {
    const [statuses, setStatuses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch the list of statuses when the component mounts
    useEffect(() => {
        axios.get('/api/statuses')
            .then(response => {
                setStatuses(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError('Error fetching statuses');
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h2>Status List</h2>
            <Link to="/statuses/create">Create Status</Link>
            <ul>
                {statuses.map(status => (
                    <li key={status.id}>
                        <Link to={`/statuses/${status.id}`}>{status.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default StatusList;
