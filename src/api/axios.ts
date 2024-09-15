import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 10000, // 10 seconds timeout
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

// Request interceptor for adding authorization token and logging requests
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        console.log('Request:', config);
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for logging responses and handling errors
api.interceptors.response.use(
    (response) => {
        console.log('Response:', response);
        return response;
    },
    (error) => {
        if (error.response) {
            // Server responded with a status other than 2xx
            console.error('Response error:', error.response.data);
            if (error.response.status === 401) {
                // Handle unauthorized error
                alert('Unauthorized! Please log in again.');
                // Optionally redirect to login page
            }
        } else if (error.request) {
            // No response was received
            console.error('Request error:', error.request);
        } else {
            // Something happened in setting up the request
            console.error('Error:', error.message);
        }
        return Promise.reject(error);
    }
);

export default api;
