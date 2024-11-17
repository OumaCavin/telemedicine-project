// frontend/src/components/Admin/Dashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Admin.css';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [healthCenters, setHealthCenters] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userResponse = await axios.get('/api/admin/users');
                const doctorResponse = await axios.get('/api/admin/doctors');
                const centerResponse = await axios.get('/api/admin/healthcenters');
                
                setUsers(userResponse.data);
                setDoctors(doctorResponse.data);
                setHealthCenters(centerResponse.data);
            } catch (error) {
                console.error("Error fetching admin data", error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="admin-dashboard">
            <h2>Admin Dashboard</h2>
            <h3>Users</h3>
            <ul>
                {users.map(user => (
                    <li key={user.id}>{user.name} - {user.role}</li>
                ))}
            </ul>
            <h3>Doctors</h3>
            <ul>
                {doctors.map(doctor => (
                    <li key={doctor.id}>{doctor.name} - {doctor.specialty}</li>
                ))}
            </ul>
            <h3>Health Centers</h3>
            <ul>
                {healthCenters.map(center => (
                    <li key={center.id}>{center.name} - {center.location}</li>
                ))}
            </ul>
        </div>
    );
};

export default AdminDashboard;
