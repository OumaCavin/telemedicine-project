import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateHealthCenter = () => {
    const [healthCenter, setHealthCenter] = useState({
        name: '',
        address: '',
        contactNumber: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setHealthCenter(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        // Create a new health center using POST request
        axios.post('/api/health-centers', healthCenter)
            .then(() => {
                setLoading(false);
                navigate('/health-centers'); // Redirect to health center list
            })
            .catch(err => {
                setError('Error creating health center');
                setLoading(false);
            });
    };

    return (
        <div>
            <h2>Create New Health Center</h2>
            {error && <div>{error}</div>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        value={healthCenter.name}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Address</label>
                    <input
                        type="text"
                        name="address"
                        value={healthCenter.address}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Contact Number</label>
                    <input
                        type="text"
                        name="contactNumber"
                        value={healthCenter.contactNumber}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" disabled={loading}>Create Health Center</button>
            </form>
        </div>
    );
};

export default CreateHealthCenter;
