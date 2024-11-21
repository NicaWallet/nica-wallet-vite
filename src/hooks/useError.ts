import { createContext, useContext } from "react";

export interface ErrorContextProps {
    showError: (message: string, severity?: "error" | "warning" | "info" | "success") => void;
}

export const ErrorContext = createContext<ErrorContextProps | undefined>(undefined);

export const useError = () => {
    const context = useContext(ErrorContext);
    if (!context) {
        throw new Error("useError must be used within an ErrorProvider");
    }
    return context;
};