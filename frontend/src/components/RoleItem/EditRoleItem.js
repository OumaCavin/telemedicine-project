import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditRoleItem = () => {
    const { id } = useParams();
    const [roleItem, setRoleItem] = useState({ name: '', description: '' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the existing role item data to populate the form
        axios.get(`/api/role-items/${id}`)
            .then(response => {
                setRoleItem(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError('Error fetching role item data');
                setLoading(false);
            });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRoleItem(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        // Send PUT request to update the role item
        axios.put(`/api/role-items/${id}`, roleItem)
            .then(() => {
                setLoading(false);
                navigate(`/role-items/${id}`); // Redirect to the role item view page
            })
            .catch(err => {
                setError('Error updating role item');
                setLoading(false);
            });
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h2>Edit Role Item</h2>
            {error && <div>{error}</div>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Role Item Name</label>
                    <input
                        type="text"
                        name="name"
                        value={roleItem.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Description</label>
                    <textarea
                        name="description"
                        value={roleItem.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>Save Changes</button>
            </form>
        </div>
    );
};

export default EditRoleItem;
