import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateUser = () => {
    const [user, setUser] = useState({ name: '', email: '', role: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        // Send POST request to create a new user
        axios.post('/api/users', user)
            .then(() => {
                setLoading(false);
                navigate('/users'); // Redirect to user list after successful creation
            })
            .catch(err => {
                setError('Error creating user');
                setLoading(false);
            });
    };

    return (
        <div>
            <h2>Create New User</h2>
            {error && <div>{error}</div>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        value={user.name}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Role</label>
                    <input
                        type="text"
                        name="role"
                        value={user.role}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" disabled={loading}>Create User</button>
            </form>
        </div>
    );
};

export default CreateUser;
