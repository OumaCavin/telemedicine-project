import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateAdmin = () => {
    const [admin, setAdmin] = useState({ name: '', email: '', role: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setAdmin(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        // Send POST request to create a new admin
        axios.post('/api/admins', admin)
            .then(() => {
                setLoading(false);
                navigate('/admins'); // Redirect to admin list after successful creation
            })
            .catch(err => {
                setError('Error creating admin');
                setLoading(false);
            });
    };

    return (
        <div>
            <h2>Create New Admin</h2>
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
                <button type="submit" disabled={loading}>Create Admin</button>
            </form>
        </div>
    );
};

export default CreateAdmin;
