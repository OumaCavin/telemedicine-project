import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditAppointment = () => {
    const { id } = useParams();
    const [appointment, setAppointment] = useState({
        patientName: '',
        doctorName: '',
        date: '',
        time: '',
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the appointment data to populate the form for editing
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

        // Send PUT request to update the appointment's data
        axios.put(`/api/appointments/${id}`, appointment)
            .then(() => {
                setLoading(false);
                navigate(`/appointments/${id}`); // Redirect to the appointment's view page
            })
            .catch(err => {
                setError('Error updating appointment');
                setLoading(false);
            });
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h2>Edit Appointment</h2>
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
                <button type="submit" disabled={loading}>Save Changes</button>
            </form>
        </div>
    );
};

export default EditAppointment;
