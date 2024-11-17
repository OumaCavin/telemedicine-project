import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateStatus = () => {
    const [status, setStatus] = useState({ name: '', description: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setStatus(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Handle form submission to create a new status
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        axios.post('/api/statuses', status)
            .then(() => {
                setLoading(false);
                navigate('/statuses');  // Redirect to status list after creation
            })
            .catch(err => {
                setError('Error creating status');
                setLoading(false);
            });
    };

    return (
        <div>
            <h2>Create Status</h2>
            {error && <div>{error}</div>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        value={status.name}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Description</label>
                    <textarea
                        name="description"
                        value={status.description}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" disabled={loading}>Submit</button>
            </form>
        </div>
    );
};

export default CreateStatus;
