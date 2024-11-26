import React from "react";
import { Button, Box, Grid, Link } from "@mui/material";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import InputField from "../../components/InputField";

type LoginFormInputs = {
  email: string;
  password: string;
};

interface LoginFormProps {
  onSubmit: (data: LoginFormInputs) => void;
  loading: boolean;
  error?: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, loading }) => {
  const { t } = useTranslation();
  const {
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<LoginFormInputs>();

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      sx={{ mt: 1 }}
    >
      <InputField
        label={t("EMAIL_ADDRESS_PLACEHOLDER")}
        type="email"
        value={watch("email") || ""}
        onChange={(value) => setValue("email", String(value))}
        required
        errorText={errors.email ? t("EMAIL_REQUIRED") : ""}
      />
      <InputField
        label={t("PASSWORD_PLACEHOLDER")}
        type="password"
        value={watch("password") || ""}
        onChange={(value) => setValue("password", String(value))}
        required
        errorText={errors.password ? t("PASSWORD_REQUIRED") : ""}
        sx={{ mt: 2 }}
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