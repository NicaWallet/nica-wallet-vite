import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import PasswordStrengthMeter from "../../components/PasswordStrengthMeter";
import ButtonComponent from "../../components/Button";
import InputField from "../../components/Input";

type PasswordResetInputs = {
  password: string;
  confirmPassword: string;
};

interface PasswordResetFormProps {
  onSubmit: (data: PasswordResetInputs) => void;
  loading: boolean;
}

const PasswordResetForm: React.FC<PasswordResetFormProps> = ({
  onSubmit,
  loading,
}) => {
  const { t } = useTranslation();
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showStrengthMeter, setShowStrengthMeter] = useState(false);
  let hideTimer: NodeJS.Timeout;

  const validationSchema = yup.object().shape({
    password: yup
      .string()
      .required(t("PASSWORD_REQUIRED"))
      .min(8, t("PASSWORD_MIN_LENGTH"))
      .matches(/[a-z]/, t("PASSWORD_LOWERCASE"))
      .matches(/[A-Z]/, t("PASSWORD_UPPERCASE"))
      .matches(/[0-9]/, t("PASSWORD_NUMBER"))
      .matches(/[@$!%*?&#]/, t("PASSWORD_SPECIAL")),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), undefined], t("PASSWORDS_MUST_MATCH"))
      .required(t("CONFIRM_PASSWORD_REQUIRED")),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<PasswordResetInputs>({
    resolver: yupResolver(validationSchema),
  });

  const handlePasswordChange = (password: string) => {
    setPasswordStrength(calculatePasswordStrength(password));
    setShowStrengthMeter(true);

    // Reinicia el temporizador cuando el usuario sigue ingresando texto
    clearTimeout(hideTimer);
    hideTimer = setTimeout(() => {
      setShowStrengthMeter(false);
    }, 2000); // Tiempo en milisegundos para ocultar el medidor después de inactividad
  };

  const calculatePasswordStrength = (password: string): number => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[a-z]/.test(password)) strength += 25;
    if (/[0-9@$!%*?&#]/.test(password)) strength += 25;
    return strength;
  };

  useEffect(() => {
    return () => {
      // Limpia el temporizador si el componente se desmonta
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      sx={{ mt: 1 }}
    >
      <Typography component="h1" variant="h5" align="center">
        {t("PASSWORD_RESET")}
      </Typography>
      <Controller
        name="password"
        control={control}
        defaultValue=""
        render={({ field: { onChange, value } }) => (
          <>
            <InputField
              value={value}
              onChange={(e) => {
                onChange(e);
                handlePasswordChange(e.target.value);
              }}
              margin="normal"
              required
              label={t("NEW_PASSWORD_PLACEHOLDER")}
              type="password"
              error={!!errors.password}
              helperText={errors.password ? t(errors.password.message || "") : ""}
            />
            {showStrengthMeter && <PasswordStrengthMeter strength={passwordStrength} />}
          </>
        )}
      />
      <Controller
        name="confirmPassword"
        control={control}
        defaultValue=""
        render={({ field: { onChange, value } }) => (
          <InputField
            value={value}
            onChange={onChange}
            margin="normal"
            required
            fullWidth
            label={t("CONFIRM_PASSWORD_PLACEHOLDER")}
            type="password"
            error={!!errors.confirmPassword}
            helperText={
              errors.confirmPassword ? t(errors.confirmPassword.message || "") : ""
            }
          />
        )}
      />
      <ButtonComponent
        label={t("RESET_PASSWORD")}
        onClick={handleSubmit(onSubmit)}
        variant="contained"
        color="primary"
        SxProps={{ mt: 3, mb: 2, width: "100%" }}
        isLoading={loading}
        size="large"
      />
    </Box>
  );
};

export default PasswordResetForm;