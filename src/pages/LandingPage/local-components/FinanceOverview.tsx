import React from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import FinanceOverviewImage from '/src/assets/images/finance-overview-image.png';


const FinanceOverview: React.FC = () => {
  // #region hooks
  const { t } = useTranslation();

  // #endregion

  // #region handlers
  const handleStartButtonClick = () => {
    console.info("Start button clicked");
  };

  const handleLearnMoreButtonClick = () => {
    console.info("Learn more button clicked");
  };

  // #endregion

  return (
    <Box
      sx={{
        padding: { xs: "20px", md: "40px" },
        margin: { xs: "20px", md: "40px auto" },
        maxWidth: "1200px",
        backgroundColor: "#f9f9f9",
        borderLeft: "4px solid #82ca9d",
      }}
    >
      {/* TODO: Investigar como utilizar grid2 ya que grid esta en desuso */}
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={6}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              fontWeight: "bold",
              fontSize: { xs: "1.8rem", md: "2.5rem" },
            }}
          >
            {t("FINANCE_OVERVIEW_TITLE")}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              marginBottom: "20px",
              lineHeight: 1.6,
              fontSize: { xs: "0.9rem", md: "1rem" },
            }}
          >
            {t("FINANCE_OVERVIEW_DESCRIPTION")}
          </Typography>
          <Box
            sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}
          >
            <Button
              variant="contained"
              color="primary"
              sx={{
                marginBottom: { xs: "10px", md: 0 },
                marginRight: { md: "10px" },
                backgroundColor: "#81c784",
                width: { xs: "100%", md: "auto" },
              }}
              startIcon={<PlayArrowIcon />}
              onClick={handleStartButtonClick}
            >
              {t("START_BUTTON")}
            </Button>
            <Button
              variant="text"
              color="primary"
              sx={{ width: { xs: "100%", md: "auto" } }}
              endIcon={<InfoOutlinedIcon />}
              onClick={handleLearnMoreButtonClick}
            >
              {t("LEARN_MORE_BUTTON")}
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src={FinanceOverviewImage}
            alt={t("FINANCE_OVERVIEW_IMAGE_ALT")}
            sx={{
              display: { xs: "none", md: "block" },
              width: "100%",
              height: "auto",
              maxHeight: { xs: "200px", md: "300px" },
              objectFit: "contain",
              margin: "0 auto",
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default FinanceOverview;
