import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const ViewAuditLog = () => {
    const { id } = useParams(); // Get the ID of the audit log from the URL
    const navigate = useNavigate();
    
    const [auditLog, setAuditLog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch the audit log data when the component mounts
    useEffect(() => {
        axios.get(`/api/audit-logs/${id}`)
            .then(response => {
                setAuditLog(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError('Error fetching data');
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h2>Audit Log Details</h2>
            {auditLog && (
                <div>
                    <p><strong>Action:</strong> {auditLog.action}</p>
                    <p><strong>Timestamp:</strong> {auditLog.timestamp}</p>
                    <p><strong>User:</strong> {auditLog.user}</p>
                    <p><strong>Details:</strong> {auditLog.details}</p>
                    <button onClick={() => navigate(`/audit-log/${id}/edit`)}>Edit</button>
                </div>
            )}
        </div>
    );
};

export default ViewAuditLog;
