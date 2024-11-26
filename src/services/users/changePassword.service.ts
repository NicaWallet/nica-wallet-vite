import { useState } from "react";
import api from "../api";

/**
 * Custom hook for handling change password logic.
 *
 * @returns {IChangePassword} The hook's functions and states.
 */
interface IChangePassword {
    changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
    loading: boolean;
    error: string | null;
    success: boolean;
}

export const useChangePassword = (): IChangePassword => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    /**
     * Function to change the user's password.
     * @param {string} currentPassword - The user's current password.
     * @param {string} newPassword - The new password to set.
     */
    const changePassword = async (currentPassword: string, newPassword: string) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const response = await api.patch("/users/change-password", {
                currentPassword,
                newPassword,
            });

            if (response.status === 200) {
                setSuccess(true);
            } else {
                throw new Error(response.data.message || "Failed to change password.");
            }
        } catch (err: unknown) {
            if (err instanceof Error && (err as { response?: { data?: { message?: string } } }).response) {
                const errorResponse = err as { response?: { data?: { message?: string } } };
                setError(errorResponse.response?.data?.message || "An unexpected error occurred.");
            } else {
                setError("An unexpected error occurred.");
            }
        } finally {
            setLoading(false);
        }
    };

    return {
        changePassword,
        loading,
        error,
        success,
    };
};
