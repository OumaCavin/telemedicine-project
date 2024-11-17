import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditEhrRecord = () => {
    const { id } = useParams();
    const [ehrRecord, setEhrRecord] = useState({
        patientName: '',
        dateOfBirth: '',
        diagnosis: '',
        treatment: '',
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the existing EHR record data to populate the form
        axios.get(`/api/ehr-records/${id}`)
            .then(response => {
                setEhrRecord(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError('Error fetching EHR record data');
                setLoading(false);
            });
    }, [id]);

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

        // Send PUT request to update the EHR record
        axios.put(`/api/ehr-records/${id}`, ehrRecord)
            .then(() => {
                setLoading(false);
                navigate(`/ehr-records/${id}`); // Redirect to the EHR record view page
            })
            .catch(err => {
                setError('Error updating EHR record');
                setLoading(false);
            });
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h2>Edit EHR Record</h2>
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
                <button type="submit" disabled={loading}>Save Changes</button>
            </form>
        </div>
    );
};

export default EditEhrRecord;
