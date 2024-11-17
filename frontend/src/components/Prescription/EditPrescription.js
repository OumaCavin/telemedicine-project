import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditPrescription = () => {
    const { id } = useParams();
    const [prescription, setPrescription] = useState({
        patientName: '',
        medication: '',
        dosage: '',
        instructions: '',
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the prescription data to populate the form for editing
        axios.get(`/api/prescriptions/${id}`)
            .then(response => {
                setPrescription(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError('Error fetching prescription data');
                setLoading(false);
            });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPrescription(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        // Send PUT request to update the prescription's data
        axios.put(`/api/prescriptions/${id}`, prescription)
            .then(() => {
                setLoading(false);
                navigate(`/prescriptions/${id}`); // Redirect to the prescription view page
            })
            .catch(err => {
                setError('Error updating prescription');
                setLoading(false);
            });
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h2>Edit Prescription</h2>
            {error && <div>{error}</div>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Patient Name</label>
                    <input
                        type="text"
                        name="patientName"
                        value={prescription.patientName}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Medication</label>
                    <input
                        type="text"
                        name="medication"
                        value={prescription.medication}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Dosage</label>
                    <input
                        type="text"
                        name="dosage"
                        value={prescription.dosage}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Instructions</label>
                    <input
                        type="text"
                        name="instructions"
                        value={prescription.instructions}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" disabled={loading}>Save Changes</button>
            </form>
        </div>
    );
};

export default EditPrescription;
