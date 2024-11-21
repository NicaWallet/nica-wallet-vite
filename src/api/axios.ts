import axios, { AxiosRequestConfig } from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

// console.log('Base URL:', import.meta.env.VITE_BASE_URL);

/**
 * Interceptor for requests to add authorization token and log requests.
 * @param {AxiosRequestConfig} config - The Axios request configuration.
 * @returns {AxiosRequestConfig} - The modified Axios request configuration.
 */
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        // console.log('Request:', config);
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

/**
 * Interceptor for responses to log responses and handle errors.
 * @param {any} response - The Axios response.
 * @returns {any} - The Axios response.
 */
api.interceptors.response.use(
    (response) => {
        // console.log('Response:', response);
        return response;
    },
    (error) => {
        if (error.response) {
            console.error('Response error:', error.response.data);
            if (error.response.status === 401) {
                alert('Unauthorized! Please log in again.');
            }
        } else if (error.request) {
            console.error('Request error:', error.request);
        } else {
            console.error('Error:', error.message);
        }
        return Promise.reject(error);
    }
);

/**
 * Adds authorization token to the Axios request configuration.
 * @param {AxiosRequestConfig} config - The Axios request configuration.
 * @returns {Promise<AxiosRequestConfig>} - The modified Axios request configuration.
 */
export const tokenInterceptor = async (config: AxiosRequestConfig) => {
    const newConfig = { ...config };
    const token = localStorage.getItem('token');

    if (token) {
        const parsedToken = JSON.parse(token);
        const loginToken = parsedToken.state.loginToken.token;

        newConfig.headers = {
            ...newConfig.headers,
            Authorization: `Bearer ${loginToken}`,
        };
    }

    return newConfig;
};

/**
 * Makes an Axios request with the authorization token added to the configuration.
 * @param {string} url - The URL for the Axios request.
 * @param {AxiosRequestConfig} [config={}] - The Axios request configuration.
 * @returns {Promise<any>} - The response data from the Axios request.
 */
export const axiosTokenInterceptor = async (
    url: string,
    config: AxiosRequestConfig = {}
) => {
    const newConfig = await tokenInterceptor(config);

    try {
        const response = await axios(url, newConfig);
        return response.data;
    } catch (error) {
        console.error('Axios error:', error);
        throw error;
    }
};

export default api;