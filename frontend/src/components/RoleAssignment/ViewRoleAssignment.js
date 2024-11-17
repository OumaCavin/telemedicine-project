import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ViewRoleAssignment = () => {
    const { id } = useParams();
    const [assignment, setAssignment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch role assignment details
        axios.get(`/api/role-assignments/${id}`)
            .then(response => {
                setAssignment(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError('Error fetching role assignment data');
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h2>Role Assignment Details</h2>
            <p><strong>User:</strong> {assignment.userName}</p>
            <p><strong>Role:</strong> {assignment.roleName}</p>
            <button onClick={() => navigate('/role-assignments')}>Back to List</button>
        </div>
    );
};

export default ViewRoleAssignment;
