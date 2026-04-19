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
                        <img src="https://www.easyclinic.io/wp-content/uploads/2025/04/41989.jpg" alt="Kenyan Doctor Consultation" />
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
                            <img src="https://nextcity.org/images/daily/_resized/Nairobi_Hospital.jpg" alt="Healthcare" />
                        </div>
                        <h3>Trusted by Leading Hospitals</h3>
                        <p>Partnered with top healthcare institutions across Kenya</p>
                    </div>
                    <div className="feature-item">
                        <div className="feature-icon">
                            <img src="https://www.katanihospital.org/wp-content/uploads/2025/04/shutterstock_1763113577.jpg" alt="Doctor" />
                        </div>
                        <h3>Qualified Healthcare Professionals</h3>
                        <p>Verified doctors and specialists at your service</p>
                    </div>
                    <div className="feature-item">
                        <div className="feature-icon">
                            <img src="https://cdn.dribbble.com/userupload/43390908/file/original-633ca9db878dc1aef75d0171a1db584a.jpg?resize=752x&vertical=center" alt="App" />
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