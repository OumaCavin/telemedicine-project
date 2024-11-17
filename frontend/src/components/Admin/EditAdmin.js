import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditAdmin = () => {
    const { id } = useParams();  // Get the admin ID from the URL
    const [admin, setAdmin] = useState({ name: '', email: '', role: '' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Fetch admin data for editing
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

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setAdmin(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Handle form submission to update admin data
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        // Send PUT request to update the admin
        axios.put(`/api/admins/${id}`, admin)
            .then(() => {
                setLoading(false);
                navigate(`/admins/${id}`); // Redirect to admin details page after update
            })
            .catch(err => {
                setError('Error updating admin');
                setLoading(false);
            });
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h2>Edit Admin</h2>
            {error && <div>{error}</div>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        value={admin.name}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={admin.email}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Role</label>
                    <input
                        type="text"
                        name="role"
                        value={admin.role}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" disabled={loading}>Save Changes</button>
            </form>
        </div>
    );
};

export default EditAdmin;
