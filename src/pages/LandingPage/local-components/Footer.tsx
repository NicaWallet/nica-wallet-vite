import React from "react";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import { Facebook, Twitter, LinkedIn, Instagram } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

/**
 * Footer component for the landing page.
 * Displays social media icons, site links, support links, and a newsletter subscription form.
 */
const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        backgroundColor: "#82ca9d",
        padding: { xs: "5% 5%", md: "50px 40px" },
        color: "white",
      }}
    >
      <Grid container spacing={2} maxWidth="lg" sx={{ margin: "0 auto" }}>
        <Grid
          item
          xs={12}
          md={4}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: { xs: "center", md: "flex-start" },
            textAlign: { xs: "center", md: "left" },
            padding: { xs: "0 0 1rem 0", md: "0" },
          }}
        >
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", marginBottom: "0.8rem" }}
          >
            {t("FOOTER_TITLE")}
          </Typography>
          <Typography variant="body2" sx={{ marginBottom: "1.2rem" }}>
            {t("FOOTER_DESCRIPTION")}
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: "0.6rem",
              justifyContent: { xs: "center", md: "flex-start" },
            }}
          >
            <IconButton
              sx={{
                backgroundColor: "white",
                color: "#82ca9d",
                borderRadius: "50%",
                width: "2rem",
                height: "2rem",
                "&:hover": { backgroundColor: "rgba(255,255,255,0.8)" },
              }}
              aria-label="Facebook"
            >
              <Facebook />
            </IconButton>
            <IconButton
              sx={{
                backgroundColor: "white",
                color: "#82ca9d",
                borderRadius: "50%",
                width: "2rem",
                height: "2rem",
                "&:hover": { backgroundColor: "rgba(255,255,255,0.8)" },
              }}
              aria-label="Twitter"
            >
              <Twitter />
            </IconButton>
            <IconButton
              sx={{
                backgroundColor: "white",
                color: "#82ca9d",
                borderRadius: "50%",
                width: "2rem",
                height: "2rem",
                "&:hover": { backgroundColor: "rgba(255,255,255,0.8)" },
              }}
              aria-label="LinkedIn"
            >
              <LinkedIn />
            </IconButton>
            <IconButton
              sx={{
                backgroundColor: "white",
                color: "#82ca9d",
                borderRadius: "50%",
                width: "2rem",
                height: "2rem",
                "&:hover": { backgroundColor: "rgba(255,255,255,0.8)" },
              }}
              aria-label="Instagram"
            >
              <Instagram />
            </IconButton>
          </Box>
        </Grid>

        <Grid
          item
          xs={12}
          md={2}
          sx={{
            textAlign: { xs: "center", md: "left" },
            marginBottom: { xs: "1rem", md: "0" },
            padding: "0",
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", marginBottom: "0.6rem" }}
          >
            {t("SITE_LINKS")}
          </Typography>
          {["HOME", "BENEFITS", "OUR_MISSION", "SERVICES", "OUR_PLANS"].map(
            (text, index) => (
              <Typography
                key={index}
                variant="body2"
                sx={{
                  marginBottom: "0.4rem",
                  "&:hover": { textDecoration: "underline", cursor: "pointer" },
                }}
              >
                {t(text)}
              </Typography>
            )
          )}
        </Grid>

        <Grid
          item
          xs={12}
          md={2}
          sx={{
            textAlign: { xs: "center", md: "left" },
            marginBottom: { xs: "1rem", md: "0" },
            padding: "0",
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", marginBottom: "0.6rem" }}
          >
            {t("SUPPORT")}
          </Typography>
          {["SUPPORT_CONTACT", "CONTACT"].map((text, index) => (
            <Typography
              key={index}
              variant="body2"
              sx={{
                marginBottom: "0.4rem",
                "&:hover": { textDecoration: "underline", cursor: "pointer" },
              }}
            >
              {t(text)}
            </Typography>
          ))}
        </Grid>

        <Grid
          item
          xs={12}
          md={4}
          sx={{
            textAlign: { xs: "center", md: "left" },
            marginBottom: { xs: "1rem", md: "0" },
            padding: "0",
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", marginBottom: "0.6rem" }}
          >
            {t("NEWSLETTER_SUBSCRIPTION")}
          </Typography>
          <Typography variant="body2" sx={{ marginBottom: "0.6rem" }}>
            {t("ENTER_YOUR_EMAIL")}
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: "0.5rem",
              justifyContent: { xs: "center", md: "flex-start" },
              alignItems: "center",
              flexDirection: { xs: "column", md: "row" },
              width: "100%",
              maxWidth: "100%",
              margin: "0 auto",
            }}
          >
            <TextField
              variant="outlined"
              placeholder={t("EMAIL_PLACEHOLDER")}
              sx={{
                backgroundColor: "white",
                borderRadius: { xs: "20px", md: "20px 0 0 20px" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { border: "none" },
                  "& input": { padding: "10px 16px" },
                },
                width: "100%",
                maxWidth: { xs: "80%", md: "350px" },
              }}
            />
            <Button
              variant="contained"
              sx={{
                borderRadius: { xs: "20px", md: "0 20px 20px 0" },
                backgroundColor: "#4eaace",
                color: "white",
                fontWeight: "bold",
                padding: "10px 20px",
                width: { xs: "80%", md: "auto" },
                boxShadow: "none",
                "&:hover": {
                  backgroundColor: "#3b94a3",
                  boxShadow: "none",
                },
              }}
            >
              {t("SUBSCRIBE")}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
