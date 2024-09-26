import {
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Badge,
  Menu,
  MenuItem,
  Typography,
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Tooltip,
  Button,
} from "@mui/material";
import {
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  Settings as SettingsIcon,
  AccountCircle,
  Circle as CircleIcon,
} from "@mui/icons-material";
import { useState } from "react";
import { format } from "date-fns";
import LanguageSwitcher from "../../../components/LanguageSwitcher";
import { useTranslation } from "react-i18next";

const exampleNotifications = [
  {
    id: 1,
    message: "Nueva transacción recibida",
    read: false,
    timestamp: "2024-09-25 10:34",
  },
  {
    id: 2,
    message: "Recordatorio de pago vencido",
    read: false,
    timestamp: "2024-09-25 09:15",
  },
  {
    id: 3,
    message: "Actualización de política de privacidad",
    read: true,
    timestamp: "2024-09-24 18:22",
  },
  {
    id: 4,
    message: "Depósito exitoso en cuenta bancaria",
    read: true,
    timestamp: "2024-09-24 17:10",
  },
  {
    id: 5,
    message: "Alerta de seguridad",
    read: false,
    timestamp: "2024-09-23 12:00",
  },
];

const DashboardNavBar = () => {
  const { t } = useTranslation(); // Usa el hook useTranslation
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [settingsAnchorEl, setSettingsAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const [notificationAnchorEl, setNotificationAnchorEl] =
    useState<null | HTMLElement>(null);
  const [showAllNotifications, setShowAllNotifications] = useState(false);

  const unreadNotificationsCount = exampleNotifications.filter(
    (notification) => !notification.read
  ).length;

  const sortedNotifications = exampleNotifications.sort(
    (a, b) => Number(a.read) - Number(b.read)
  );

  const handleShowMore = () => {
    setShowAllNotifications(true);
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSettingsMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setSettingsAnchorEl(event.currentTarget);
  };

  const handleNotificationMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSettingsAnchorEl(null);
    setNotificationAnchorEl(null);
  };

  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Logo o nombre de la empresa */}
        <Typography variant="h6" noWrap component="div">
          NicaWallet Dashboard
        </Typography>

        {/* Iconos a la derecha */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {/* Botón para seleccionar idioma */}
          <LanguageSwitcher /> {/* Usamos el LanguageSwitcher directamente */}
          {/* Botón de notificaciones */}
          <IconButton color="inherit" onClick={handleNotificationMenuOpen}>
            <Badge badgeContent={unreadNotificationsCount} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <Menu
            anchorEl={notificationAnchorEl}
            open={Boolean(notificationAnchorEl)}
            onClose={handleMenuClose}
            sx={{ width: 350, maxHeight: 300 }}
            PaperProps={{
              style: {
                width: 350,
                maxHeight: 300,
              },
            }}
          >
            <List sx={{ overflow: "auto", maxHeight: 250 }}>
              {sortedNotifications.length > 0 ? (
                sortedNotifications
                  .slice(
                    0,
                    showAllNotifications ? sortedNotifications.length : 3
                  )
                  .map((notification) => (
                    <ListItem
                      key={notification.id}
                      sx={{
                        backgroundColor: notification.read
                          ? "white"
                          : "#e3f2fd",
                        transition: "background-color 0.3s",
                        "&:hover": { backgroundColor: "#e0e0e0" },
                      }}
                    >
                      {!notification.read && (
                        <ListItemSecondaryAction>
                          <Tooltip title="No leído">
                            <CircleIcon
                              sx={{ color: "#42a5f5", fontSize: 10 }}
                            />
                          </Tooltip>
                        </ListItemSecondaryAction>
                      )}
                      <ListItemText
                        primary={notification.message}
                        secondary={`Recibido: ${format(
                          new Date(notification.timestamp),
                          "dd/MM/yyyy HH:mm"
                        )}`}
                        sx={{
                          fontWeight: notification.read ? "normal" : "bold",
                        }}
                      />
                    </ListItem>
                  ))
              ) : (
                <MenuItem onClick={handleMenuClose}>
                  No tienes notificaciones
                </MenuItem>
              )}
            </List>

            {/* Botón para mostrar más notificaciones */}
            {sortedNotifications.length > 3 && !showAllNotifications && (
              <MenuItem
                onClick={handleShowMore}
                sx={{ justifyContent: "center" }}
              >
                <Button variant="outlined" size="small">
                  Mostrar más
                </Button>
              </MenuItem>
            )}
          </Menu>
          {/* Botón de ajustes con menú */}
          <IconButton color="inherit" onClick={handleSettingsMenuOpen}>
            <SettingsIcon />
          </IconButton>
          <Menu
            anchorEl={settingsAnchorEl}
            open={Boolean(settingsAnchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>Configuración general</MenuItem>
            <MenuItem onClick={handleMenuClose}>Preferencias</MenuItem>
          </Menu>
          {/* Menú desplegable de perfil */}
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleProfileMenuOpen}
          >
            <AccountCircle />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>Mi Perfil</MenuItem>
            <MenuItem onClick={handleMenuClose}>Cerrar Sesión</MenuItem>
          </Menu>
          {/* Campo de búsqueda con borde */}
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: 250,
              marginLeft: "20px",
              borderRadius: "4px",
              border: "1px solid rgba(0, 0, 0, 0.23)", // Agregar el borde
            }}
          >
            <SearchIcon sx={{ color: "rgba(0, 0, 0, 0.54)" }} />
            <InputBase
              placeholder={t("SEARCH")}
              inputProps={{ "aria-label": "search" }}
              sx={{ ml: 1, flex: 1, color: "black" }}
            />
          </Paper>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default DashboardNavBar;
