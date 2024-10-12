import React from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
import SecurityIcon from "@mui/icons-material/Security";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import SavingsIcon from "@mui/icons-material/Savings";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useTranslation } from "react-i18next";

/**
 * BenefitsSection component displays a section with various benefits.
 * Each benefit is represented by a card with an icon, title, description, and a button.
 */
const BenefitsSection: React.FC = () => {
  const { t } = useTranslation();

  const benefits = [
    {
      title: t("FINANCIAL_SECURITY"),
      description: t("FINANCIAL_SECURITY_DESCRIPTION"),
      icon: <SecurityIcon fontSize="large" color="primary" />,
    },
    {
      title: t("STRESS_REDUCTION"),
      description: t("STRESS_REDUCTION_DESCRIPTION"),
      icon: <TrendingDownIcon fontSize="large" color="primary" />,
    },
    {
      title: t("GREATER_SAVINGS"),
      description: t("GREATER_SAVINGS_DESCRIPTION"),
      icon: <SavingsIcon fontSize="large" color="primary" />,
    },
    {
      title: t("GOAL_ACHIEVEMENT"),
      description: t("GOAL_ACHIEVEMENT_DESCRIPTION"),
      icon: <CheckCircleIcon fontSize="large" color="primary" />,
    },
  ];

  return (
    <Box
      sx={{ padding: { xs: "20px", md: "40px" }, backgroundColor: "#f9f9f9" }}
    >
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          marginBottom: { xs: "20px", md: "40px" },
          fontSize: { xs: "1.5rem", md: "2rem" },
        }}
      >
        {t("BENEFITS_SECTION_TITLE")}
      </Typography>

      <Grid container spacing={4}>
        {benefits.map((benefit, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              sx={{
                padding: { xs: "10px", md: "20px" },
                textAlign: "center",
                boxShadow: 3,
                borderRadius: "12px",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <CardContent>
                <Box sx={{ marginBottom: "20px" }}>{benefit.icon}</Box>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontSize: { xs: "1rem", md: "1.25rem" } }}
                >
                  {benefit.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#666",
                    fontSize: { xs: "0.875rem", md: "1rem" },
                  }}
                >
                  {benefit.description}
                </Typography>
              </CardContent>
              <CardActions
                sx={{
                  justifyContent: "center",
                  marginTop: { xs: "10px", md: "0" },
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ fontSize: { xs: "0.75rem", md: "1rem" } }}
                >
                  {t("READ_MORE")}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default BenefitsSection;
