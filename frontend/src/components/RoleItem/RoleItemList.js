import React, { useState, useEffect } from 'react';
import axios from '../../axios';
import { Link } from 'react-router-dom';

const RoleItemList = () => {
    const [roleItems, setRoleItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch all role items from the backend
        axios.get('/role-items')
            .then(response => {
                // Ensure we have an array
                const data = Array.isArray(response.data) ? response.data : [];
                setRoleItems(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching role items:', err);
                setError(err.response?.data?.error || 'Error fetching role items');
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="roleitem-list-container">
            <h2>Role Items</h2>
            {roleItems.length === 0 ? (
                <p>No role items found.</p>
            ) : (
                <ul>
                    {roleItems.map(item => (
                        <li key={item.role_item_id || item.id}>
                            <Link to={`/role-items/${item.role_item_id || item.id}`}>
                                {item.name}
                            </Link> | 
                            <Link to={`/role-items/edit/${item.role_item_id || item.id}`}> Edit</Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default RoleItemList;
