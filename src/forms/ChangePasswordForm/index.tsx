import React from "react";
import { useForm } from "react-hook-form";
import { Box, Paper, Typography, Divider, Button } from "@mui/material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import InputField from "../../components/InputField";
import { useTranslation } from "react-i18next";
import Loader from "../../components/Loader";

interface ChangePasswordInputs {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

interface PasswordResetFormProps {
    onSubmit: (data: ChangePasswordInputs) => void;
    loading: boolean;
}

const PasswordResetForm: React.FC<PasswordResetFormProps> = ({ onSubmit, loading }) => {
    const { t } = useTranslation();

    const validationSchema = yup.object().shape({
        currentPassword: yup.string().required(t("PASSWORD_REQUIRED")),
        newPassword: yup.string().required(t("PASSWORD_REQUIRED")),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref("newPassword")], t("PASSWORDS_MUST_MATCH"))
            .required(t("CONFIRM_PASSWORD_REQUIRED")),
    });

    const {
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
    } = useForm<ChangePasswordInputs>({
        resolver: yupResolver(validationSchema),
    });

    return (
        <Paper
            elevation={4}
            sx={{
                position: "relative",
                padding: 4,
                borderRadius: 4,
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                maxWidth: 500,
                margin: "0 auto",
                backgroundColor: "#ffffff",
            }}
        >
            {loading && <Loader overlayVariant="transparent" />}
            <Box sx={{ textAlign: "center", marginBottom: 2 }}>
                <Typography component="h1" variant="h5" sx={{ fontWeight: "bold" }}>
                    {t("RESET_PASSWORD")}
                </Typography>
            </Box>
            <Divider sx={{ marginBottom: 3 }} />
            <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
                <InputField
                    label={t("CURRENT_PASSWORD")}
                    type="password"
                    value={watch("currentPassword") || ""}
                    onChange={(value) => setValue("currentPassword", String(value))}
                    required
                    errorText={
                        errors.currentPassword ? t(errors.currentPassword.message || "") : ""
                    }
                />
                <InputField
                    label={t("NEW_PASSWORD")}
                    type="password"
                    value={watch("newPassword") || ""}
                    onChange={(value) => setValue("newPassword", String(value))}
                    required
                    errorText={errors.newPassword ? t(errors.newPassword.message || "") : ""}
                    sx={{ mt: 2 }}
                />
                <InputField
                    label={t("CONFIRM_NEW_PASSWORD")}
                    type="password"
                    value={watch("confirmPassword") || ""}
                    onChange={(value) => setValue("confirmPassword", String(value))}
                    required
                    errorText={
                        errors.confirmPassword ? t(errors.confirmPassword.message || "") : ""
                    }
                    sx={{ mt: 2 }}
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{
                        mt: 3,
                        width: "100%",
                        "&:hover": { backgroundColor: "primary.dark" },
                    }}
                    size="large"
                    disabled={loading}
                >
                    {t("RESET_PASSWORD")}
                </Button>
            </Box>
        </Paper>
    );
};

export default PasswordResetForm;
