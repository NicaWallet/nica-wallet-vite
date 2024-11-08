import React, { useState, useEffect } from "react";
import { Container, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LanguageSwitcher from "../../components/LanguageSwitcher";
import LoginForm from "../../forms/LoginForm";
import Loader from "../../components/Loader";
import { useLogin } from "../../services/auth/login.service";
import AvatarComponent from "../../components/Avatar";
import { HomeFloatingButton } from "./local-components/HomeFloatingButton";
import ErrorSnackbar from "../../components/ErrorSnackbar";
import LoginIcon from '@mui/icons-material/Login';
import { t } from "i18next";
import { getRandomColor } from "../../utils/getRandomColor";

/**
 * Login component that handles user authentication.
 * @returns {JSX.Element} The rendered component.
 */
const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login, loading, error } = useLogin();
  const [openError, setOpenError] = useState(false);

  /**
   * Handles form submission for login.
   * @param {Object} data - The login data.
   * @param {string} data.email - The user's email.
   * @param {string} data.password - The user's password.
   */
  const onSubmit = async (data: { email: string; password: string }) => {
    await login(data.email, data.password);
  };

  /**
   * Navigates to the landing page.
   */
  const onLandingPageClick = () => {
    navigate("/");
  };

  useEffect(() => {
    if (error) {
      setOpenError(true);
    }
  }, [error]);

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      {loading && <Loader />}
      <LanguageSwitcher
        sx={{
          position: "fixed",
          top: 16,
          right: 16,
        }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <AvatarComponent icon={<LoginIcon />} backgroundColor={getRandomColor()} />
        <Typography component="h1" variant="h5">
          {t("LOGIN")}
        </Typography>

        <LoginForm onSubmit={onSubmit} loading={loading} error={error} />

        <HomeFloatingButton onLandingPageClick={onLandingPageClick} />
      </Box>

      <ErrorSnackbar
        open={openError}
        message={error || ""}
      />
    </Container>
  );
};

export default Login;