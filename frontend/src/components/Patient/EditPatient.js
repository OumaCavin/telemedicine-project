import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditPatient = () => {
    const { id } = useParams();
    const [patient, setPatient] = useState({ name: '', age: '', gender: '', medicalHistory: '' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the patient data to populate the form for editing
        axios.get(`/api/patients/${id}`)
            .then(response => {
                setPatient(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError('Error fetching patient data');
                setLoading(false);
            });
    }, [id]);

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

        // Send PUT request to update the patient's data
        axios.put(`/api/patients/${id}`, patient)
            .then(() => {
                setLoading(false);
                navigate(`/patients/${id}`); // Redirect to the patient’s view page
            })
            .catch(err => {
                setError('Error updating patient');
                setLoading(false);
            });
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h2>Edit Patient</h2>
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
                <button type="submit" disabled={loading}>Save Changes</button>
            </form>
        </div>
    );
};

export default EditPatient;
