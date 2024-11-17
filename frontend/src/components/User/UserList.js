import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch users from the backend
    useEffect(() => {
        axios.get('/api/users')
            .then(response => {
                setUsers(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError('Error fetching users');
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h2>User List</h2>
            <Link to="/users/create">Create New User</Link>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        <Link to={`/users/${user.id}`}>{user.name}</Link>
                        {' | '}
                        <Link to={`/users/edit/${user.id}`}>Edit</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;
