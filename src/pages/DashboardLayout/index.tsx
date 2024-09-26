import React from "react";
import { Box, Toolbar, useMediaQuery, Typography, Button } from "@mui/material";
import SideNav from "./local-components/SideNav";
import DashboardNavBar from "./local-components/DashboardNavBar";
import { Outlet, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next"; // Agrega el hook useTranslation

const drawerWidth = 240;

const DashboardLayout: React.FC = () => {
  const isSmallScreen = useMediaQuery("(max-width:800px)");
  const navigate = useNavigate();
  const { t } = useTranslation(); // Usa el hook useTranslation

  const handleLogout = async () => {
    try {
      // Simulación de petición de cierre de sesión (lógica real pendiente de implementar)
      console.log("Cerrando sesión...");
      // Redirigir a la página de inicio
      navigate("/");
    } catch (error) {
      console.error("Error al cerrar sesión", error);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      {isSmallScreen ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            width: "100%",
            textAlign: "center",
            padding: "16px",
            flexDirection: "column",
          }}
        >
          <Typography variant="h6" sx={{ marginBottom: "16px" }}>
            {t("MOBILE_DEVICE_WARNING")} {/* Traducción correcta */}
          </Typography>
          <Button variant="contained" color="secondary" onClick={handleLogout}>
            {t("LOGOUT")} {/* Traducción correcta */}
          </Button>
        </Box>
      ) : (
        <>
          <DashboardNavBar />
          <SideNav />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              backgroundColor: "#f5f5f5",
              minHeight: "100vh",
              padding: "16px",
              marginLeft: `${drawerWidth}px`,
            }}
          >
            <Toolbar />
            <Outlet />
          </Box>
        </>
      )}
    </Box>
  );
};

export default DashboardLayout;
