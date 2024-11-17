import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PrescriptionList = () => {
    const [prescriptions, setPrescriptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch all prescriptions from the backend
        axios.get('/api/prescriptions')
            .then(response => {
                setPrescriptions(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError('Error fetching prescriptions');
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h2>Prescription List</h2>
            <Link to="/prescriptions/create">Create New Prescription</Link>
            <ul>
                {prescriptions.map(prescription => (
                    <li key={prescription.id}>
                        <Link to={`/prescriptions/${prescription.id}`}>{prescription.patientName} - {prescription.medication}</Link> | 
                        <Link to={`/prescriptions/edit/${prescription.id}`}> Edit</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PrescriptionList;
