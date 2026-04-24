import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    const isAdmin = userData && userData.includes('"role_id":2');
    
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/';
    };
    
    return (
        <header className="header">
            <div className="header-brand">
                <h1><Link to="/">TeleMed</Link></h1>
            </div>
            <nav className="header-nav">
                <ul className="nav-main">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/patients">Patients</Link></li>
                    <li><Link to="/doctors">Doctors</Link></li>
                    <li><Link to="/appointments">Appointments</Link></li>
                    <li><Link to="/prescriptions">Prescriptions</Link></li>
                    <li><Link to="/health-centers">Health Centers</Link></li>
                    <li><Link to="/payments">Payments</Link></li>
                    <li><Link to="/messages">Messages</Link></li>
                    {isAdmin && (
                        <>
                            <li><Link to="/role-assignments">Role Assignments</Link></li>
                            <li><Link to="/role-items">Role Items</Link></li>
                            <li><Link to="/roles">Roles</Link></li>
                            <li><Link to="/users">Users</Link></li>
                        </>
                    )}
                    {token ? (
                        <li><button onClick={handleLogout} className="logout-btn" style={{background:'none',border:'none',cursor:'pointer',color:'inherit'}}>Logout</button></li>
                    ) : (
                        <li><Link to="/login">Login</Link></li>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
