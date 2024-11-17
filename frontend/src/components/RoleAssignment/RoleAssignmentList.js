import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const RoleAssignmentList = () => {
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch all role assignments from the backend
        axios.get('/api/role-assignments')
            .then(response => {
                setAssignments(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError('Error fetching role assignments');
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h2>Role Assignments</h2>
            <Link to="/role-assignments/create">Create New Assignment</Link>
            <ul>
                {assignments.map(assignment => (
                    <li key={assignment.id}>
                        <Link to={`/role-assignments/${assignment.id}`}>{assignment.userName} - {assignment.roleName}</Link> | 
                        <Link to={`/role-assignments/edit/${assignment.id}`}> Edit</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RoleAssignmentList;
