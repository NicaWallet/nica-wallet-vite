import { useState } from "react";
import api from "../api";

/**
 * Custom hook for handling password reset logic.
 * Provides functions and states for resetting a user's password.
 *
 * @returns {IPasswordReset} The hook's functions and states.
 */
interface IPasswordReset {
  resetPassword: (token: string, newPassword: string) => Promise<void>;
  loading: boolean;
  error: string | null;
  success: boolean;
}

export const usePasswordReset = (): IPasswordReset => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  /**
   * Function to reset the user's password.
   * @param {string} token - The reset token from the URL.
   * @param {string} newPassword - The new password to set.
   */
  const resetPassword = async (token: string, newPassword: string) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await api.post(
        "/auth/reset-password",
        {
          token: token,
          newPassword: newPassword,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      // Considera que una respuesta con estado 201 también es exitosa
      if (response.status === 200 || response.status === 201) {
        setSuccess(true);
      } else {
        throw new Error(
          response.data.message || "Failed to reset password. Please try again."
        );
      }
    } catch (err: unknown) {
      // Maneja el error y verifica que err.response esté presente
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
    resetPassword,
    loading,
    error,
    success,
  };
};
