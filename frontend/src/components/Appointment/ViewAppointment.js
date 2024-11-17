import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ViewAppointment = () => {
    const { id } = useParams();
    const [appointment, setAppointment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the appointment details from the backend
        axios.get(`/api/appointments/${id}`)
            .then(response => {
                setAppointment(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError('Error fetching appointment data');
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h2>Appointment Details</h2>
            {error && <div>{error}</div>}
            {appointment && (
                <div>
                    <p><strong>Patient Name:</strong> {appointment.patientName}</p>
                    <p><strong>Doctor Name:</strong> {appointment.doctorName}</p>
                    <p><strong>Date:</strong> {appointment.date}</p>
                    <p><strong>Time:</strong> {appointment.time}</p>
                    <button onClick={() => navigate(`/appointments/edit/${appointment.id}`)}>Edit</button>
                </div>
            )}
        </div>
    );
};

export default ViewAppointment;
