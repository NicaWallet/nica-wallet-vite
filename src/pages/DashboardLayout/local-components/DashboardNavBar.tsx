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
  AccountCircle,
  Circle as CircleIcon,
} from "@mui/icons-material";
import { useState } from "react";
import { format } from "date-fns";
import LanguageSwitcher from "../../../components/LanguageSwitcher";
import { useTranslation } from "react-i18next";
import useGetUserNotifications from "../../../services/notifications/getUserNotificationsMock.service";
import AvatarComponent from "../../../components/Avatar";

/**
 * DashboardNavBar component renders the navigation bar for the dashboard.
 * It includes language switcher, notifications, settings, profile menu, and a search bar.
 */
const DashboardNavBar = () => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notificationAnchorEl, setNotificationAnchorEl] =
    useState<null | HTMLElement>(null);
  const [showAllNotifications, setShowAllNotifications] = useState(false);


  const { notifications: exampleNotifications, loading, error } = useGetUserNotifications();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading notifications</div>;
  }

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

  const handleNotificationMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setNotificationAnchorEl(null);
  };

  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" noWrap component="div">
          NicaWallet Dashboard
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <LanguageSwitcher />
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

          <AvatarComponent
            fallbackText="U"
            size="medium"
            backgroundColor="#3f51b5"
            textColor="#fff"
            border="2px solid #fff"
            sx={{ cursor: "pointer", width: 30, height: 30 }}
            onClick={() => handleProfileMenuOpen}
            icon={<AccountCircle />}
            menuOptions={[
              {
                label: "Mi Perfil",
                onClick: () => {
                  handleMenuClose();
                  window.location.href = "/profile";
                },
              },
              {
                label: "Cerrar Sesión",
                onClick: () => {
                  handleMenuClose();
                  localStorage.clear();
                  window.location.href = "/auth/login";
                },
              },
            ]}
          />
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>Mi Perfil</MenuItem>
            <MenuItem onClick={handleMenuClose}>Cerrar Sesión</MenuItem>
          </Menu>
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: 250,
              marginLeft: "20px",
              borderRadius: "4px",
              border: "1px solid rgba(0, 0, 0, 0.23)",
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
