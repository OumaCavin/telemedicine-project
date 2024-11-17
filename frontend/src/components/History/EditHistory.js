import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditHistory = () => {
    const { id } = useParams();
    const [history, setHistory] = useState({
        title: '',
        description: '',
        date: '',
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the health history data to populate the form for editing
        axios.get(`/api/histories/${id}`)
            .then(response => {
                setHistory(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError('Error fetching health history data');
                setLoading(false);
            });
    }, [id]);

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

        // Send PUT request to update the health history data
        axios.put(`/api/histories/${id}`, history)
            .then(() => {
                setLoading(false);
                navigate(`/histories/${id}`); // Redirect to the health history view page
            })
            .catch(err => {
                setError('Error updating health history');
                setLoading(false);
            });
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h2>Edit Health History</h2>
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
                <button type="submit" disabled={loading}>Save Changes</button>
            </form>
        </div>
    );
};

export default EditHistory;
