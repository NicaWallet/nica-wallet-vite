import React from "react";
import { Box, Grid, Typography, Card, CardContent } from "@mui/material";
import { useTranslation } from "react-i18next";
import SecurityIcon from "@mui/icons-material/Security";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import SavingsIcon from "@mui/icons-material/Savings";
import GroupIcon from "@mui/icons-material/Group";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PrivacyTipIcon from "@mui/icons-material/PrivacyTip";

/**
 * ServicesSection component displays a section with various services offered.
 * Each service includes an icon, title, and description.
 */
const ServicesSection: React.FC = () => {
  const { t } = useTranslation();

  const services = [
    {
      title: t("FINANCIAL_CONSULTATIONS_TITLE"),
      icon: <SecurityIcon color="primary" />,
      description: [
        t("FINANCIAL_CONSULTATIONS_DESC_1"),
        t("FINANCIAL_CONSULTATIONS_DESC_2"),
      ],
    },
    {
      title: t("FINANCIAL_EDUCATION_TITLE"),
      icon: <TrendingDownIcon color="primary" />,
      description: [
        t("FINANCIAL_EDUCATION_DESC_1"),
        t("FINANCIAL_EDUCATION_DESC_2"),
      ],
    },
    {
      title: t("BUDGETING_TOOLS_TITLE"),
      icon: <SavingsIcon color="primary" />,
      description: [t("BUDGETING_TOOLS_DESC_1"), t("BUDGETING_TOOLS_DESC_2")],
    },
    {
      title: t("COMMUNITY_SUPPORT_TITLE"),
      icon: <GroupIcon color="primary" />,
      description: [
        t("COMMUNITY_SUPPORT_DESC_1"),
        t("COMMUNITY_SUPPORT_DESC_2"),
      ],
    },
    {
      title: t("SAVINGS_OPTIMIZATION_TITLE"),
      icon: <CheckCircleIcon color="primary" />,
      description: [
        t("SAVINGS_OPTIMIZATION_DESC_1"),
        t("SAVINGS_OPTIMIZATION_DESC_2"),
      ],
    },
    {
      title: t("SECURITY_PRIVACY_TITLE"),
      icon: <PrivacyTipIcon color="primary" />,
      description: [t("SECURITY_PRIVACY_DESC_1"), t("SECURITY_PRIVACY_DESC_2")],
    },
  ];

  return (
    <Box
      sx={{
        padding: { xs: "20px", md: "40px" },
        backgroundColor: "#f9f9f9",
        margin: { xs: "20px auto", md: "40px auto" },
        maxWidth: "1200px",
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          marginBottom: "20px",
          fontSize: { xs: "1.5rem", md: "2rem" },
        }}
      >
        {t("SERVICES_TITLE")}
      </Typography>
      <Typography
        variant="body1"
        sx={{
          textAlign: "center",
          marginBottom: "40px",
          color: "#666",
          fontSize: { xs: "1rem", md: "1.25rem" },
        }}
      >
        {t("SERVICES_DESCRIPTION")}
      </Typography>

      <Grid container spacing={3}>
        {services.map((service, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Card
              sx={{
                boxShadow: 3,
                borderRadius: "12px",
                padding: { xs: "15px", md: "20px" },
                height: "80%",
                display: "flex",
                flexDirection: "column",
                margin: "0 auto",
                maxWidth: "550px",
              }}
            >
              <CardContent
                sx={{
                  flexGrow: 1,
                  borderLeft: "4px solid #4eaace",
                  padding: "15px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    paddingLeft: "10px",
                    marginBottom: "10px",
                  }}
                >
                  {service.icon}
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{
                      fontWeight: "bold",
                      color: "#333",
                      fontSize: { xs: "1rem", md: "1.25rem" },
                      marginLeft: "10px",
                    }}
                  >
                    {service.title}
                  </Typography>
                </Box>
                <ul>
                  {service.description.map((desc, i) => (
                    <Typography
                      variant="body2"
                      key={i}
                      sx={{ color: "#666", marginBottom: "8px" }}
                    >
                      <li>{desc}</li>
                    </Typography>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ServicesSection;
