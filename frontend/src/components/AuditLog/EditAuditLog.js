import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditAuditLog = () => {
    const { id } = useParams();  // Get the ID of the audit log to edit from the URL
    const navigate = useNavigate();
    
    const [auditLog, setAuditLog] = useState({
        action: '',
        timestamp: '',
        user: '',
        details: '',
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch the existing audit log data when the component mounts
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

    // Handle form changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setAuditLog(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        // Update the audit log with the new data
        axios.put(`/api/audit-logs/${id}`, auditLog)
            .then(() => {
                setLoading(false);
                navigate(`/audit-log/${id}`);  // Redirect to the view page of the updated audit log
            })
            .catch(err => {
                setError('Error updating audit log');
                setLoading(false);
            });
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h2>Edit Audit Log</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Action</label>
                    <input
                        type="text"
                        name="action"
                        value={auditLog.action}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Timestamp</label>
                    <input
                        type="text"
                        name="timestamp"
                        value={auditLog.timestamp}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>User</label>
                    <input
                        type="text"
                        name="user"
                        value={auditLog.user}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Details</label>
                    <textarea
                        name="details"
                        value={auditLog.details}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" disabled={loading}>Save</button>
            </form>
        </div>
    );
};

export default EditAuditLog;
