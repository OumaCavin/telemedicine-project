import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AppointmentList = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch all appointments from the backend
        axios.get('/api/appointments')
            .then(response => {
                setAppointments(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError('Error fetching appointments');
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h2>Appointment List</h2>
            <Link to="/appointments/create">Create New Appointment</Link>
            <ul>
                {appointments.map(appointment => (
                    <li key={appointment.id}>
                        <Link to={`/appointments/${appointment.id}`}>{appointment.patientName} - {appointment.doctorName}</Link> | 
                        <Link to={`/appointments/edit/${appointment.id}`}> Edit</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AppointmentList;
