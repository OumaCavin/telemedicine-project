import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateRole = () => {
    const [role, setRole] = useState({ name: '', description: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRole(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        // Send a POST request to create a new role
        axios.post('/api/roles', role)
            .then(() => {
                setLoading(false);
                navigate('/roles'); // Redirect to the list of roles
            })
            .catch(err => {
                setError('Error creating role');
                setLoading(false);
            });
    };

    return (
        <div>
            <h2>Create New Role</h2>
            {error && <div>{error}</div>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        value={role.name}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Description</label>
                    <textarea
                        name="description"
                        value={role.description}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" disabled={loading}>Create Role</button>
            </form>
        </div>
    );
};

export default CreateRole;
