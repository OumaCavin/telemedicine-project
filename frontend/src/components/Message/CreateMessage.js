import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateMessage = () => {
    const [message, setMessage] = useState({
        subject: '',
        body: '',
        recipient: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMessage(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        // Create a new message using POST request
        axios.post('/api/messages', message)
            .then(() => {
                setLoading(false);
                navigate('/messages'); // Redirect to message list
            })
            .catch(err => {
                setError('Error creating message');
                setLoading(false);
            });
    };

    return (
        <div>
            <h2>Create New Message</h2>
            {error && <div>{error}</div>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Subject</label>
                    <input
                        type="text"
                        name="subject"
                        value={message.subject}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Body</label>
                    <textarea
                        name="body"
                        value={message.body}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Recipient</label>
                    <input
                        type="text"
                        name="recipient"
                        value={message.recipient}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" disabled={loading}>Create Message</button>
            </form>
        </div>
    );
};

export default CreateMessage;
