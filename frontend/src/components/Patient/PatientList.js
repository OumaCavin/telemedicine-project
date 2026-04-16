import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PatientList = () => {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch all patients from the backend
        axios.get('/api/patients')
            .then(response => {
                // Ensure we have an array
                const data = Array.isArray(response.data) ? response.data : [];
                setPatients(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching patients:', err);
                setError(err.response?.data?.error || 'Error fetching patients');
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="patient-list-container">
            <h2>Patient List</h2>
            {patients.length === 0 ? (
                <p>No patients found.</p>
            ) : (
                <ul>
                    {patients.map(patient => (
                        <li key={patient.patient_id}>
                            <Link to={`/patients/${patient.patient_id}`}>
                                {patient.first_name} {patient.last_name}
                            </Link> | 
                            <Link to={`/patients/edit/${patient.patient_id}`}> Edit</Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default PatientList;
