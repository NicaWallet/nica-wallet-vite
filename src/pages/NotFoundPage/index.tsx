import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useTheme } from "@mui/material/styles";

/**
 * NotFoundPage component renders a 404 error page with a styled message and a button to navigate back home.
 */
const NotFoundPage: React.FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();

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
        404
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
        {t("NOT_FOUND_MESSAGE")}
      </Typography>

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
    </Box>
  );
};

export default NotFoundPage;
