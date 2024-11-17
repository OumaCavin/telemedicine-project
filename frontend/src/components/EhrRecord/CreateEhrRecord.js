import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateEhrRecord = () => {
    const [ehrRecord, setEhrRecord] = useState({
        patientName: '',
        dateOfBirth: '',
        diagnosis: '',
        treatment: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEhrRecord(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        // Send a POST request to create a new EHR record
        axios.post('/api/ehr-records', ehrRecord)
            .then(() => {
                setLoading(false);
                navigate('/ehr-records'); // Redirect to the list of EHR records
            })
            .catch(err => {
                setError('Error creating EHR record');
                setLoading(false);
            });
    };

    return (
        <div>
            <h2>Create EHR Record</h2>
            {error && <div>{error}</div>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Patient Name</label>
                    <input
                        type="text"
                        name="patientName"
                        value={ehrRecord.patientName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Date of Birth</label>
                    <input
                        type="date"
                        name="dateOfBirth"
                        value={ehrRecord.dateOfBirth}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Diagnosis</label>
                    <textarea
                        name="diagnosis"
                        value={ehrRecord.diagnosis}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Treatment</label>
                    <textarea
                        name="treatment"
                        value={ehrRecord.treatment}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>Create EHR Record</button>
            </form>
        </div>
    );
};

export default CreateEhrRecord;
