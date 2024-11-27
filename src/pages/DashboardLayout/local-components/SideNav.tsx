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
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { t } from "i18next";
import HomeIcon from "@mui/icons-material/Home";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import LockIcon from "@mui/icons-material/Lock";
import HelpIcon from "@mui/icons-material/Help";
import SettingsIcon from "@mui/icons-material/Settings";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { AdminPanelSettings } from "@mui/icons-material";

interface UserRole {
  role: {
    role_name: string;
  };
}

const drawerWidth = 240;

const SideNav = () => {
  const [open, setOpen] = useState(true);
  const [openFinances, setOpenFinances] = useState(false);
  const [openTransactions, setOpenTransactions] = useState(false);
  const [openAnalytics, setOpenAnalytics] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const userRoles =
    user?.userRoles?.map((role: UserRole) => role.role.role_name) || [];

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleNavigate = (path: string) => {
    navigate(path);
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
        {/* Primary Navigation */}
        <ListItem
          onClick={() => handleNavigate("/welcome")}
          sx={{ cursor: "pointer", "&:hover": { backgroundColor: "#f0f0f0" } }}
        >
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          {open && <ListItemText primary={t("HOME")} />}
        </ListItem>

        <ListItem
          onClick={() => handleNavigate("/dashboard")}
          sx={{ cursor: "pointer", "&:hover": { backgroundColor: "#f0f0f0" } }}
        >
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          {open && <ListItemText primary={t("DASHBOARD")} />}
        </ListItem>

        {/* Finance Section */}
        <ListItem
          onClick={() => setOpenFinances(!openFinances)}
          sx={{ cursor: "pointer", "&:hover": { backgroundColor: "#f0f0f0" } }}
        >
          <ListItemIcon>
            <AccountBalanceIcon />
          </ListItemIcon>
          {open && <ListItemText primary={t("FINANCES")} />}
          {open && (openFinances ? <ExpandLess /> : <ExpandMore />)}
        </ListItem>
        {open && (
          <Collapse in={openFinances} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                onClick={() => handleNavigate("/budget")}
                sx={{
                  pl: 4,
                  cursor: "pointer",
                  "&:hover": { backgroundColor: "#f0f0f0" },
                }}
              >
                <ListItemText primary={t("BUDGET")} />
              </ListItem>
              <ListItem
                onClick={() => handleNavigate("/goals")}
                sx={{
                  pl: 4,
                  cursor: "pointer",
                  "&:hover": { backgroundColor: "#f0f0f0" },
                }}
              >
                <ListItemText primary={t("GOALS")} />
              </ListItem>
              <ListItem
                onClick={() => handleNavigate("/investments")}
                sx={{
                  pl: 4,
                  cursor: "pointer",
                  "&:hover": { backgroundColor: "#f0f0f0" },
                }}
              >
                <ListItemText primary={t("INVESTMENTS")} />
              </ListItem>
              <ListItem
                onClick={() => handleNavigate("/bills")}
                sx={{
                  pl: 4,
                  cursor: "pointer",
                  "&:hover": { backgroundColor: "#f0f0f0" },
                }}
              >
                <ListItemText primary={t("BILLS")} />
              </ListItem>
              {/* Transactions Submenu */}
              <ListItem
                onClick={() => setOpenTransactions(!openTransactions)}
                sx={{
                  pl: 4,
                  cursor: "pointer",
                  "&:hover": { backgroundColor: "#f0f0f0" },
                }}
              >
                <ListItemText primary={t("TRANSACTIONS")} />
                {openTransactions ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={openTransactions} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem
                    onClick={() => handleNavigate("/transactions-overview")}
                    sx={{
                      pl: 6,
                      cursor: "pointer",
                      "&:hover": { backgroundColor: "#f0f0f0" },
                    }}
                  >
                    <ListItemText primary={t("TRANSACTION_OVERVIEW")} />
                  </ListItem>
                  <ListItem
                    onClick={() => handleNavigate("/transactions-categories")}
                    sx={{
                      pl: 6,
                      cursor: "pointer",
                      "&:hover": { backgroundColor: "#f0f0f0" },
                    }}
                  >
                    <ListItemText primary={t("CATEGORIES")} />
                  </ListItem>
                  <ListItem
                    onClick={() =>
                      handleNavigate("/transactions-sub-categories")
                    }
                    sx={{
                      pl: 6,
                      cursor: "pointer",
                      "&:hover": { backgroundColor: "#f0f0f0" },
                    }}
                  >
                    <ListItemText primary={t("SUB_CATEGORIES")} />
                  </ListItem>
                  <ListItem
                    onClick={() =>
                      handleNavigate("/transactions-classification")
                    }
                    sx={{
                      pl: 6,
                      cursor: "pointer",
                      "&:hover": { backgroundColor: "#f0f0f0" },
                    }}
                  >
                    <ListItemText primary={t("CLASSIFICATION")} />
                  </ListItem>
                  <ListItem
                    onClick={() => handleNavigate("/transactions-history")}
                    sx={{
                      pl: 6,
                      cursor: "pointer",
                      "&:hover": { backgroundColor: "#f0f0f0" },
                    }}
                  >
                    <ListItemText primary={t("TRANSACTION_HISTORY")} />
                  </ListItem>
                </List>
              </Collapse>
            </List>
          </Collapse>
        )}

        {/* Analytics Section */}
        {userRoles.includes("Admin") && (
          <>
            <ListItem
              onClick={() => setOpenAnalytics(!openAnalytics)}
              sx={{
                cursor: "pointer",
                "&:hover": { backgroundColor: "#f0f0f0" },
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
                    onClick={() => handleNavigate("/statistics")}
                    sx={{
                      pl: 4,
                      cursor: "pointer",
                      "&:hover": { backgroundColor: "#f0f0f0" },
                    }}
                  >
                    <ListItemText primary={t("STATISTICS")} />
                  </ListItem>
                  <ListItem
                    onClick={() => handleNavigate("/trends")}
                    sx={{
                      pl: 4,
                      cursor: "pointer",
                      "&:hover": { backgroundColor: "#f0f0f0" },
                    }}
                  >
                    <ListItemText primary={t("TRENDS")} />
                  </ListItem>
                </List>
              </Collapse>
            )}
          </>
        )}

        <ListItem
          onClick={() => handleNavigate("/support")}
          sx={{ cursor: "pointer", "&:hover": { backgroundColor: "#f0f0f0" } }}
        >
          <ListItemIcon>
            <HelpIcon />
          </ListItemIcon>
          {open && <ListItemText primary={t("SUPPORT")} />}
        </ListItem>
      </List>

      {/* Bottom Section */}
      <Box sx={{ flexGrow: 1 }} />
      <List>
        <ListItem
          onClick={() => handleNavigate("/settings")}
          sx={{ cursor: "pointer", "&:hover": { backgroundColor: "#f0f0f0" } }}
        >
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          {open && <ListItemText primary={t("SETTINGS")} />}
        </ListItem>
        <ListItem
          onClick={() => handleNavigate("/security")}
          sx={{ cursor: "pointer", "&:hover": { backgroundColor: "#f0f0f0" } }}
        >
          <ListItemIcon>
            <LockIcon />
          </ListItemIcon>
          {open && <ListItemText primary={t("SECURITY")} />}
        </ListItem>
        {userRoles.includes("Admin") && (
          <ListItem
            onClick={() => handleNavigate("/admin-panel")}
            sx={{
              cursor: "pointer",
              "&:hover": { backgroundColor: "#f0f0f0" },
            }}
          >
            <ListItemIcon>
              <AdminPanelSettings />
            </ListItemIcon>
            {open && <ListItemText primary={t("ADMIN_PANEL")} />}
          </ListItem>
        )}
      </List>
    </Drawer>
  );
};

export default SideNav;
