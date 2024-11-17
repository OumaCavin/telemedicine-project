import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreatePatient = () => {
    const [patient, setPatient] = useState({ name: '', age: '', gender: '', medicalHistory: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPatient(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        // Create new patient using POST request
        axios.post('/api/patients', patient)
            .then(() => {
                setLoading(false);
                navigate('/patients'); // Redirect to the list of patients
            })
            .catch(err => {
                setError('Error creating patient');
                setLoading(false);
            });
    };

    return (
        <div>
            <h2>Create New Patient</h2>
            {error && <div>{error}</div>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        value={patient.name}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Age</label>
                    <input
                        type="number"
                        name="age"
                        value={patient.age}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Gender</label>
                    <input
                        type="text"
                        name="gender"
                        value={patient.gender}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Medical History</label>
                    <textarea
                        name="medicalHistory"
                        value={patient.medicalHistory}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" disabled={loading}>Create Patient</button>
            </form>
        </div>
    );
};

export default CreatePatient;
