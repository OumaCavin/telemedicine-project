// src/components/CreateAuditLog.js
import React, { useState } from 'react';
import axios from '../../axios';  // Axios instance for API calls

const CreateAuditLog = () => {
    const [user_id, setUserId] = useState('');
    const [action, setAction] = useState('');
    const [previous_state, setPreviousState] = useState('');
    const [current_state, setCurrentState] = useState('');
    const [affected_table, setAffectedTable] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const auditLog = {
            user_id,
            action,
            previous_state,
            current_state,
            affected_table,
        };

        axios.post('/audit-logs', auditLog)
            .then(response => {
                alert('Audit Log created successfully');
                // Redirect to the list page or show success message
            })
            .catch(error => {
                console.error('Error creating audit log:', error);
            });
    };

    return (
        <div>
            <h1>Create Audit Log</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>User ID:</label>
                    <input
                        type="number"
                        value={user_id}
                        onChange={(e) => setUserId(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Action:</label>
                    <input
                        type="text"
                        value={action}
                        onChange={(e) => setAction(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Previous State:</label>
                    <textarea
                        value={previous_state}
                        onChange={(e) => setPreviousState(e.target.value)}
                    />
                </div>
                <div>
                    <label>Current State:</label>
                    <textarea
                        value={current_state}
                        onChange={(e) => setCurrentState(e.target.value)}
                    />
                </div>
                <div>
                    <label>Affected Table:</label>
                    <input
                        type="text"
                        value={affected_table}
                        onChange={(e) => setAffectedTable(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Create</button>
            </form>
        </div>
    );
}

export default CreateAuditLog;
