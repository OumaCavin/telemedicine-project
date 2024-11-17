// frontend/src/components/Patient/BookAppointment.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Patient.css';

const BookAppointment = () => {
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState('');
    const [appointmentDate, setAppointmentDate] = useState('');

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await axios.get('/api/doctors');
                setDoctors(response.data);
            } catch (error) {
                console.error("Error fetching doctors", error);
            }
        };
        fetchDoctors();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/appointments', { doctorId: selectedDoctor, date: appointmentDate });
            alert("Appointment booked successfully!");
        } catch (error) {
            console.error("Error booking appointment", error);
            alert("Failed to book appointment. Please try again.");
        }
    };

    return (
        <div className="book-appointment">
            <h2>Book Appointment</h2>
            <form onSubmit={handleSubmit}>
                <select value={selectedDoctor} onChange={(e) => setSelectedDoctor(e.target.value)} required>
                    <option value="">Select a Doctor</option>
                    {doctors.map((doctor) => (
                        <option key={doctor.id} value={doctor.id}>{doctor.name}</option>
                    ))}
                </select>
                <input
                    type="datetime-local"
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                    required
                />
                <button type="submit">Book Appointment</button>
            </form>
        </div>
    );
};

export default BookAppointment;
