import React, { useState, ReactNode } from "react";
import ErrorSnackbar from "../components/ErrorSnackbar";
import { setErrorHandler } from "./errorHandler";
import { ErrorContext } from "../hooks/useError";

export const ErrorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [severity, setSeverity] = useState<"error" | "warning" | "info" | "success">("error");
    const [open, setOpen] = useState(false);

    const showError = (message: string, severity: "error" | "warning" | "info" | "success" = "error") => {
        setErrorMessage(message);
        setSeverity(severity);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setErrorMessage(null);
    };

    // Configurar el handler global al inicializar el contexto
    setErrorHandler(showError);

    return (
        <ErrorContext.Provider value={{ showError }}>
            {children}
            <ErrorSnackbar
                open={open}
                message={errorMessage || ""}
                severity={severity}
                onClose={handleClose}
            />
        </ErrorContext.Provider>
    );
};
