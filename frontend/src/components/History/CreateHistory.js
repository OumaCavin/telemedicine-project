import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateHistory = () => {
    const [history, setHistory] = useState({
        title: '',
        description: '',
        date: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setHistory(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        // Create a new health history record using POST request
        axios.post('/api/histories', history)
            .then(() => {
                setLoading(false);
                navigate('/histories'); // Redirect to history list
            })
            .catch(err => {
                setError('Error creating health history');
                setLoading(false);
            });
    };

    return (
        <div>
            <h2>Create New Health History</h2>
            {error && <div>{error}</div>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title</label>
                    <input
                        type="text"
                        name="title"
                        value={history.title}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Description</label>
                    <textarea
                        name="description"
                        value={history.description}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Date</label>
                    <input
                        type="date"
                        name="date"
                        value={history.date}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" disabled={loading}>Create Health History</button>
            </form>
        </div>
    );
};

export default CreateHistory;
