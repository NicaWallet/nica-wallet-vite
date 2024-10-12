import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import FinanceOverviewImage from "/src/assets/images/finance-overview-image.png";

/**
 * MissionSection component displays the mission statement of the application.
 * It includes an image and several text sections that describe the mission,
 * what drives the organization, and key focus areas such as financial empowerment,
 * inclusivity, and education.
 */
const MissionSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        padding: { xs: "20px", md: "40px" },
        backgroundColor: "#f9f9f9",
        margin: { xs: "20px", md: "40px auto" },
      }}
    >
      <Grid container spacing={4} alignItems="center">
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: { xs: "none", md: "block" },
          }}
        >
          <Box
            component="img"
            src={FinanceOverviewImage}
            alt={t("MISSION_SECTION_IMAGE_ALT")}
            sx={{
              width: "100%",
              height: "auto",
              maxHeight: "400px",
              objectFit: "contain",
              margin: "0 auto",
            }}
          />
        </Grid>

        <Grid
          item
          xs={12}
          md={6}
          sx={{
            borderLeft: { xs: "none", md: "4px solid #82ca9d" },
            padding: { xs: "20px", md: "40px" },
            margin: { xs: "20px", md: "0" },
          }}
        >
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", marginBottom: "16px" }}
          >
            {t("OUR_MISSION_TITLE")}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              marginBottom: "16px",
              lineHeight: 1.8,
              strong: { color: "#4eaace" },
            }}
          >
            {t("OUR_MISSION_PART_1")} <strong>NicaWallet</strong>{" "}
            {t("OUR_MISSION_PART_2")} <strong>{t("OUR_MISSION_STRONG")}</strong>
            .
          </Typography>
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", marginTop: "16px" }}
          >
            {t("WHAT_DRIVES_US")}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              marginBottom: "12px",
              lineHeight: 1.8,
              strong: { color: "#4eaace" },
            }}
          >
            <strong>{t("FINANCIAL_EMPOWERMENT_TITLE")}</strong>{" "}
            {t("FINANCIAL_EMPOWERMENT_DESCRIPTION")}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              marginBottom: "12px",
              lineHeight: 1.8,
              strong: { color: "#4eaace" },
            }}
          >
            <strong>{t("INCLUSIVITY_TITLE")}</strong>{" "}
            {t("INCLUSIVITY_DESCRIPTION")}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              lineHeight: 1.8,
              strong: { color: "#4eaace" },
            }}
          >
            <strong>{t("EDUCATION_TITLE")}</strong> {t("EDUCATION_DESCRIPTION")}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MissionSection;
