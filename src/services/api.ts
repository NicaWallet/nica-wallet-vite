import axios from 'axios';
import { BASE_URL } from '../config/config';

const api = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
});

/**
 * Interceptor to add authorization token to request headers if available.
 */
api.interceptors.request.use(
    config => {
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

/**
 * Interceptor to handle responses and errors.
 */
api.interceptors.response.use(
    response => response,
    error => {
        if (error.response) {
            if (error.response.status === 401) {
                console.error("Unauthorized access - perhaps redirect to login?");
            }
        } else if (error.request) {
            console.error("No response received from server.");
        } else {
            console.error("Error during request setup:", error.message);
        }

        return Promise.reject(error);
    }
);

export default api;
