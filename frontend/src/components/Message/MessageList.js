import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const MessageList = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch all messages from the backend
        axios.get('/api/messages')
            .then(response => {
                setMessages(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError('Error fetching messages');
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h2>Message List</h2>
            <Link to="/messages/create">Create New Message</Link>
            <ul>
                {messages.map(message => (
                    <li key={message.id}>
                        <Link to={`/messages/${message.id}`}>{message.subject}</Link> | 
                        <Link to={`/messages/edit/${message.id}`}> Edit</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MessageList;
