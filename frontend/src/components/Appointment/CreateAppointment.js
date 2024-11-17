import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateAppointment = () => {
    const [appointment, setAppointment] = useState({
        patientName: '',
        doctorName: '',
        date: '',
        time: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAppointment(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        // Create new appointment using POST request
        axios.post('/api/appointments', appointment)
            .then(() => {
                setLoading(false);
                navigate('/appointments'); // Redirect to the list of appointments
            })
            .catch(err => {
                setError('Error creating appointment');
                setLoading(false);
            });
    };

    return (
        <div>
            <h2>Create New Appointment</h2>
            {error && <div>{error}</div>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Patient Name</label>
                    <input
                        type="text"
                        name="patientName"
                        value={appointment.patientName}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Doctor Name</label>
                    <input
                        type="text"
                        name="doctorName"
                        value={appointment.doctorName}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Date</label>
                    <input
                        type="date"
                        name="date"
                        value={appointment.date}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Time</label>
                    <input
                        type="time"
                        name="time"
                        value={appointment.time}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" disabled={loading}>Create Appointment</button>
            </form>
        </div>
    );
};

export default CreateAppointment;
