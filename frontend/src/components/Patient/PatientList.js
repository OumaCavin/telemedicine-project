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
                setPatients(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError('Error fetching patients');
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h2>Patient List</h2>
            <Link to="/patients/create">Create New Patient</Link>
            <ul>
                {patients.map(patient => (
                    <li key={patient.id}>
                        <Link to={`/patients/${patient.id}`}>{patient.name}</Link> | 
                        <Link to={`/patients/edit/${patient.id}`}> Edit</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PatientList;
