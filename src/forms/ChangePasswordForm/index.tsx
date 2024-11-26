import React from "react";
import { Box, Typography, Paper, Divider } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import ButtonComponent from "../../components/ButtonComponent";
import InputField from "../../components/InputField";
import AvatarComponent from "../../components/AvatarComponent";
import { LockResetOutlined } from "@mui/icons-material";

type ChangePasswordInputs = {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
};

interface ChangePasswordFormProps {
    onSubmit: (data: ChangePasswordInputs) => void;
    loading: boolean;
}

const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({
    onSubmit,
    loading,
}) => {
    const { t } = useTranslation();

    const validationSchema = yup.object().shape({
        currentPassword: yup.string().required(t("CURRENT_PASSWORD_REQUIRED")),
        newPassword: yup
            .string()
            .required(t("NEW_PASSWORD_REQUIRED"))
            .min(8, t("PASSWORD_MIN_LENGTH"))
            .matches(/[a-z]/, t("PASSWORD_LOWERCASE"))
            .matches(/[A-Z]/, t("PASSWORD_UPPERCASE"))
            .matches(/[0-9]/, t("PASSWORD_NUMBER"))
            .matches(/[@$!%*?&#]/, t("PASSWORD_SPECIAL")),
        confirmNewPassword: yup
            .string()
            .oneOf([yup.ref("newPassword"), undefined], t("PASSWORDS_MUST_MATCH"))
            .required(t("CONFIRM_PASSWORD_REQUIRED")),
    });

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<ChangePasswordInputs>({
        resolver: yupResolver(validationSchema),
    });

    return (
        <Paper
            elevation={4}
            sx={{
                padding: 4,
                borderRadius: 4,
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                maxWidth: "35%",
                margin: "0 auto",
                backgroundColor: "#ffffff",
            }}
        >
            <Box sx={{ textAlign: "center", marginBottom: 2 }}>
                <AvatarComponent
                    size="large"
                    backgroundColor="#1976d2"
                    textColor="#fff"
                    fallbackText="P"
                    icon={<LockResetOutlined />}
                    sx={{ margin: "0 auto", marginBottom: 1 }}
                />
                <Typography component="h1" variant="h5" sx={{ fontWeight: "bold" }}>
                    {t("CHANGE_PASSWORD")}
                </Typography>
            </Box>
            <Divider sx={{ marginBottom: 3 }} />
            <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                sx={{ mt: 1 }}
            >
                <Controller
                    name="currentPassword"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <InputField
                            {...field}
                            margin="normal"
                            required
                            fullWidth
                            label={t("CURRENT_PASSWORD_PLACEHOLDER")}
                            type="password"
                            error={!!errors.currentPassword}
                            helperText={
                                errors.currentPassword
                                    ? t(errors.currentPassword.message || "")
                                    : ""
                            }
                        />
                    )}
                />
                <Controller
                    name="newPassword"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <InputField
                            {...field}
                            margin="normal"
                            required
                            fullWidth
                            label={t("NEW_PASSWORD_PLACEHOLDER")}
                            type="password"
                            error={!!errors.newPassword}
                            helperText={
                                errors.newPassword ? t(errors.newPassword.message || "") : ""
                            }
                        />
                    )}
                />
                <Controller
                    name="confirmNewPassword"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <InputField
                            {...field}
                            margin="normal"
                            required
                            fullWidth
                            label={t("CONFIRM_NEW_PASSWORD_PLACEHOLDER")}
                            type="password"
                            error={!!errors.confirmNewPassword}
                            helperText={
                                errors.confirmNewPassword
                                    ? t(errors.confirmNewPassword.message || "")
                                    : ""
                            }
                        />
                    )}
                />
                <ButtonComponent
                    label={t("CHANGE_PASSWORD")}
                    onClick={handleSubmit(onSubmit)}
                    variant="contained"
                    color="primary"
                    SxProps={{
                        mt: 3,
                        mb: 2,
                        width: "100%",
                        "&:hover": { backgroundColor: "primary.dark" },
                    }}
                    isLoading={loading}
                    size="large"
                />
            </Box>
        </Paper>
    );
};

export default ChangePasswordForm;
