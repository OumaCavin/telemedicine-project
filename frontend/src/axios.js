import axios from 'axios';

// Use Render backend URL for production
const instance = axios.create({
    baseURL: 'https://telemedicine-rjh7.onrender.com/api',
    timeout: 10000,
});

export default instance;
