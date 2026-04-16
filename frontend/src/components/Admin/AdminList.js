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
                // Ensure we have an array
                const data = Array.isArray(response.data) ? response.data : [];
                setAdmins(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching admins:', err);
                setError(err.response?.data?.error || 'Error fetching admins');
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="admin-list-container">
            <h2>Admin List</h2>
            {admins.length === 0 ? (
                <p>No admins found.</p>
            ) : (
                <ul>
                    {admins.map(admin => (
                        <li key={admin.admin_id || admin.id}>
                            <Link to={`/admins/${admin.admin_id || admin.id}`}>
                                {admin.name}
                            </Link>
                            {' | '}
                            <Link to={`/admins/edit/${admin.admin_id || admin.id}`}>Edit</Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AdminList;
