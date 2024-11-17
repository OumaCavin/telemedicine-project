import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ViewRoleItem = () => {
    const { id } = useParams();
    const [roleItem, setRoleItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the role item details
        axios.get(`/api/role-items/${id}`)
            .then(response => {
                setRoleItem(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError('Error fetching role item data');
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h2>Role Item Details</h2>
            <p><strong>Name:</strong> {roleItem.name}</p>
            <p><strong>Description:</strong> {roleItem.description}</p>
            <button onClick={() => navigate('/role-items')}>Back to List</button>
        </div>
    );
};

export default ViewRoleItem;
