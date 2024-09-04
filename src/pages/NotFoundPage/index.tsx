import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next"; // Para i18n
import { useTheme } from "@mui/material/styles"; // Para acceder al color primario del tema

const NotFoundPage: React.FC = () => {
  const { t } = useTranslation(); // Obtener la función de traducción de i18n
  const theme = useTheme(); // Obtener el color primario del tema

  return (
    <Box
      sx={{
        minHeight: "100vh", // Aseguramos que el contenedor ocupe toda la altura del viewport
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: `linear-gradient(135deg, ${theme.palette.primary.light} 30%, ${theme.palette.primary.main} 90%)`,
        textAlign: "center",
        padding: "20px",
        position: "relative", // Necesario para los pseudo-elementos
        overflow: "hidden", // Evita el desbordamiento que puede causar el scroll
        "::before": {
          content: '""',
          position: "absolute",
          width: "500px",
          height: "500px",
          background: "rgba(255, 255, 255, 0.15)", // Círculo translúcido
          borderRadius: "50%",
          top: "-100px",
          left: "-150px",
          pointerEvents: "none", // Evitar interacciones no deseadas
        },
        "::after": {
          content: '""',
          position: "absolute",
          width: "300px",
          height: "300px",
          background: "rgba(255, 255, 255, 0.1)", // Otro círculo translúcido más pequeño
          borderRadius: "50%",
          bottom: "-100px",
          right: "-100px",
          pointerEvents: "none", // Evitar interacciones no deseadas
        },
      }}
    >
      {/* Título 404 con animación */}
      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: "4rem", md: "6rem" },
          fontWeight: "bold",
          color: "white", // Usamos blanco para el título en contraste con el fondo
          marginBottom: "20px",
          animation: "pulse 2s infinite", // Añadir efecto de pulso
          "@keyframes pulse": {
            "0%": { transform: "scale(1)" },
            "50%": { transform: "scale(1.05)" },
            "100%": { transform: "scale(1)" },
          },
        }}
      >
        404
      </Typography>

      {/* Mensaje descriptivo con traducción */}
      <Typography
        variant="h6"
        sx={{
          marginBottom: "30px",
          color: "white", // Texto en blanco
          fontSize: { xs: "1.2rem", md: "1.5rem" },
          maxWidth: "600px",
        }}
      >
        {t("NOT_FOUND_MESSAGE")}{" "}
        {/* Traducción con pleca baja y en mayúsculas */}
      </Typography>

      {/* Botón de regreso con traducción */}
      <Button
        component={Link}
        to="/"
        variant="contained"
        sx={{
          backgroundColor: "white",
          color: theme.palette.primary.main, // Color principal del tema
          padding: "12px 30px",
          fontSize: "1rem",
          borderRadius: "30px",
          textTransform: "none",
          transition: "background-color 0.3s ease",
          "&:hover": {
            backgroundColor: theme.palette.secondary.light,
            transform: "scale(1.05)", // Efecto de zoom al pasar el ratón
          },
        }}
      >
        {t("GO_BACK_HOME")} {/* Traducción con pleca baja y en mayúsculas */}
      </Button>
    </Box>
  );
};

export default NotFoundPage;
