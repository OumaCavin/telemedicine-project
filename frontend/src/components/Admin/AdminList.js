import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AdminList = () => {
    const [admins, setAdmins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch admins from the backend
    useEffect(() => {
        axios.get('/api/admins')
            .then(response => {
                setAdmins(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError('Error fetching admins');
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h2>Admin List</h2>
            <Link to="/admins/create">Create New Admin</Link>
            <ul>
                {admins.map(admin => (
                    <li key={admin.id}>
                        <Link to={`/admins/${admin.id}`}>{admin.name}</Link>
                        {' | '}
                        <Link to={`/admins/edit/${admin.id}`}>Edit</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminList;
