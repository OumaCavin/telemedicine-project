// frontend/src/components/Doctor/Schedule.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Doctor.css';

const Schedule = () => {
    const [availability, setAvailability] = useState([]);

    useEffect(() => {
        const fetchAvailability = async () => {
            try {
                const response = await axios.get('/api/doctors/availability');
                setAvailability(response.data);
            } catch (error) {
                console.error("Error fetching availability", error);
            }
        };
        fetchAvailability();

    }, []);

    return (
        <div className="doctor-schedule">
            <h2>Your Availability</h2>
            <ul>
                {availability.map((slot) => (
                    <li key={slot.id}>
                        {slot.date} - {slot.time}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Schedule;
