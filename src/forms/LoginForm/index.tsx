import React from "react";
import { TextField, Button, Box, Grid, Link } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import ButtonComponent from "../../components/Button";
import WarningIcon from '@mui/icons-material/Warning';

type LoginFormInputs = {
  email: string;
  password: string;
};

interface LoginFormProps {
  onSubmit: (data: LoginFormInputs) => void;
  loading: boolean;
  error?: string;
}

/**
 * LoginForm component renders a login form with email and password fields.
 * It uses react-hook-form for form handling and validation, and i18next for translations.
 *
 * @param {LoginFormProps} props - The props for the LoginForm component.
 * @param {function} props.onSubmit - The function to call when the form is submitted.
 * @param {boolean} props.loading - Indicates if the form is in a loading state.
 * @param {string} [props.error] - Optional error message to display.
 *
 * @returns {JSX.Element} The rendered LoginForm component.
 */
const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, loading }) => {
  const { t } = useTranslation();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      sx={{ mt: 1 }}
    >
      <Controller
        name="email"
        control={control}
        defaultValue=""
        rules={{ required: t("EMAIL_REQUIRED") }}
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
            helperText={errors.email ? t("EMAIL_REQUIRED") : ""}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        defaultValue=""
        rules={{ required: t("PASSWORD_REQUIRED") }}
        render={({ field: { onChange, value } }) => (
          <TextField
            value={value}
            onChange={onChange}
            margin="normal"
            required
            fullWidth
            name="password"
            label={t("PASSWORD_PLACEHOLDER")}
            type="password"
            id="password"
            autoComplete="current-password"
            error={!!errors.password}
            helperText={errors.password ? t("PASSWORD_REQUIRED") : ""}
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
        {t("SIGN_IN")}
      </Button>

      <ButtonComponent
        onClick={() => console.log("Button clicked")}
        label="boton de prueba"
        color="warning"
        endIcon={<WarningIcon />}
        // isLoading={true}
        size="large"
        startIcon={<WarningIcon />}
        variant="outlined"
        SxProps={{ width: "100%" }}
      />

      <Grid container>
        <Grid item xs>
          <Link href="/auth/password-recovery" variant="body2">
            {t("FORGOT_PASSWORD")}
          </Link>
        </Grid>
        <Grid item>
          <Link href="/auth/register" variant="body2">
            {t("REGISTER_NOW")}
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LoginForm;
