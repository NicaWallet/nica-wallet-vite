import React, { useEffect } from "react";
import PageHeader from "../../components/PageHeader";
import ChangePasswordForm from "../../forms/ChangePasswordForm";
import ErrorSnackbar from "../../components/ErrorSnackbar";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useChangePassword } from "../../services/users/changePassword.service";

interface ChangePasswordInputs {
    currentPassword: string;
    newPassword: string;
}

export const ChangePassword = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { changePassword, loading, error, success } = useChangePassword();
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [snackbarMessage, setSnackbarMessage] = React.useState("");

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    useEffect(() => {
        if (error || success) {
            setSnackbarMessage(success ? t("PASSWORD_CHANGED_SUCCESS") : error || t("PASSWORD_CHANGE_FAILED"));
            setSnackbarOpen(true);
        }
        if (success) {
            setTimeout(() => navigate("/profile"), 2000);
        }
    }, [error, success, navigate, t]);

    const handleSubmit = async (data: ChangePasswordInputs) => {
        await changePassword(data.currentPassword, data.newPassword);
    };

    return (
        <>
            <PageHeader titleKey="PROFILE_CHANGE_PASSWORD_PAGE" />
            <ChangePasswordForm onSubmit={handleSubmit} loading={loading} />
            <ErrorSnackbar
                open={snackbarOpen}
                onClose={handleCloseSnackbar}
                message={snackbarMessage}
                severity={success ? "success" : "error"}
                autoHideDuration={4000}
            />
        </>
    );
};