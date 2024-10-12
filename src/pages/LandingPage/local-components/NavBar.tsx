import React, { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Language";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../../../components/LanguageSwitcher";

/**
 * NavBar component that renders the navigation bar for the application.
 * It includes links to different sections of the page and a language switcher.
 */
const NavBar: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { t } = useTranslation();

  /**
   * Toggles the state of the drawer (open/close).
   * @param open - Boolean indicating whether the drawer should be open or closed.
   */
  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const sections = [
    { name: t("HOME"), href: "#inicio" },
    { name: t("BENEFITS"), href: "#beneficios" },
    { name: t("OUR_MISSION"), href: "#mision" },
    { name: t("SERVICES"), href: "#servicios" },
    { name: t("OUR_PLANS"), href: "#planes" },
    { name: t("CONTACT"), href: "#contacto" },
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "#82ca9d" }}>
        <Toolbar>
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              textAlign: { xs: "center", md: "left" },
              padding: { xs: "0 10px", md: "0 20px" },
            }}
          >
            {t("APP_TITLE")}
          </Typography>

          <Box sx={{ display: { xs: "none", md: "flex" }, gap: "2rem" }}>
            {sections.map((section) => (
              <Button
                key={section.name}
                href={section.href}
                sx={{
                  color: "white",
                  fontSize: "1rem",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                  },
                }}
              >
                {section.name}
              </Button>
            ))}

            <Button
              component={Link}
              to="/auth/login"
              sx={{
                color: "white",
                backgroundColor: "#4eaace",
                textTransform: "none",
                padding: "10px 20px",
                borderRadius: "20px",
                marginLeft: "auto",
                "&:hover": {
                  backgroundColor: "#3b94a3",
                },
              }}
            >
              {t("LOGIN")}
            </Button>
            <LanguageSwitcher sx={{ marginLeft: "1rem" }} />
          </Box>

          <IconButton
            color="inherit"
            edge="start"
            aria-label="menu"
            onClick={toggleDrawer(true)}
            sx={{ display: { xs: "flex", md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        sx={{ display: { xs: "block", md: "none" } }}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            {sections.map((section) => (
              <ListItem key={section.name} component="a" href={section.href}>
                <ListItemText primary={section.name} />
              </ListItem>
            ))}

            <ListItem component={Link} to="/auth/login">
              <ListItemText primary="Login" />
            </ListItem>

            <ListItem>
              <LanguageSwitcher />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};

export default NavBar;
