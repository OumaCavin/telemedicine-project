import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ViewPatient = () => {
    const { id } = useParams();
    const [patient, setPatient] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the patient's details from the backend
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

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h2>Patient Details</h2>
            {error && <div>{error}</div>}
            {patient && (
                <div>
                    <p><strong>Name:</strong> {patient.name}</p>
                    <p><strong>Age:</strong> {patient.age}</p>
                    <p><strong>Gender:</strong> {patient.gender}</p>
                    <p><strong>Medical History:</strong> {patient.medicalHistory}</p>
                    <button onClick={() => navigate(`/patients/edit/${patient.id}`)}>Edit</button>
                </div>
            )}
        </div>
    );
};

export default ViewPatient;
