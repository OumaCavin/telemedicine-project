import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const DoctorList = () => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch all doctors from the backend
        axios.get('/api/doctors')
            .then(response => {
                setDoctors(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError('Error fetching doctors');
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h2>Doctor List</h2>
            <Link to="/doctors/create">Create New Doctor</Link>
            <ul>
                {doctors.map(doctor => (
                    <li key={doctor.id}>
                        <Link to={`/doctors/${doctor.id}`}>{doctor.name}</Link> | 
                        <Link to={`/doctors/edit/${doctor.id}`}> Edit</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DoctorList;
