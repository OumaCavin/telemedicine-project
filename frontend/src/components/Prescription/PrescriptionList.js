import React, { useState, useEffect } from 'react';
import axios from '../../axios';
import { Link } from 'react-router-dom';

const PrescriptionList = () => {
    const [prescriptions, setPrescriptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch all prescriptions from the backend
        axios.get('/api/prescriptions')
            .then(response => {
                // Ensure we have an array
                const data = Array.isArray(response.data) ? response.data : [];
                setPrescriptions(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching prescriptions:', err);
                setError(err.response?.data?.error || 'Error fetching prescriptions');
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="prescription-list-container">
            <h2>Prescription List</h2>
            {prescriptions.length === 0 ? (
                <p>No prescriptions found.</p>
            ) : (
                <ul>
                    {prescriptions.map(prescription => (
                        <li key={prescription.prescription_id}>
                            <Link to={`/prescriptions/${prescription.prescription_id}`}>
                                {prescription.patientName} - {prescription.medication}
                            </Link> | 
                            <Link to={`/prescriptions/edit/${prescription.prescription_id}`}> Edit</Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default PrescriptionList;
