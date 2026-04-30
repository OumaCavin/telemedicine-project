import React, { useState, useEffect } from 'react';
import axios from '../../axios';
import { Link } from 'react-router-dom';

const DoctorList = () => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch all doctors from the backend
        axios.get('/doctors')
            .then(response => {
                // Ensure we have an array
                const data = Array.isArray(response.data) ? response.data : [];
                setDoctors(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching doctors:', err);
                setError(err.response?.data?.error || 'Error fetching doctors');
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="doctor-list-container">
            <h2>Doctor List</h2>
            {doctors.length === 0 ? (
                <p>No doctors found.</p>
            ) : (
                <ul>
                    {doctors.map(doctor => (
                        <li key={doctor.doctor_id}>
                            <Link to={`/doctors/${doctor.doctor_id}`}>
                                Dr. {doctor.first_name} {doctor.last_name}
                            </Link> | 
                            <Link to={`/doctors/edit/${doctor.doctor_id}`}> Edit</Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default DoctorList;
