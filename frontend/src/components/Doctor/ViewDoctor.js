import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ViewDoctor = () => {
    const { id } = useParams();
    const [doctor, setDoctor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the doctor's details from the backend
        axios.get(`/api/doctors/${id}`)
            .then(response => {
                setDoctor(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError('Error fetching doctor data');
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h2>Doctor Details</h2>
            {error && <div>{error}</div>}
            {doctor && (
                <div>
                    <p><strong>Name:</strong> {doctor.name}</p>
                    <p><strong>Specialty:</strong> {doctor.specialty}</p>
                    <p><strong>Contact:</strong> {doctor.contact}</p>
                    <button onClick={() => navigate(`/doctors/edit/${doctor.id}`)}>Edit</button>
                </div>
            )}
        </div>
    );
};

export default ViewDoctor;
