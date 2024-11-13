import { useState } from "react";
import api from "../api"; // Asegúrate de que esta ruta apunte correctamente a tu archivo de configuración de axios

/**
 * Custom hook for handling password recovery logic.
 * Provides functions and states for requesting a password recovery.
 *
 * @returns {IPasswordRecovery} The hook's functions and states.
 */
interface IPasswordRecovery {
  recoverPassword: (email: string) => Promise<void>;
  loading: boolean;
  error: string | null;
  success: boolean;
}

export const usePasswordRecovery = (): IPasswordRecovery => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  /**
   * Function to request password recovery.
   * @param {string} email
   */
  const recoverPassword = async (email: string) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await api.post("/auth/forgot-password", { email });

      if (response.status === 200 || response.status === 201) {
        setSuccess(true);
      } else {
        throw new Error(
          response.data.message ||
            "Failed to send recovery email. Please try again."
        );
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return {
    recoverPassword,
    loading,
    error,
    success,
  };
};