import React from "react";
import { Button, Box, Typography, Container, Link } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import LanguageSwitcher from "../../components/LanguageSwitcher";
import { useRegister } from "../../services/auth/register.service";
import { getRegisterSchema } from "../../schemas/registerSchema";
import { RegisterFormData, RegisterPayload } from "../../types/auth/auth.types";
import RegisterForm from "../../forms/RegisterForm";
import ErrorSnackbar from "../../components/ErrorSnackbar";
import { usePasswordStrength } from "../../hooks/usePasswordStrength";
import AvatarComponent from "../../components/Avatar";
import { getRandomColor } from "../../utils/getRandomColor";

/**
 * Register component for user registration.
 * @returns {JSX.Element} The Register component.
 */
const Register: React.FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate();

  const formMethods = useForm<RegisterFormData>({
    resolver: yupResolver(getRegisterSchema(t)),
  });

  const { register: registerUser, loading, error } = useRegister();
  const { passwordStrength, showPasswordStrength, handlePasswordChange } =
    usePasswordStrength();

  /**
   * Handles form submission for user registration.
   * @param {RegisterFormData} data - The form data.
   */
  const onSubmit = async (data: RegisterFormData) => {
    const payload: RegisterPayload = {
      first_name: data.first_name,
      first_surname: data.last_name,
      email: data.email,
      password: data.password,
      birthdate: data.birthdate.toISOString(),
      role_id: 1,
    };

    try {
      const response = await registerUser(payload);
      if (response) {
        navigate("/auth/login");
        formMethods.reset();
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  const styles = {
    formContainer: {
      marginTop: 8,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    avatar: {
      m: 1,
      bgcolor: theme.palette.secondary.main,
    },
    submitButton: {
      mt: 3,
      mb: 2,
    },
    languageSwitcher: {
      position: "fixed",
      top: 16,
      right: 16,
    },
  };

  return (
    <Container component="main" maxWidth="xs">
      {loading && <Loader />}
      <Box sx={styles.formContainer}>
        <AvatarComponent icon={<LockOutlinedIcon />} backgroundColor={getRandomColor()} />
        <Typography component="h1" variant="h5">
          {t("REGISTER")}
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={formMethods.handleSubmit(onSubmit)}
          sx={{ mt: 3 }}
        >
          <RegisterForm
            form={formMethods}
            handlePasswordChange={(e) => handlePasswordChange(e.target.value)}
            passwordStrengthVisible={showPasswordStrength}
            passwordStrength={passwordStrength}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={styles.submitButton}
          >
            {t("REGISTER")}
          </Button>
          <Link
            sx={{
              display: "flex",
              justifyContent: "right",
            }}
            variant="body2"
            onClick={() => navigate("/auth/login")}
          >
            {t("ALREADY_HAVE_AN_ACCOUNT")}
          </Link>
        </Box>
      </Box>

      <LanguageSwitcher sx={styles.languageSwitcher} />

      {error && (
        <ErrorSnackbar
          message={error}
          onClose={() => {}}
          open={Boolean(error)}
        />
      )}
    </Container>
  );
};

export default Register;
