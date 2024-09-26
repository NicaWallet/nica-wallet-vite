import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Box,
  Typography,
  Avatar,
  Grid,
  Link,
  Fab,
  Tooltip,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import HomeIcon from "@mui/icons-material/Home";
import LanguageIcon from "@mui/icons-material/Language";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/auth/login.service";

const LoginPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Evitar la recarga de la página

    // Aquí simplemente usamos los valores de email y password que están en el estado
    console.log({
      email,
      password,
    });

    try {
      const response = await login(email, password);
      console.log(response);

      localStorage.setItem("token", response.access_token);
      localStorage.setItem("user", JSON.stringify(response.user));

      console.log("User logged in", response.user);

      console.log("Login successful");
      navigate("/welcome");
    } catch (error) {
      console.error("Login failed", error);
    } finally {
      console.log("Login process finished");
    }
  };

  const onRegisterClick = () => {
    navigate("/auth/register");
  };

  const onForgotPasswordClick = () => {
    navigate("/auth/forgot-password");
  };

  const onLandingPageClick = () => {
    navigate("/");
  };

  const handleLanguageMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLanguageChange = (lng: string) => {
    i18n.changeLanguage(lng);
    setAnchorEl(null); // Cerrar el menú después de seleccionar el idioma
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Lista de idiomas disponibles
  const availableLanguages = [
    { code: "en", label: "English" },
    { code: "es", label: "Español" },
    // Agregar más idiomas si es necesario
  ];

  // Filtrar para que no se muestre el idioma actual
  const languagesToShow = availableLanguages.filter(
    (lang) => lang.code !== i18n.language
  );

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {t("LOGIN_TITLE")}
        </Typography>
        <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label={t("EMAIL_ADDRESS_PLACEHOLDER")}
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label={t("PASSWORD_PLACEHOLDER")}
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {t("SIGN_IN")}
          </Button>
          <Grid container>
            <Grid item xs>
              <Link onClick={onForgotPasswordClick} variant="body2">
                {t("FORGOT_PASSWORD")}
              </Link>
            </Grid>
            <Grid item>
              <Link variant="body2" onClick={onRegisterClick}>
                {t("REGISTER_NOW")}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>

      {/* Botón flotante con Tooltip */}
      <Tooltip title={t("BACK_TO_LANDING")} aria-label="back-to-landing">
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

      {/* Botón de selección de idioma */}
      <Tooltip title={t("CHANGE_LANGUAGE")} aria-label="change-language">
        <IconButton
          color="inherit"
          aria-label="change-language"
          onClick={handleLanguageMenuClick}
          sx={{
            position: "fixed",
            top: 16,
            right: 16,
          }}
        >
          <LanguageIcon />
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {languagesToShow.map((lang) => (
          <MenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
          >
            {lang.label}
          </MenuItem>
        ))}
      </Menu>
    </Container>
  );
};

export default LoginPage;
