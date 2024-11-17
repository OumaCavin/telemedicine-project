import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreatePrescription = () => {
    const [prescription, setPrescription] = useState({
        patientName: '',
        medication: '',
        dosage: '',
        instructions: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPrescription(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        // Create a new prescription using POST request
        axios.post('/api/prescriptions', prescription)
            .then(() => {
                setLoading(false);
                navigate('/prescriptions'); // Redirect to prescription list
            })
            .catch(err => {
                setError('Error creating prescription');
                setLoading(false);
            });
    };

    return (
        <div>
            <h2>Create New Prescription</h2>
            {error && <div>{error}</div>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Patient Name</label>
                    <input
                        type="text"
                        name="patientName"
                        value={prescription.patientName}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Medication</label>
                    <input
                        type="text"
                        name="medication"
                        value={prescription.medication}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Dosage</label>
                    <input
                        type="text"
                        name="dosage"
                        value={prescription.dosage}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Instructions</label>
                    <input
                        type="text"
                        name="instructions"
                        value={prescription.instructions}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" disabled={loading}>Create Prescription</button>
            </form>
        </div>
    );
};

export default CreatePrescription;
