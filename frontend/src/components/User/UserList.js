import React, { useState, useEffect } from 'react';
import axios from '../../axios';
import { Link } from 'react-router-dom';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch users from the backend
    useEffect(() => {
        axios.get('/api/users')
            .then(response => {
                if (Array.isArray(response.data)) {
                    setUsers(response.data);
                } else {
                    setUsers([]);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching users:', err);
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
                {users && users.length > 0 ? (
                    <ul>
                        {users.map(user => (
                            <li key={user.user_id || user.id}>
                                <Link to={`/users/${user.user_id || user.id}`}>{user.name}</Link>
                                {' | '}
                                <Link to={`/users/${user.user_id || user.id}/edit`}>Edit</Link>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No users found.</p>
                )}
        </div>
    );
};

export default UserList;
