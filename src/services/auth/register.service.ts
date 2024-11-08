import axios from 'axios';
import api from '../api';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface RegisterData {
    first_name: string;
    last_name?: string;
    email: string;
    password: string;
    birthdate: string;
}

/**
 * Custom hook to handle user registration.
 * @returns An object containing the register function, loading state, and error state.
 */
export const useRegister = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | undefined>(undefined);
    const { t } = useTranslation();

    /**
     * Registers a new user with the provided data.
     * @param registerData - The data required for registration.
     * @returns The response data from the registration API.
     */
    const register = async (registerData: RegisterData) => {
        setLoading(true);
        setError(undefined);

        try {
            const response = await api.post('/auth/register', registerData);
            return response.data;
        } catch (err: unknown) {
            if (axios.isAxiosError(err) && err.response?.status === 400) {
                setError(t('REGISTER_VALIDATION_FAILED'));
            } else {
                setError(t('REGISTER_ERROR'));
            }
        } finally {
            setLoading(false);
        }
    };

    return { register, loading, error };
};
