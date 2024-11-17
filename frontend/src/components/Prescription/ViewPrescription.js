import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ViewPrescription = () => {
    const { id } = useParams();
    const [prescription, setPrescription] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the prescription details from the backend
        axios.get(`/api/prescriptions/${id}`)
            .then(response => {
                setPrescription(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError('Error fetching prescription data');
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h2>Prescription Details</h2>
            {error && <div>{error}</div>}
            {prescription && (
                <div>
                    <p><strong>Patient Name:</strong> {prescription.patientName}</p>
                    <p><strong>Medication:</strong> {prescription.medication}</p>
                    <p><strong>Dosage:</strong> {prescription.dosage}</p>
                    <p><strong>Instructions:</strong> {prescription.instructions}</p>
                    <button onClick={() => navigate(`/prescriptions/edit/${id}`)}>Edit Prescription</button>
                </div>
            )}
        </div>
    );
};

export default ViewPrescription;
