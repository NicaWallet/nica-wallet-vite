import { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Box,
  Toolbar,
  Collapse,
  Popper,
  Paper,
  ClickAwayListener,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { t } from "i18next";
import HomeIcon from "@mui/icons-material/Home";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import BarChartIcon from "@mui/icons-material/BarChart";
import PieChartIcon from "@mui/icons-material/PieChart";
import FlagIcon from "@mui/icons-material/Flag";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ReceiptIcon from "@mui/icons-material/Receipt";
import NotificationsIcon from "@mui/icons-material/Notifications";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import HelpIcon from "@mui/icons-material/Help";
import SettingsIcon from "@mui/icons-material/Settings";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const drawerWidth = 240;

/**
 * SideNav component renders a navigation drawer with various menu items.
 * It supports nested submenus and collapsible sections.
 */
const SideNav = () => {
  const [open, setOpen] = useState(true);
  const [openAnalytics, setOpenAnalytics] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [openSecurity, setOpenSecurity] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [submenuContent, setSubmenuContent] = useState<JSX.Element | null>(
    null
  );
  const navigate = useNavigate();

  /**
   * Toggles the drawer open and close state.
   */
  const handleDrawerToggle = () => {
    setOpen(!open);
    setAnchorEl(null);
  };

  /**
   * Toggles the Analytics submenu.
   * @param event - The mouse event triggering the toggle.
   */
  const toggleAnalytics = (event: React.MouseEvent<HTMLElement>) => {
    if (!open) {
      setAnchorEl(anchorEl ? null : event.currentTarget);
      setSubmenuContent(
        <List component="div" disablePadding>
          <ListItem
            sx={{ pl: 2 }}
            onClick={() => handleNavigate("/analytics/statistics")}
          >
            <ListItemText primary={t("STATISTICS")} />
          </ListItem>
          <ListItem
            sx={{ pl: 2 }}
            onClick={() => handleNavigate("/analytics/trends")}
          >
            <ListItemText primary={t("TRENDS")} />
          </ListItem>
        </List>
      );
    } else {
      setOpenAnalytics(!openAnalytics);
    }
  };

  /**
   * Toggles the Profile submenu.
   * @param event - The mouse event triggering the toggle.
   */
  const toggleProfile = (event: React.MouseEvent<HTMLElement>) => {
    if (!open) {
      setAnchorEl(anchorEl ? null : event.currentTarget);
      setSubmenuContent(
        <List component="div" disablePadding>
          <ListItem
            sx={{ pl: 2 }}
            onClick={() => handleNavigate("/profile/details")}
          >
            <ListItemText primary={t("PERSONAL_INFO")} />
          </ListItem>
          <ListItem
            sx={{ pl: 2 }}
            onClick={() => handleNavigate("/profile/preferences")}
          >
            <ListItemText primary={t("PREFERENCES")} />
          </ListItem>
        </List>
      );
    } else {
      setOpenProfile(!openProfile);
    }
  };

  /**
   * Toggles the Security submenu.
   * @param event - The mouse event triggering the toggle.
   */
  const toggleSecurity = (event: React.MouseEvent<HTMLElement>) => {
    if (!open) {
      setAnchorEl(anchorEl ? null : event.currentTarget);
      setSubmenuContent(
        <List component="div" disablePadding>
          <ListItem
            sx={{ pl: 2 }}
            onClick={() => handleNavigate("/security/2fa")}
          >
            <ListItemText primary={t("TWO_FA")} />
          </ListItem>
          <ListItem
            sx={{ pl: 2 }}
            onClick={() => handleNavigate("/security/access-history")}
          >
            <ListItemText primary={t("ACCESS_HISTORY")} />
          </ListItem>
        </List>
      );
    } else {
      setOpenSecurity(!openSecurity);
    }
  };

  /**
   * Navigates to the specified path.
   * @param path - The path to navigate to.
   */
  const handleNavigate = (path: string) => {
    navigate(path);
    setAnchorEl(null);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: open ? drawerWidth : 60,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: open ? drawerWidth : 60,
          boxSizing: "border-box",
          position: "relative",
          height: "100vh",
          overflow: "hidden",
        },
      }}
    >
      <Toolbar />

      <IconButton
        onClick={handleDrawerToggle}
        sx={{
          position: "absolute",
          top: "50%",
          right: "-10px",
          transform: "translateY(-50%)",
          backgroundColor: "#fff",
          borderRadius: "50%",
          boxShadow: 2,
          width: "30px",
          height: "30px",
          zIndex: 1,
        }}
      >
        {open ? (
          <ChevronLeftIcon fontSize="small" />
        ) : (
          <ChevronRightIcon fontSize="small" />
        )}
      </IconButton>

      <List sx={{ height: "calc(100vh - 64px)", overflowY: "auto" }}>
        <ListItem
          onClick={() => handleNavigate("/")}
          sx={{
            cursor: "pointer",
            "&:hover": { backgroundColor: "#f0f0f0" },
            transition: "background-color 0.3s ease",
          }}
        >
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          {open && <ListItemText primary={t("HOME")} />}
        </ListItem>

        <ListItem
          onClick={() => handleNavigate("/dashboard")}
          sx={{
            cursor: "pointer",
            "&:hover": { backgroundColor: "#f0f0f0" },
            transition: "background-color 0.3s ease",
          }}
        >
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          {open && <ListItemText primary={t("DASHBOARD")} />}
        </ListItem>

        <ListItem
          onClick={() => handleNavigate("/accounts")}
          sx={{
            cursor: "pointer",
            "&:hover": { backgroundColor: "#f0f0f0" },
            transition: "background-color 0.3s ease",
          }}
        >
          <ListItemIcon>
            <AccountBalanceIcon />
          </ListItemIcon>
          {open && <ListItemText primary={t("ACCOUNTS")} />}
        </ListItem>

        <ListItem
          onClick={() => handleNavigate("/budget")}
          sx={{
            cursor: "pointer",
            "&:hover": { backgroundColor: "#f0f0f0" },
            transition: "background-color 0.3s ease",
          }}
        >
          <ListItemIcon>
            <PieChartIcon />
          </ListItemIcon>
          {open && <ListItemText primary={t("BUDGET")} />}
        </ListItem>

        <ListItem
          onClick={() => handleNavigate("/goals")}
          sx={{
            cursor: "pointer",
            "&:hover": { backgroundColor: "#f0f0f0" },
            transition: "background-color 0.3s ease",
          }}
        >
          <ListItemIcon>
            <FlagIcon />
          </ListItemIcon>
          {open && <ListItemText primary={t("GOALS")} />}
        </ListItem>

        <ListItem
          onClick={() => handleNavigate("/investments")}
          sx={{
            cursor: "pointer",
            "&:hover": { backgroundColor: "#f0f0f0" },
            transition: "background-color 0.3s ease",
          }}
        >
          <ListItemIcon>
            <TrendingUpIcon />
          </ListItemIcon>
          {open && <ListItemText primary={t("INVESTMENTS")} />}
        </ListItem>

        <ListItem
          onClick={() => handleNavigate("/bills")}
          sx={{
            cursor: "pointer",
            "&:hover": { backgroundColor: "#f0f0f0" },
            transition: "background-color 0.3s ease",
          }}
        >
          <ListItemIcon>
            <ReceiptIcon />
          </ListItemIcon>
          {open && <ListItemText primary={t("BILLS")} />}
        </ListItem>

        <ListItem
          onClick={() => handleNavigate("/reports")}
          sx={{
            cursor: "pointer",
            "&:hover": { backgroundColor: "#f0f0f0" },
            transition: "background-color 0.3s ease",
          }}
        >
          <ListItemIcon>
            <BarChartIcon />
          </ListItemIcon>
          {open && <ListItemText primary={t("REPORTS")} />}
        </ListItem>

        <ListItem
          onClick={toggleAnalytics}
          sx={{
            cursor: "pointer",
            "&:hover": { backgroundColor: "#f0f0f0" },
            transition: "background-color 0.3s ease",
          }}
        >
          <ListItemIcon>
            <InsertChartIcon />
          </ListItemIcon>
          {open && <ListItemText primary={t("ANALYTICS")} />}
          {open && (openAnalytics ? <ExpandLess /> : <ExpandMore />)}
        </ListItem>
        {open && (
          <Collapse in={openAnalytics} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                sx={{
                  pl: 4,
                  cursor: "pointer",
                  "&:hover": { backgroundColor: "#f0f0f0" },
                  transition: "background-color 0.3s ease",
                }}
                onClick={() => handleNavigate("/analytics/statistics")}
              >
                <ListItemText primary={t("STATISTICS")} />
              </ListItem>
              <ListItem
                sx={{
                  pl: 4,
                  cursor: "pointer",
                  "&:hover": { backgroundColor: "#f0f0f0" },
                  transition: "background-color 0.3s ease",
                }}
                onClick={() => handleNavigate("/analytics/trends")}
              >
                <ListItemText primary={t("TRENDS")} />
              </ListItem>
            </List>
          </Collapse>
        )}

        <ListItem
          onClick={toggleProfile}
          sx={{
            cursor: "pointer",
            "&:hover": { backgroundColor: "#f0f0f0" },
            transition: "background-color 0.3s ease",
          }}
        >
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          {open && <ListItemText primary={t("PROFILE")} />}
          {open && (openProfile ? <ExpandLess /> : <ExpandMore />)}
        </ListItem>
        {open && (
          <Collapse in={openProfile} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                sx={{
                  pl: 4,
                  cursor: "pointer",
                  "&:hover": { backgroundColor: "#f0f0f0" },
                  transition: "background-color 0.3s ease",
                }}
                onClick={() => handleNavigate("/profile/details")}
              >
                <ListItemText primary={t("PERSONAL_INFO")} />
              </ListItem>
              <ListItem
                sx={{
                  pl: 4,
                  cursor: "pointer",
                  "&:hover": { backgroundColor: "#f0f0f0" },
                  transition: "background-color 0.3s ease",
                }}
                onClick={() => handleNavigate("/profile/preferences")}
              >
                <ListItemText primary={t("PREFERENCES")} />
              </ListItem>
            </List>
          </Collapse>
        )}

        <ListItem
          onClick={toggleSecurity}
          sx={{
            cursor: "pointer",
            "&:hover": { backgroundColor: "#f0f0f0" },
            transition: "background-color 0.3s ease",
          }}
        >
          <ListItemIcon>
            <LockIcon />
          </ListItemIcon>
          {open && <ListItemText primary={t("SECURITY")} />}
          {open && (openSecurity ? <ExpandLess /> : <ExpandMore />)}
        </ListItem>
        {open && (
          <Collapse in={openSecurity} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                sx={{
                  pl: 4,
                  cursor: "pointer",
                  "&:hover": { backgroundColor: "#f0f0f0" },
                  transition: "background-color 0.3s ease",
                }}
                onClick={() => handleNavigate("/security/2fa")}
              >
                <ListItemText primary={t("TWO_FA")} />
              </ListItem>
              <ListItem
                sx={{
                  pl: 4,
                  cursor: "pointer",
                  "&:hover": { backgroundColor: "#f0f0f0" },
                  transition: "background-color 0.3s ease",
                }}
                onClick={() => handleNavigate("/security/access-history")}
              >
                <ListItemText primary={t("ACCESS_HISTORY")} />
              </ListItem>
            </List>
          </Collapse>
        )}

        <ListItem
          onClick={() => handleNavigate("/notifications")}
          sx={{
            cursor: "pointer",
            "&:hover": { backgroundColor: "#f0f0f0" },
            transition: "background-color 0.3s ease",
          }}
        >
          <ListItemIcon>
            <NotificationsIcon />
          </ListItemIcon>
          {open && <ListItemText primary={t("NOTIFICATIONS")} />}
        </ListItem>

        <ListItem
          onClick={() => handleNavigate("/support")}
          sx={{
            cursor: "pointer",
            "&:hover": { backgroundColor: "#f0f0f0" },
            transition: "background-color 0.3s ease",
          }}
        >
          <ListItemIcon>
            <HelpIcon />
          </ListItemIcon>
          {open && <ListItemText primary={t("SUPPORT")} />}
        </ListItem>
      </List>

      <Box sx={{ flexGrow: 1 }} />

      <List>
        <ListItem
          onClick={() => handleNavigate("/settings")}
          sx={{
            cursor: "pointer",
            "&:hover": { backgroundColor: "#f0f0f0" },
            transition: "background-color 0.3s ease",
          }}
        >
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          {open && <ListItemText primary={t("SETTINGS")} />}
        </ListItem>
      </List>

      <Popper
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        placement="right-start"
      >
        <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
          <Paper elevation={3}>{submenuContent}</Paper>
        </ClickAwayListener>
      </Popper>
    </Drawer>
  );
};

export default SideNav;
