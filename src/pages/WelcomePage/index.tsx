import React, { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { DateTimeUtils, formatTime } from "../../utils/dateTimeUtils";
import { useTranslation } from "react-i18next";

interface User {
  first_name: string;
  first_surname: string;
  email: string;
  created_at: string;
}

/**
 * WelcomePage component displays a welcome message to the user.
 * It fetches user data from localStorage and displays a personalized greeting.
 * It also provides navigation to the dashboard and displays some feature highlights.
 */
const WelcomePage: React.FC = () => {
  const { t } = useTranslation();
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleExploreDashboard = () => {
    navigate("/dashboard");
  };

  const formattedDate = user
    ? DateTimeUtils.formatDate(new Date(user.created_at), "dd-mm-yyyy")
    : "";
  const formattedTime = user ? formatTime(new Date(user.created_at)) : "";

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "80vh",
        padding: { xs: "1rem", sm: "2rem" },
        textAlign: "center",
      }}
    >
      <Typography
        component={motion.h1}
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        variant="h3"
        sx={{ mb: 1, fontWeight: "bold" }}
      >
        {t("WELCOME_TITLE", { name: user?.first_name })}
      </Typography>

      <Typography
        component={motion.p}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        variant="body1"
        sx={{ mb: 3 }}
      >
        {t("INTRODUCTION_MESSAGE", {
          date: formattedDate,
          time: formattedTime,
        })}
      </Typography>

      <Button
        component={motion.button}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        variant="contained"
        size="large"
        onClick={handleExploreDashboard}
        sx={{ mt: 2 }}
      >
        {t("EXPLORE_DASHBOARD")}
      </Button>

      <Box
        component={motion.div}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        sx={{
          mt: 4,
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          },
          gap: 3,
          width: "100%",
          maxWidth: "1200px",
        }}
      >
        <Box
          component={motion.div}
          whileHover={{ scale: 1.1 }}
          sx={{
            bgcolor: "primary.light",
            p: 2,
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            {t("CONTROL_EXPENSES_TITLE")}
          </Typography>
          <Typography variant="body2">
            {t("CONTROL_EXPENSES_DESCRIPTION")}
          </Typography>
        </Box>
        <Box
          component={motion.div}
          whileHover={{ scale: 1.1 }}
          sx={{
            bgcolor: "secondary.light",
            p: 2,
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            {t("CREATE_BUDGET")}
          </Typography>
          <Typography variant="body2">
            {t("CREATE_BUDGET_DESCRIPTION")}
          </Typography>
        </Box>
        <Box
          component={motion.div}
          whileHover={{ scale: 1.1 }}
          sx={{
            bgcolor: "info.light",
            p: 2,
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            {t("DETAILED_REPORTS_TITLE")}
          </Typography>
          <Typography variant="body2">
            {t("DETAILED_REPORTS_DESCRIPTION")}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default WelcomePage;
