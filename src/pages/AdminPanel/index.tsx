import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  IconButton,
  Box,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import PersonIcon from "@mui/icons-material/Person";
import SecurityIcon from "@mui/icons-material/Security";
import SettingsIcon from "@mui/icons-material/Settings";
import ReportIcon from "@mui/icons-material/Report";
import BarChartIcon from "@mui/icons-material/BarChart";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PageHeader from "../../components/PageHeader";

export const AdminPanel = () => {
  const { t } = useTranslation();

  const adminOptions = [
    {
      title: t("USER_MANAGEMENT"),
      description: t("MANAGE_USERS_PERMISSIONS_ROLES"),
      link: "/admin-panel/users",
      icon: <PersonIcon fontSize="large" />,
    },
    {
      title: t("ROLE_MANAGEMENT"),
      description: t("ASSIGN_UPDATE_USER_ROLES"),
      link: "/admin-panel/roles",
      icon: <SecurityIcon fontSize="large" />,
    },
    {
      title: t("SYSTEM_SETTINGS"),
      description: t("MANAGE_SYSTEM_SETTINGS"),
      link: "/admin-panel/settings",
      icon: <SettingsIcon fontSize="large" />,
    },
    {
      title: t("REPORTS"),
      description: t("VIEW_SYSTEM_REPORTS"),
      link: "/admin-panel/reports",
      icon: <ReportIcon fontSize="large" />,
    },
    {
      title: t("ANALYTICS"),
      description: t("ACCESS_SYSTEM_ANALYTICS"),
      link: "/admin-panel/analytics",
      icon: <BarChartIcon fontSize="large" />,
    },
    {
      title: t("NOTIFICATIONS"),
      description: t("MANAGE_SYSTEM_NOTIFICATIONS"),
      link: "/admin-panel/notifications",
      icon: <NotificationsIcon fontSize="large" />,
    },
  ];

  return (
    <>
      <PageHeader titleKey="Admin Panel" />
      <Container>
        <Grid container spacing={3} sx={{ mt: 2 }}>
          {adminOptions.map((option, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  height: "300px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  borderRadius: "12px",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
                  },
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      mb: 2,
                    }}
                  >
                    <IconButton color="primary">{option.icon}</IconButton>
                  </Box>
                  <Typography variant="h6" component="div" gutterBottom>
                    {option.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {option.description}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: "center" }}>
                  <Button
                    size="large"
                    href={option.link}
                    variant="contained"
                    color="primary"
                    sx={{
                      width: "100%",
                      maxWidth: "220px",
                      padding: "8px 16px",
                      borderRadius: "8px",
                      textAlign: "center",
                      transition: "background-color 0.3s ease",
                      "&:hover": {
                        backgroundColor: "primary.dark",
                      },
                    }}
                  >
                    {t("GO_TO")} {option.title}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>

  );
};
