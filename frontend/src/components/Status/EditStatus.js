import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditStatus = () => {
    const { id } = useParams();  // Get the status ID from the URL
    const navigate = useNavigate();

    const [status, setStatus] = useState({ name: '', description: '' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch status data on component mount
    useEffect(() => {
        axios.get(`/api/statuses/${id}`)
            .then(response => {
                setStatus(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError('Error fetching status');
                setLoading(false);
            });
    }, [id]);

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setStatus(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Handle form submission to update status
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        axios.put(`/api/statuses/${id}`, status)
            .then(() => {
                setLoading(false);
                navigate(`/statuses/${id}`);  // Redirect to the status view page after update
            })
            .catch(err => {
                setError('Error updating status');
                setLoading(false);
            });
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h2>Edit Status</h2>
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
                <button type="submit" disabled={loading}>Save Changes</button>
            </form>
        </div>
    );
};

export default EditStatus;
