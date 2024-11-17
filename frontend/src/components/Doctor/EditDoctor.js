import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditDoctor = () => {
    const { id } = useParams();
    const [doctor, setDoctor] = useState({ name: '', specialty: '', contact: '' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the doctor data to populate the form for editing
        axios.get(`/api/doctors/${id}`)
            .then(response => {
                setDoctor(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError('Error fetching doctor data');
                setLoading(false);
            });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDoctor(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        // Send PUT request to update the doctor's data
        axios.put(`/api/doctors/${id}`, doctor)
            .then(() => {
                setLoading(false);
                navigate(`/doctors/${id}`); // Redirect to the doctor’s view page
            })
            .catch(err => {
                setError('Error updating doctor');
                setLoading(false);
            });
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h2>Edit Doctor</h2>
            {error && <div>{error}</div>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        value={doctor.name}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Specialty</label>
                    <input
                        type="text"
                        name="specialty"
                        value={doctor.specialty}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Contact</label>
                    <input
                        type="text"
                        name="contact"
                        value={doctor.contact}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" disabled={loading}>Save Changes</button>
            </form>
        </div>
    );
};

export default EditDoctor;
