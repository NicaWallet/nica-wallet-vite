import React, { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LanguageIcon from "@mui/icons-material/Language";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const NavBar: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { i18n } = useTranslation();
  const isMenuOpen = Boolean(anchorEl);
  const { t } = useTranslation();

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
    handleMenuClose();
  };

  const sections = [
    { name: t("HOME"), href: "#inicio" },
    { name: t("BENEFITS"), href: "#beneficios" },
    { name: t("OUR_MISSION"), href: "#mision" },
    { name: t("SERVICES"), href: "#servicios" },
    { name: t("OUR_PLANS"), href: "#planes" },
    { name: t("CONTACT"), href: "#contacto" },
  ];

  const availableLanguages = ["es", "en"];
  const currentLanguage = i18n.language;
  const languagesToDisplay = availableLanguages.filter(
    (lang) => lang !== currentLanguage
  );

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

            <IconButton
              color="inherit"
              aria-label="change language"
              onClick={handleMenuOpen}
              sx={{ marginLeft: "1rem" }}
            >
              <LanguageIcon />
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={isMenuOpen}
              onClose={handleMenuClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              {languagesToDisplay.map((lang) => (
                <MenuItem key={lang} onClick={() => handleLanguageChange(lang)}>
                  {lang === "es" ? "Español" : "English"}
                </MenuItem>
              ))}
            </Menu>
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
              <IconButton
                color="inherit"
                aria-label="change language"
                onClick={handleMenuOpen}
              >
                <LanguageIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={isMenuOpen}
                onClose={handleMenuClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                {languagesToDisplay.map((lang) => (
                  <MenuItem
                    key={lang}
                    onClick={() => handleLanguageChange(lang)}
                  >
                    {lang === "es" ? "Español" : "English"}
                  </MenuItem>
                ))}
              </Menu>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};

export default NavBar;
