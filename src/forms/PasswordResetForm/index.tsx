import React from "react";
import { useForm } from "react-hook-form";
import { Box, Paper, Typography, Divider, Button } from "@mui/material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import InputField from "../../components/InputField";
import { useTranslation } from "react-i18next";
import Loader from "../../components/Loader";

interface PasswordResetFormInputs {
  password: string;
  confirmPassword: string;
}

interface PasswordResetFormProps {
  onSubmit: (data: PasswordResetFormInputs) => void;
  isLoading?: boolean;
}

const PasswordResetForm: React.FC<PasswordResetFormProps> = ({ onSubmit, isLoading }) => {
  const { t } = useTranslation();

  const validationSchema = yup.object().shape({
    password: yup
      .string()
      .required(t("PASSWORD_REQUIRED"))
      .min(8, t("PASSWORD_MIN_LENGTH"))
      .matches(/[a-z]/, t("PASSWORD_LOWERCASE"))
      .matches(/[A-Z]/, t("PASSWORD_UPPERCASE"))
      .matches(/[0-9]/, t("PASSWORD_NUMBER"))
      .matches(/[@$!%*?&#]/, t("PASSWORD_SPECIAL_CHAR")),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], t("PASSWORDS_MUST_MATCH"))
      .required(t("CONFIRM_PASSWORD_REQUIRED")),
  });

  const {
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<PasswordResetFormInputs>({
    resolver: yupResolver(validationSchema),
  });

  return (
    <Paper
      elevation={4}
      sx={{
        padding: 4,
        borderRadius: 4,
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        maxWidth: 500,
        margin: "0 auto",
        backgroundColor: "#ffffff",
      }}
    >
      {isLoading ? (
        <Loader overlayVariant="transparent" />
      ) : (
        <>
          <Box sx={{ textAlign: "center", marginBottom: 2 }}>
            <Typography component="h1" variant="h5" sx={{ fontWeight: "bold" }}>
              {t("RESET_PASSWORD")}
            </Typography>
          </Box>
          <Divider sx={{ marginBottom: 3 }} />
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <InputField
              label={t("NEW_PASSWORD")}
              type="password"
              value={watch("password") || ""}
              onChange={(value) => setValue("password", String(value))}
              required
              errorText={errors.password ? t(errors.password.message || "") : ""}
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
            >
              {t("RESET_PASSWORD")}
            </Button>
          </Box>
        </>
      )
      }
    </Paper>
  );
};

export default PasswordResetForm;