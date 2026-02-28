// src/components/AuditLogList.js
import React, { useState, useEffect } from 'react';
import axios from '../../axios';  // Axios instance for API calls
import DataTable from 'react-data-table-component';  // For displaying the data in a table format

const AuditLogList = () => {
    const [auditLogs, setAuditLogs] = useState([]);

    useEffect(() => {
        axios.get('/audit-logs')
            .then(response => {
                setAuditLogs(response.data);
            })
            .catch(error => {
                console.error('Error fetching audit logs:', error);
            });
    }, []);

    const columns = [
        {
            name: 'User ID',
            selector: row => row.user_id,
        },
        {
            name: 'Action',
            selector: row => row.action,
        },
        {
            name: 'Affected Table',
            selector: row => row.affected_table,
        },
        {
            name: 'Created At',
            selector: row => new Date(row.created_at).toLocaleString(),
        },
        {
            name: 'Actions',
            cell: row => (
                <div>
                    <a href={`/audit-log/${row.log_id}`} className="btn btn-info btn-sm">View</a>
                    <a href={`/audit-log/${row.log_id}/edit`} className="btn btn-warning btn-sm">Edit</a>
                </div>
            ),
        },
    ];

    return (
        <div>
            <h1>Audit Logs</h1>
            <DataTable
                title="Audit Logs"
                columns={columns}
                data={auditLogs}
                pagination
                highlightOnHover
            />
        </div>
    );
};

export default AuditLogList;
