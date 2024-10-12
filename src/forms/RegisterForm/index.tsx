import React from "react";
import {
  Box,
  Grid,
  TextField,
  Typography,
  LinearProgress,
} from "@mui/material";
import { UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { RegisterFormData } from "../../types/auth/auth.types";

/**
 * Props for the RegisterForm component.
 */
interface RegisterFormProps {
  form: UseFormReturn<RegisterFormData>;
  handlePasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  passwordStrengthVisible: boolean;
  passwordStrength: number;
}

/**
 * RegisterForm component for user registration.
 *
 * @param {RegisterFormProps} props - The props for the component.
 * @returns {JSX.Element} The rendered RegisterForm component.
 */
const RegisterForm: React.FC<RegisterFormProps> = ({
  form,
  handlePasswordChange,
  passwordStrengthVisible,
  passwordStrength,
}) => {
  const { t } = useTranslation();
  const { register, formState } = form;
  const { errors } = formState;

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            {...register("first_name")}
            autoComplete="given-name"
            required
            fullWidth
            id="firstName"
            label={t("FIRST_NAME")}
            autoFocus
            error={!!errors.first_name}
            helperText={errors.first_name?.message as string}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            {...register("last_name")}
            required
            fullWidth
            id="lastName"
            label={t("LAST_NAME")}
            autoComplete="family-name"
            error={!!errors.last_name}
            helperText={errors.last_name?.message as string}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            {...register("birthdate")}
            required
            fullWidth
            id="birthDate"
            label={t("BIRTH_DATE")}
            name="birthdate"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            error={!!errors.birthdate}
            helperText={errors.birthdate?.message as string}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            {...register("email")}
            required
            fullWidth
            id="email"
            label={t("EMAIL_ADDRESS_PLACEHOLDER")}
            name="email"
            autoComplete="email"
            error={!!errors.email}
            helperText={errors.email?.message as string}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            {...register("confirmEmail")}
            required
            fullWidth
            id="confirmEmail"
            label={t("CONFIRM_EMAIL_ADDRESS")}
            name="confirmEmail"
            autoComplete="email"
            error={!!errors.confirmEmail}
            helperText={errors.confirmEmail?.message as string}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            {...register("password")}
            required
            fullWidth
            name="password"
            label={t("PASSWORD_PLACEHOLDER")}
            type="password"
            id="password"
            autoComplete="new-password"
            error={!!errors.password}
            helperText={errors.password?.message as string}
            onChange={handlePasswordChange}
          />
          {passwordStrengthVisible && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2">
                {passwordStrength === 100
                  ? t("PASSWORD_STRONG")
                  : passwordStrength >= 75
                  ? t("PASSWORD_MODERATE")
                  : t("PASSWORD_WEAK")}
              </Typography>
              <LinearProgress
                variant="determinate"
                value={passwordStrength}
                sx={{
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: "background.default",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor:
                      passwordStrength === 100
                        ? "success.main"
                        : passwordStrength >= 75
                        ? "warning.main"
                        : "error.main",
                  },
                }}
              />
            </Box>
          )}
        </Grid>
        <Grid item xs={12}>
          <TextField
            {...register("confirmPassword")}
            required
            fullWidth
            name="confirmPassword"
            label={t("CONFIRM_PASSWORD_PLACEHOLDER")}
            type="password"
            id="confirmPassword"
            autoComplete="new-password"
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message as string}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default RegisterForm;
