import React, { useState, useEffect } from "react";
import { Container, Box } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import PasswordResetForm from "../../forms/PasswordResetForm";
import { usePasswordReset } from "../../services/auth/passwordReset.service";
import Loader from "../../components/Loader";
import LanguageSwitcher from "../../components/LanguageSwitcher";
import LockResetIcon from "@mui/icons-material/LockReset";
import { getRandomColor } from "../../utils/getRandomColor";
import { t } from "i18next";
import ErrorSnackbar from "../../components/ErrorSnackbar";
import AvatarComponent from "../../components/AvatarComponent";

/**
 * PasswordReset page for handling the password reset process.
 * Captures the token from the URL and allows users to reset their password.
 *
 * @returns {JSX.Element} The rendered PasswordReset component.
 */
const PasswordReset: React.FC = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();
  const { resetPassword, loading, error, success } = usePasswordReset();
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    if (!token) {
      navigate("/error");
    }
  }, [token, navigate]);

  /**
   * Handles form submission for password reset.
   * @param {Object} data - The reset data.
   * @param {string} data.password - The new password.
   * @param {string} data.confirmPassword - Confirmation of the new password.
   */
  const onSubmit = async (data: {
    password: string;
    confirmPassword: string;
  }) => {
    if (token) {
      await resetPassword(token, data.password);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  useEffect(() => {
    if (error || success) {
      setOpenSnackbar(true);
    }

    if (success) {
      setTimeout(() => {
        navigate("/auth/login");
      }, 2000);
    }
  }, [error, success, navigate]);

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
        <AvatarComponent
          icon={<LockResetIcon />}
          backgroundColor={getRandomColor()}
        />
        <PasswordResetForm onSubmit={onSubmit} loading={loading} />

        <ErrorSnackbar
          open={openSnackbar}
          onClose={handleCloseSnackbar}
          severity={success ? "success" : "error"}
          message={success ? t("PASSWORD_RESET_SUCCESS") : error || ""}
        />
      </Box>
    </Container>
  );
};

export default PasswordReset;