import { useState, useEffect } from "react";

/**
 * Custom hook to calculate and manage password strength.
 * @returns An object containing password strength, visibility state, and a handler for password changes.
 */
export const usePasswordStrength = () => {
    const [passwordStrength, setPasswordStrength] = useState<number>(0);
    const [showPasswordStrength, setShowPasswordStrength] = useState<boolean>(false);
    const [passwordTimeout, setPasswordTimeout] = useState<number | null>(null);

    /**
     * Calculates the strength of a given password.
     * @param password - The password to evaluate.
     * @returns A number representing the password strength as a percentage.
     */
    const calculatePasswordStrength = (password: string): number => {
        let strength = 0;
        if (password.length >= 8) strength += 1;
        if (/[A-Z]/.test(password)) strength += 1;
        if (/[0-9]/.test(password)) strength += 1;
        if (/[@$!%*?&#]/.test(password)) strength += 1;
        return (strength / 4) * 100;
    };

    /**
     * Handles changes to the password, updating the strength and visibility state.
     * @param password - The new password value.
     */
    const handlePasswordChange = (password: string) => {
        const strength = calculatePasswordStrength(password);
        setPasswordStrength(strength);
        setShowPasswordStrength(true);

        if (passwordTimeout) {
            clearTimeout(passwordTimeout);
        }

        const timeout = setTimeout(() => {
            setShowPasswordStrength(false);
        }, 2000);

        setPasswordTimeout(timeout as unknown as number);
    };

    useEffect(() => {
        return () => {
            if (passwordTimeout) {
                clearTimeout(passwordTimeout);
            }
        };
    }, [passwordTimeout]);

    return {
        passwordStrength,
        showPasswordStrength,
        handlePasswordChange,
    };
};
