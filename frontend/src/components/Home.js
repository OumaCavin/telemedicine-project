import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const userData = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        if (userData) {
            const user = JSON.parse(userData);
            setIsAdmin(user.role_id === 2);
        }
        setIsLoggedIn(!!token);
    }, []);

    return (
        <div className="home-container">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-overlay"></div>
                <div className="hero-content">
                    <div className="hero-text">
                        <h1>TeleMed Kenya</h1>
                        <p className="hero-tagline">Your Health, Our Priority</p>
                        <p className="hero-description">
                            Connect with top Kenyan healthcare professionals from the comfort of your home. 
                            Quality healthcare is just a click away.
                        </p>
                        {!isLoggedIn && (
                            <div className="hero-buttons">
                                <Link to="/register" className="btn btn-cta">Get Started</Link>
                                <Link to="/admin-login" className="btn btn-admin">Admin Login</Link>
                            </div>
                        )}
                    </div>
                    <div className="hero-image">
                        <svg viewBox="0 0 400 300" width="400" height="300" xmlns="http://www.w3.org/2000/svg">
                            <rect width="400" height="300" fill="#E8F5E9"/>
                            <circle cx="200" cy="120" r="60" fill="#4CAF50" opacity="0.3"/>
                            <circle cx="200" cy="120" r="40" fill="#4CAF50" opacity="0.5"/>
                            <circle cx="200" cy="120" r="20" fill="#2E7D32"/>
                            <rect x="120" y="200" width="160" height="60" rx="10" fill="#fff"/>
                            <rect x="140" y="210" width="40" height="40" rx="5" fill="#4CAF50"/>
                            <rect x="220" y="215" width="50" height="10" rx="2" fill="#81C784"/>
                            <rect x="220" y="235" width="40" height="10" rx="2" fill="#81C784"/>
                        </svg>
                    </div>
                </div>
            </section>

            {/* Services Section - For Non-Logged In Users */}
            {!isLoggedIn && (
                <section className="services-section">
                    <h2>Our Services</h2>
                    <div className="services-grid">
                        <div className="service-card">
                            <div className="service-icon">🏥</div>
                            <h3>Virtual Consultations</h3>
                            <p>Connect with doctors via video call from anywhere in Kenya</p>
                        </div>
                        <div className="service-card">
                            <div className="service-icon">💊</div>
                            <h3>Online Prescriptions</h3>
                            <p>Receive digital prescriptions delivered to your nearest pharmacy</p>
                        </div>
                        <div className="service-card">
                            <div className="service-icon">📋</div>
                            <h3>Medical Records</h3>
                            <p>Access your complete health history anytime, anywhere</p>
                        </div>
                        <div className="service-card">
                            <div className="service-icon">👨‍⚕️</div>
                            <h3>Specialist Care</h3>
                            <p>Access to top medical specialists across Kenya</p>
                        </div>
                    </div>
                </section>
            )}

            {/* Why Choose Us Section */}
            <section className="why-choose-section">
                <h2>Why Choose TeleMed Kenya?</h2>
                <div className="features-container">
                    <div className="feature-item">
                        <div className="feature-icon">
                            <svg viewBox="0 0 100 100" width="80" height="80" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="100" height="100" rx="10" fill="#4CAF50"/>
                                <path d="M30 45h40v10H30zM35 35h30v10H35zM40 55h20v5H40z" fill="white"/>
                            </svg>
                        </div>
                        <h3>Trusted by Leading Hospitals</h3>
                        <p>Partnered with top healthcare institutions across Kenya</p>
                    </div>
                    <div className="feature-item">
                        <div className="feature-icon">
                            <svg viewBox="0 0 100 100" width="80" height="80" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="100" height="100" rx="10" fill="#2196F3"/>
                                <circle cx="50" cy="35" r="15" fill="white"/>
                                <path d="M25 75c0-15 10-25 25-25s25 10 25 25" fill="white"/>
                            </svg>
                        </div>
                        <h3>Qualified Healthcare Professionals</h3>
                        <p>Verified doctors and specialists at your service</p>
                    </div>
                    <div className="feature-item">
                        <div className="feature-icon">
                            <svg viewBox="0 0 100 100" width="80" height="80" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="100" height="100" rx="10" fill="#FF9800"/>
                                <rect x="20" y="20" width="60" height="50" rx="5" fill="white"/>
                                <rect x="30" y="30" width="40" height="30" rx="2" fill="#FF9800"/>
                            </svg>
                        </div>
                        <h3>Easy-to-Use Mobile App</h3>
                        <p>Access healthcare services from your smartphone</p>
                    </div>
                </div>
            </section>

            {/* CTA Section for Non-Logged In */}
            {!isLoggedIn && (
                <section className="cta-section">
                    <h2>Ready to Get Started?</h2>
                    <p>Join thousands of Kenyans accessing quality healthcare online</p>
                    <Link to="/register" className="btn btn-cta-large">Create Free Account</Link>
                </section>
            )}

            {/* Quick Access - Only for Logged In Non-Admin Users */}
            {isLoggedIn && !isAdmin && (
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
            )}

            {/* Admin section - only visible to admins */}
            {isAdmin && (
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
            )}
        </div>
    );
};

export default Home;