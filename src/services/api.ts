import axios from 'axios';
import { BASE_URL } from '../config/config';

const api = axios.create({
    baseURL: BASE_URL,
    timeout: 5000, // 5 seconds timeout
});


api.interceptors.request.use(
    config => {
        // Add auth token to headers if available
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    response => response,
    error => {
        // Handle global errors here (like 401, 403, etc.)
        if (error.response.status === 401) {
            // Handle unauthorized access
            console.error("Unauthorized access - perhaps redirect to login?");
        }
        return Promise.reject(error);
    }
);


export default api;
