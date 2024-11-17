import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditMessage = () => {
    const { id } = useParams();
    const [message, setMessage] = useState({
        subject: '',
        body: '',
        recipient: '',
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the message data to populate the form for editing
        axios.get(`/api/messages/${id}`)
            .then(response => {
                setMessage(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError('Error fetching message data');
                setLoading(false);
            });
    }, [id]);

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

        // Send PUT request to update the message's data
        axios.put(`/api/messages/${id}`, message)
            .then(() => {
                setLoading(false);
                navigate(`/messages/${id}`); // Redirect to the message view page
            })
            .catch(err => {
                setError('Error updating message');
                setLoading(false);
            });
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h2>Edit Message</h2>
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
                <button type="submit" disabled={loading}>Save Changes</button>
            </form>
        </div>
    );
};

export default EditMessage;
