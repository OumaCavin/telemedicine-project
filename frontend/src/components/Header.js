import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
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
                </ul>
            </nav>
        </header>
    );
};

export default Header;
