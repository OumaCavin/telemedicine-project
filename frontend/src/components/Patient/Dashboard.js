// frontend/src/components/Patient/Dashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Patient.css';

const PatientDashboard = () => {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await axios.get('/api/patients/appointments');
                setAppointments(response.data);
            } catch (error) {
                console.error("Error fetching appointments", error);
            }
        };
        fetchAppointments();
    }, []);

    return (
        <div className="patient-dashboard">
            <h2>Your Appointments</h2>
            <ul>
                {appointments.map((appointment) => (
                    <li key={appointment.id}>
                        {appointment.date} - {appointment.doctorName}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PatientDashboard;
