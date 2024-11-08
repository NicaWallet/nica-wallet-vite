import React, { useState, useEffect } from "react";
import {
  Container,
  Avatar,
  Box,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom";
import LanguageSwitcher from "../../components/LanguageSwitcher";
import PasswordRecoveryForm from "../../forms/PasswordRecoveryForm";
import Loader from "../../components/Loader";
import { t } from "i18next";
// import { usePasswordRecovery } from "../../services/auth/passwordRecovery.service";
import MailLockIcon from '@mui/icons-material/MailLock';

/**
 * PasswordRecovery page component for requesting password recovery.
 * It handles the form submission and shows feedback to the user.
 *
 * @returns {JSX.Element} The rendered PasswordRecovery component.
 */
const PasswordRecovery: React.FC = () => {
  const navigate = useNavigate();
//   const { recoverPassword, loading, error, success } = usePasswordRecovery();
  const [openSnackbar, setOpenSnackbar] = useState(false);

  /**
   * Handles form submission for password recovery.
   * @param {Object} data - The recovery data.
   * @param {string} data.email - The user's email.
   */
  const onSubmit = async (data: { email: string }) => {
    console.log(data);
    // await recoverPassword(data.email);
  };

  /**
   * Closes the Snackbar after showing the message.
   */
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

//   useEffect(() => {
//     if (error || success) {
//       setOpenSnackbar(true);
//     }
//   }, [error, success]);

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
      {/* {loading && <Loader />} */}
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
          <MailLockIcon />
        </Avatar>
      

        <PasswordRecoveryForm onSubmit={onSubmit} loading={false} />

        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert
            onClose={handleCloseSnackbar}
            // severity={success ? "success" : "error"}
            sx={{ width: "100%" }}
          >
            'Recovery email sent!'
            {/* {success ? "Recovery email sent!" : error} */}
          </Alert>
        </Snackbar>
      </Box>
    </Container>
  );
};

export default PasswordRecovery;
