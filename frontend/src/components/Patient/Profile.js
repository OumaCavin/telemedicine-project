// frontend/src/components/Patient/Profile.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Patient.css';

const PatientProfile = () => {
    const [profile, setProfile] = useState({});

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get('/api/patients/profile');
                setProfile(response.data);
            } catch (error) {
                console.error("Error fetching profile", error);
            }
        };
        fetchProfile();
    }, []);

    return (
        <div className="patient-profile">
            <h2>Your Profile</h2>
            <p>Name: {profile.name}</p>
            <p>Email: {profile.email}</p>
            <p>Phone: {profile.phone}</p>
        </div>
    );
};

export default PatientProfile;
