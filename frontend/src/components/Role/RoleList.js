import React, { useState, useEffect } from 'react';
import axios from '../../axios';
import { Link } from 'react-router-dom';

const RoleList = () => {
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch all roles from the backend
        axios.get('/roles')
            .then(response => {
                if (Array.isArray(response.data)) {
                    setRoles(response.data);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching roles:', err);
                setError('Error fetching roles');
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h2>Roles</h2>
            <Link to="/roles/create">Create New Role</Link>
            <ul>
                {roles && roles.length > 0 ? roles.map(role => (
                    <li key={role.role_id || role.id}>
                        <Link to={`/roles/${role.id}`}>{role.name}</Link> | 
                        <Link to={`/roles/edit/${role.id}`}> Edit</Link>
                    </li>
                )) : <li>No roles found</li>}
            </ul>
        </div>
    );
};

export default RoleList;
