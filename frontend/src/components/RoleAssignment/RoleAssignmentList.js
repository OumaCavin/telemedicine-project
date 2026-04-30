import React, { useState, useEffect } from 'react';
import axios from '../../axios';
import { Link } from 'react-router-dom';

const RoleAssignmentList = () => {
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch all role assignments from the backend
        axios.get('/role-assignments')
            .then(response => {
                // Ensure we have an array
                const data = Array.isArray(response.data) ? response.data : [];
                setAssignments(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching role assignments:', err);
                setError(err.response?.data?.error || 'Error fetching role assignments');
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="roleassignment-list-container">
            <h2>Role Assignments</h2>
            <Link to="/role-assignment/create">
                <button type="button" className="create-btn">Add Role Assignment</button>
            </Link>
            {assignments.length === 0 ? (
                <p>No role assignments found.</p>
            ) : (
                <ul>
                    {assignments.map(assignment => (
                        <li key={assignment.role_assignment_id || assignment.id}>
                            <Link to={`/role-assignments/${assignment.role_assignment_id || assignment.id}`}>
                                {assignment.userName} - {assignment.roleName}
                            </Link> | 
                            <Link to={`/role-assignments/edit/${assignment.role_assignment_id || assignment.id}`}> Edit</Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default RoleAssignmentList;
