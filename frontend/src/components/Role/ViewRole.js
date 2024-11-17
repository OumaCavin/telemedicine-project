import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ViewRole = () => {
    const { id } = useParams();
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the role details from the backend
        axios.get(`/api/roles/${id}`)
            .then(response => {
                setRole(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError('Error fetching role data');
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h2>Role Details</h2>
            {error && <div>{error}</div>}
            {role && (
                <div>
                    <p><strong>Name:</strong> {role.name}</p>
                    <p><strong>Description:</strong> {role.description}</p>
                    <button onClick={() => navigate(`/roles/edit/${id}`)}>Edit Role</button>
                </div>
            )}
        </div>
    );
};

export default ViewRole;
