import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ViewUser = () => {
    const { id } = useParams();  // Get the user ID from the URL
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Fetch user data for viewing
    useEffect(() => {
        axios.get(`/api/users/${id}`)
            .then(response => {
                setUser(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError('Error fetching user data');
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h2>User Details</h2>
            {error && <div>{error}</div>}
            {user && (
                <div>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Role:</strong> {user.role}</p>
                    <button onClick={() => navigate(`/users/edit/${user.id}`)}>Edit</button>
                </div>
            )}
        </div>
    );
};

export default ViewUser;
