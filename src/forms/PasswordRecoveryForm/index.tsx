import React from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
// import { usePasswordRecovery } from "../../services/auth/passwordRecovery.service"; // Implementa este servicio
import Loader from "../../components/Loader";


type PasswordRecoveryInputs = {
  email: string;
};

interface PasswordRecoveryFormProps {
  loading: boolean;
  onSubmit: (data: PasswordRecoveryInputs) => void;
}

/**
 * PasswordRecoveryForm component renders a form to request password recovery.
 * It uses react-hook-form for form handling and validation, and i18next for translations.
 *
 * @param {PasswordRecoveryFormProps} props - The props for the PasswordRecoveryForm component.
 * @param {function} props.onSubmit - The function to call when the form is submitted.
 * @param {boolean} props.loading - Indicates if the form is in a loading state.
 *
 * @returns {JSX.Element} The rendered PasswordRecoveryForm component.
 */
const PasswordRecoveryForm: React.FC<PasswordRecoveryFormProps> = ({
  onSubmit,
  loading,
}) => {
  const { t } = useTranslation();

  // Schema for Yup validation
  const validationSchema = yup.object().shape({
    email: yup.string().email(t("EMAIL_INVALID")).required(t("EMAIL_REQUIRED")),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<PasswordRecoveryInputs>({
    resolver: yupResolver(validationSchema),
  });

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      sx={{ mt: 1 }}
    >
      <Typography variant="h5" align="center" padding={"8px"}>{t("PASSWORD_RECOVERY")}</Typography>
      <Typography variant="subtitle1" align="center">
        {t("PASSWORD_RECOVERY_SUBTITLE")}
      </Typography>

      <Controller
        name="email"
        control={control}
        defaultValue=""
        render={({ field: { onChange, value } }) => (
          <TextField
            value={value}
            onChange={onChange}
            margin="normal"
            required
            fullWidth
            id="email"
            label={t("EMAIL_ADDRESS_PLACEHOLDER")}
            autoComplete="email"
            autoFocus
            error={!!errors.email}
            // helperText={errors.email ? t(errors.email.message) : ""}
          />
        )}
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        disabled={loading}
      >
        {t("SUBMIT")}
      </Button>

      {loading && <Loader />}
    </Box>
  );
};

export default PasswordRecoveryForm;
