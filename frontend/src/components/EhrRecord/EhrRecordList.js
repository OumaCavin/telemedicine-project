import React, { useState, useEffect } from 'react';
import axios from '../../axios';
import { Link } from 'react-router-dom';

const EhrRecordList = () => {
    const [ehrRecords, setEhrRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch all EHR records from the backend
        axios.get('/ehr-records')
            .then(response => {
                if (Array.isArray(response.data)) {
                    setEhrRecords(response.data);
                } else {
                    setEhrRecords([]);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching EHR records:', err);
                setError('Error fetching EHR records');
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (ehrRecords.length === 0) return <div>No EHR records found.</div>;

    return (
        <div>
            <h2>EHR Records</h2>
            <Link to="/ehr-records/create">Create New EHR Record</Link>
            <ul>
                {ehrRecords.map(record => (
                    <li key={record.ehr_id || record.id}>
                        <Link to={`/ehr-records/${record.id}`}>{record.patientName}</Link> | 
                        <Link to={`/ehr-records/edit/${record.id}`}> Edit</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EhrRecordList;
