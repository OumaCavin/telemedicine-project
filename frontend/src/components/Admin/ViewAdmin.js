import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ViewAdmin = () => {
    const { id } = useParams();  // Get the admin ID from the URL
    const [admin, setAdmin] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Fetch admin data for viewing
    useEffect(() => {
        axios.get(`/api/admins/${id}`)
            .then(response => {
                setAdmin(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError('Error fetching admin data');
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h2>Admin Details</h2>
            {error && <div>{error}</div>}
            {admin && (
                <div>
                    <p><strong>Name:</strong> {admin.name}</p>
                    <p><strong>Email:</strong> {admin.email}</p>
                    <p><strong>Role:</strong> {admin.role}</p>
                    <button onClick={() => navigate(`/admins/edit/${admin.id}`)}>Edit</button>
                </div>
            )}
        </div>
    );
};

export default ViewAdmin;
