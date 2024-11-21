import { t } from "i18next";

// Recibe una referencia a `showError` para usarla fuera del interceptor
let errorHandler: ErrorContextProps["showError"];

export const setErrorHandler = (handler: ErrorContextProps["showError"]) => {
    errorHandler = handler;
};

import { AxiosError } from "axios";
import { ErrorContextProps } from "../hooks/useError";

interface ErrorResponse {
    message?: string;
}

export const handleGlobalError = (error: AxiosError<ErrorResponse>) => {
    if (errorHandler) {
        if (error.response) {
            const message = error.response.data?.message || "AN_ERROR_OCCURRED";
            errorHandler(message, "error");
        } else if (error.request) {
            errorHandler(t("NO_RESPONSE_RECEIVED_FROM_SERVER_PLEASE_CHECK_YOUR_CONNECTION"), "warning");
        } else {
            errorHandler(t("UNEXPECTED_ERROR_OCCURRED"), "error");
        }
    }
};
