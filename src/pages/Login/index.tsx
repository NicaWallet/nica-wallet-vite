import React, { useState, useEffect } from "react";
import {
  Container,
  Avatar,
  Box,
  Typography,
  Fab,
  Tooltip,
  Snackbar,
  Alert,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import LanguageSwitcher from "../../components/LanguageSwitcher";
import LoginForm from "../../forms/LoginForm";
import Loader from "../../components/Loader";
import { useLogin } from "../../services/auth/login.service";

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

  /**
   * Closes the error Snackbar.
   */
  const handleErrorClose = () => {
    setOpenError(false);
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
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>

        <LoginForm onSubmit={onSubmit} loading={loading} error={error} />

        <Tooltip title="Back to Landing" aria-label="back-to-landing">
          <Fab
            color="primary"
            aria-label="back-to-landing"
            onClick={onLandingPageClick}
            sx={{
              position: "fixed",
              bottom: 16,
              left: 16,
              transition: "transform 0.3s ease-in-out",
              "&:hover": {
                transform: "scale(1.2)",
                bgcolor: "primary.dark",
              },
            }}
          >
            <HomeIcon />
          </Fab>
        </Tooltip>
      </Box>
      <Snackbar
        open={openError}
        autoHideDuration={6000}
        onClose={handleErrorClose}
      >
        <Alert
          onClose={handleErrorClose}
          severity="error"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Login;
