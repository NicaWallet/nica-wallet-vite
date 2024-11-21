import axios from "axios";
import { BASE_URL } from "../config/config";
import { handleGlobalError } from "../context/errorHandler";

const api = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
});

// Interceptor para agregar el token en las solicitudes
api.interceptors.request.use(
    config => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

// Interceptor para manejar respuestas y errores
api.interceptors.response.use(
    response => response,
    error => {
        handleGlobalError(error); // Llama al manejador global
        return Promise.reject(error);
    }
);

export default api;
