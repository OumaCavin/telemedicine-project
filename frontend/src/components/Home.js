import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
    return (
        <div className="home-container">
            <section className="hero">
                <h1>Welcome to TeleMed</h1>
                <p>Your comprehensive telemedicine platform for healthcare management</p>
            </section>

            <section className="features">
                <h2>Quick Access</h2>
                <div className="feature-grid">
                    <div className="feature-card">
                        <h3>Patients</h3>
                        <p>Manage patient records and information</p>
                        <Link to="/patients" className="btn btn-primary">View Patients</Link>
                    </div>
                    <div className="feature-card">
                        <h3>Doctors</h3>
                        <p>View and manage doctor profiles</p>
                        <Link to="/doctors" className="btn btn-primary">View Doctors</Link>
                    </div>
                    <div className="feature-card">
                        <h3>Appointments</h3>
                        <p>Schedule and manage appointments</p>
                        <Link to="/appointments" className="btn btn-primary">View Appointments</Link>
                    </div>
                    <div className="feature-card">
                        <h3>Prescriptions</h3>
                        <p>Manage patient prescriptions</p>
                        <Link to="/prescriptions" className="btn btn-primary">View Prescriptions</Link>
                    </div>
                    <div className="feature-card">
                        <h3>Health Centers</h3>
                        <p>Find and manage health centers</p>
                        <Link to="/health-centers" className="btn btn-primary">View Centers</Link>
                    </div>
                    <div className="feature-card">
                        <h3>Payments</h3>
                        <p>Handle payment transactions</p>
                        <Link to="/payments" className="btn btn-primary">View Payments</Link>
                    </div>
                    <div className="feature-card">
                        <h3>Messages</h3>
                        <p>Communicate with patients and doctors</p>
                        <Link to="/messages" className="btn btn-primary">View Messages</Link>
                    </div>
                    <div className="feature-card">
                        <h3>Audit Logs</h3>
                        <p>Track system activities</p>
                        <Link to="/audit-logs" className="btn btn-primary">View Logs</Link>
                    </div>
                </div>
            </section>

            <section className="admin-section">
                <h2>Administration</h2>
                <div className="admin-grid">
                    <Link to="/users" className="admin-link">User Management</Link>
                    <Link to="/admins" className="admin-link">Admin Management</Link>
                    <Link to="/roles" className="admin-link">Roles</Link>
                    <Link to="/role-assignments" className="admin-link">Role Assignments</Link>
                    <Link to="/role-items" className="admin-link">Role Items</Link>
                    <Link to="/statuses" className="admin-link">Status Management</Link>
                    <Link to="/histories" className="admin-link">Medical History</Link>
                    <Link to="/ehr-records" className="admin-link">EHR Records</Link>
                </div>
            </section>
        </div>
    );
};

export default Home;
