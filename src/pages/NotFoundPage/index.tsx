import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useTheme } from "@mui/material/styles";

interface NotFoundPageProps {
  isAccessDenied?: boolean; // Nueva propiedad para identificar si es un caso de acceso denegado
}

const NotFoundPage: React.FC<NotFoundPageProps> = ({ isAccessDenied = false }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Navega hacia atrás
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: `linear-gradient(135deg, ${theme.palette.primary.light} 30%, ${theme.palette.primary.main} 90%)`,
        textAlign: "center",
        padding: "20px",
        position: "relative",
        overflow: "hidden",
        "::before": {
          content: '""',
          position: "absolute",
          width: "500px",
          height: "500px",
          background: "rgba(255, 255, 255, 0.15)",
          borderRadius: "50%",
          top: "-100px",
          left: "-150px",
          pointerEvents: "none",
        },
        "::after": {
          content: '""',
          position: "absolute",
          width: "300px",
          height: "300px",
          background: "rgba(255, 255, 255, 0.1)",
          borderRadius: "50%",
          bottom: "-100px",
          right: "-100px",
          pointerEvents: "none",
        },
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: "4rem", md: "6rem" },
          fontWeight: "bold",
          color: "white",
          marginBottom: "20px",
          animation: "pulse 2s infinite",
          "@keyframes pulse": {
            "0%": { transform: "scale(1)" },
            "50%": { transform: "scale(1.05)" },
            "100%": { transform: "scale(1)" },
          },
        }}
      >
        {isAccessDenied ? t("ACCESS_DENIED_TITLE") : "404"}
      </Typography>

      <Typography
        variant="h6"
        sx={{
          marginBottom: "30px",
          color: "white",
          fontSize: { xs: "1.2rem", md: "1.5rem" },
          maxWidth: "600px",
        }}
      >
        {isAccessDenied ? t("ACCESS_DENIED_MESSAGE") : t("NOT_FOUND_MESSAGE")}
      </Typography>

      {isAccessDenied ? (
        <Button
          onClick={handleGoBack}
          variant="contained"
          sx={{
            backgroundColor: "white",
            color: theme.palette.primary.main,
            padding: "12px 30px",
            fontSize: "1rem",
            borderRadius: "30px",
            textTransform: "none",
            transition: "background-color 0.3s ease",
            "&:hover": {
              backgroundColor: theme.palette.secondary.light,
              transform: "scale(1.05)",
            },
          }}
        >
          {t("GO_BACK")}
        </Button>
      ) : (
        <Button
          component={Link}
          to="/"
          variant="contained"
          sx={{
            backgroundColor: "white",
            color: theme.palette.primary.main,
            padding: "12px 30px",
            fontSize: "1rem",
            borderRadius: "30px",
            textTransform: "none",
            transition: "background-color 0.3s ease",
            "&:hover": {
              backgroundColor: theme.palette.secondary.light,
              transform: "scale(1.05)",
            },
          }}
        >
          {t("GO_BACK_HOME")}
        </Button>
      )}
    </Box>
  );
};

export default NotFoundPage;
