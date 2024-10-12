import React from "react";
import { Box, Toolbar, useMediaQuery, Typography, Button } from "@mui/material";
import SideNav from "./local-components/SideNav";
import DashboardNavBar from "./local-components/DashboardNavBar";
import { Outlet, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

/**
 * DashboardLayout component that provides the layout for the dashboard.
 * It adjusts the layout based on the screen size.
 */
const DashboardLayout: React.FC = () => {
  const isSmallScreen = useMediaQuery("(max-width:800px)");
  const navigate = useNavigate();
  const { t } = useTranslation();

  /**
   * Handles the logout action by navigating to the home page.
   */
  const handleLogout = async () => {
    try {
      console.log("Cerrando sesión...");
      navigate("/");
    } catch (error) {
      console.error("Error al cerrar sesión", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
      }}
    >
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
            {t("MOBILE_DEVICE_WARNING")}
          </Typography>
          <Button variant="contained" color="secondary" onClick={handleLogout}>
            {t("LOGOUT")}
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
              height: "100%",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            <Toolbar />
            <Box
              sx={{
                flexGrow: 1,
                padding: "16px",
                overflowY: "auto",
              }}
            >
              <Outlet />
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default DashboardLayout;
