import axios from 'axios';

// Replace with your backend URL
const instance = axios.create({
    baseURL: 'http://localhost:5000/api', // Adjust according to your backend server
    timeout: 10000, // Optional timeout
});

export default instance;
