import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ViewEhrRecord = () => {
    const { id } = useParams();
    const [ehrRecord, setEhrRecord] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the EHR record details
        axios.get(`/api/ehr-records/${id}`)
            .then(response => {
                setEhrRecord(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError('Error fetching EHR record details');
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h2>{ehrRecord.patientName}</h2>
            <p><strong>Date of Birth:</strong> {ehrRecord.dateOfBirth}</p>
            <p><strong>Diagnosis:</strong> {ehrRecord.diagnosis}</p>
            <p><strong>Treatment:</strong> {ehrRecord.treatment}</p>
            <button onClick={() => navigate(`/ehr-records/edit/${id}`)}>Edit</button>
        </div>
    );
};

export default ViewEhrRecord;
