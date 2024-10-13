import React from "react";
import { Alert, Snackbar } from "@mui/material";

interface NotificationBannerProps {
  open: boolean;
  message: string;
  onClose: () => void;
  severity?: "error" | "warning" | "info" | "success";
}

const NotificationBanner: React.FC<NotificationBannerProps> = ({
  open,
  message,
  onClose,
  severity = "info",
}) => {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
      <Alert onClose={onClose} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default NotificationBanner;
