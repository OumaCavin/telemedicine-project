import React, { useState, useEffect } from 'react';
import axios from '../../axios';
import { Link } from 'react-router-dom';

const AppointmentList = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch all appointments from the backend
        axios.get('/appointments')
            .then(response => {
                // Ensure we have an array
                const data = Array.isArray(response.data) ? response.data : [];
                setAppointments(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching appointments:', err);
                setError(err.response?.data?.error || 'Error fetching appointments');
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="appointment-list-container">
            <h2>Appointment List</h2>
            {appointments.length === 0 ? (
                <p>No appointments found.</p>
            ) : (
                <ul>
                    {appointments.map(appointment => (
                        <li key={appointment.appointment_id}>
                            <Link to={`/appointments/${appointment.appointment_id}`}>
                                {appointment.patientName} - {appointment.doctorName}
                            </Link> | 
                            <Link to={`/appointments/edit/${appointment.appointment_id}`}> Edit</Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AppointmentList;
