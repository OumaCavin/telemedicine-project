import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateDoctor = () => {
    const [doctor, setDoctor] = useState({ name: '', specialty: '', contact: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

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

        // Create new doctor using POST request
        axios.post('/api/doctors', doctor)
            .then(() => {
                setLoading(false);
                navigate('/doctors'); // Redirect to the list of doctors
            })
            .catch(err => {
                setError('Error creating doctor');
                setLoading(false);
            });
    };

    return (
        <div>
            <h2>Create New Doctor</h2>
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
                <button type="submit" disabled={loading}>Create Doctor</button>
            </form>
        </div>
    );
};

export default CreateDoctor;
