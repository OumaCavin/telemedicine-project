// src/components/Breadcrumb.js
import React from 'react';
import { Link } from 'react-router-dom';

const Breadcrumb = ({ links }) => {
    return (
        <nav>
            <ol>
                {links.map((link, index) => (
                    <li key={index}>
                        {link.to ? <Link to={link.to}>{link.label}</Link> : link.label}
                    </li>
                ))}
            </ol>
        </nav>
    );
};

export default Breadcrumb;
