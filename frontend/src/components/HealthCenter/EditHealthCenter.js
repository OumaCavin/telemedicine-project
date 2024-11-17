import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditHealthCenter = () => {
    const { id } = useParams();
    const [healthCenter, setHealthCenter] = useState({
        name: '',
        address: '',
        contactNumber: '',
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the health center data to populate the form for editing
        axios.get(`/api/health-centers/${id}`)
            .then(response => {
                setHealthCenter(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError('Error fetching health center data');
                setLoading(false);
            });
    }, [id]);

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

        // Send PUT request to update the health center data
        axios.put(`/api/health-centers/${id}`, healthCenter)
            .then(() => {
                setLoading(false);
                navigate(`/health-centers/${id}`); // Redirect to the health center view page
            })
            .catch(err => {
                setError('Error updating health center');
                setLoading(false);
            });
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h2>Edit Health Center</h2>
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
                <button type="submit" disabled={loading}>Save Changes</button>
            </form>
        </div>
    );
};

export default EditHealthCenter;
