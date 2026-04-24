import React, { useState, useEffect } from 'react';
import axios from '../../axios';
import { Link } from 'react-router-dom';

const MessageList = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch all messages from the backend
        // Note: The messages route requires a userId, so we'll try with a default or handle errors
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        const userId = user.user_id || '1';
        
        axios.get(`/api/messages/${userId}`)
            .then(response => {
                // Ensure we have an array
                const data = Array.isArray(response.data) ? response.data : [];
                setMessages(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching messages:', err);
                // If unauthorized or error, show empty state instead of crashing
                if (err.response?.status === 401) {
                    setError('Please log in to view messages');
                } else {
                    setError(err.response?.data?.error || 'Error fetching messages');
                }
                setMessages([]); // Set empty array to prevent crash
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="message-list-container">
            <h2>Message List</h2>
            {messages.length === 0 ? (
                <p>No messages found.</p>
            ) : (
                <ul>
                    {messages.map(message => (
                        <li key={message.message_id}>
                            <Link to={`/messages/${message.message_id}`}>
                                {message.subject}
                            </Link> | 
                            <Link to={`/messages/edit/${message.message_id}`}> Edit</Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MessageList;
