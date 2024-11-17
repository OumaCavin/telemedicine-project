import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateRoleItem = () => {
    const [roleItem, setRoleItem] = useState({ name: '', description: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

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

        // Send a POST request to create a new role item
        axios.post('/api/role-items', roleItem)
            .then(() => {
                setLoading(false);
                navigate('/role-items'); // Redirect to the list of role items
            })
            .catch(err => {
                setError('Error creating role item');
                setLoading(false);
            });
    };

    return (
        <div>
            <h2>Create Role Item</h2>
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
                <button type="submit" disabled={loading}>Create Role Item</button>
            </form>
        </div>
    );
};

export default CreateRoleItem;
