import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { useTranslation } from "react-i18next";
import { AuthResponse } from "../../types/auth/auth.types";

/**
 * Custom hook to handle user login.
 * @returns {Object} - An object containing the login function, loading state, and error state.
 */
export const useLogin = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>(undefined);
    const navigate = useNavigate();
    const { t } = useTranslation();

    /**
     * Function to log in the user.
     * @param {string} email - The user's email.
     * @param {string} password - The user's password.
     */
    const login = async (email: string, password: string): Promise<void> => {
        setLoading(true);
        setError(undefined);

        try {
            const response = await api.post<AuthResponse>("/auth/login", { email, password });
            localStorage.setItem("token", response.data.access_token);
            localStorage.setItem("user", JSON.stringify(response.data.user));
            navigate("/welcome");
        } catch (err) {
            console.log(err);
            setError(t("LOGIN_FAILED_ERROR"));
        } finally {
            setLoading(false);
        }
    };

    return { login, loading, error };
};
