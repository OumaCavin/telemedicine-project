import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const EhrRecordList = () => {
    const [ehrRecords, setEhrRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch all EHR records from the backend
        axios.get('/api/ehr-records')
            .then(response => {
                setEhrRecords(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError('Error fetching EHR records');
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h2>EHR Records</h2>
            <Link to="/ehr-records/create">Create New EHR Record</Link>
            <ul>
                {ehrRecords.map(record => (
                    <li key={record.id}>
                        <Link to={`/ehr-records/${record.id}`}>{record.patientName}</Link> | 
                        <Link to={`/ehr-records/edit/${record.id}`}> Edit</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EhrRecordList;
