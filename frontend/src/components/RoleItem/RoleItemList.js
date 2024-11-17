import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const RoleItemList = () => {
    const [roleItems, setRoleItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch all role items from the backend
        axios.get('/api/role-items')
            .then(response => {
                setRoleItems(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError('Error fetching role items');
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h2>Role Items</h2>
            <Link to="/role-items/create">Create New Role Item</Link>
            <ul>
                {roleItems.map(item => (
                    <li key={item.id}>
                        <Link to={`/role-items/${item.id}`}>{item.name}</Link> | 
                        <Link to={`/role-items/edit/${item.id}`}> Edit</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RoleItemList;
