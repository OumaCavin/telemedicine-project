import axios from 'axios';

// Use relative URL for production (served from same domain)
const instance = axios.create({
    baseURL: '/api', // Works in both development and production when served from same domain
    timeout: 10000, // Optional timeout
});

export default instance;
