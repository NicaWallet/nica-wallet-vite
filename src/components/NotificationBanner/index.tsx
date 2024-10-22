import React from "react";
import { Alert, Snackbar, SxProps, Theme } from "@mui/material";

/**
 * Props for the NotificationBanner component.
 */
export interface NotificationBannerProps {
  open: boolean;
  message: string;
  onClose: (event: React.SyntheticEvent | Event, reason?: string) => void;
  severity?: "error" | "warning" | "info" | "success";
  variant?:
    | "default"
    | "topRight"
    | "topLeft"
    | "bottomRight"
    | "bottomLeft"
    | "longDuration";
  sx?: SxProps<Theme>;
}

/**
 * NotificationBanner component to display notifications using Material-UI Snackbar and Alert.
 *
 * @param {NotificationBannerProps} props - The props for the component.
 * @returns {JSX.Element} The rendered NotificationBanner component.
 */
const NotificationBanner: React.FC<NotificationBannerProps> = ({
  open,
  message,
  onClose,
  severity = "info",
  variant = "default",
  sx = {},
}) => {
  const variantSettings = {
    default: {
      anchorOrigin: { vertical: "bottom", horizontal: "center" } as const,
      autoHideDuration: 6000,
    },
    topRight: {
      anchorOrigin: { vertical: "top", horizontal: "right" } as const,
      autoHideDuration: 6000,
    },
    topLeft: {
      anchorOrigin: { vertical: "top", horizontal: "left" } as const,
      autoHideDuration: 6000,
    },
    bottomRight: {
      anchorOrigin: { vertical: "bottom", horizontal: "right" } as const,
      autoHideDuration: 6000,
    },
    bottomLeft: {
      anchorOrigin: { vertical: "bottom", horizontal: "left" } as const,
      autoHideDuration: 6000,
    },
    longDuration: {
      anchorOrigin: { vertical: "bottom", horizontal: "center" } as const,
      autoHideDuration: 10000,
    },
  };

  const { anchorOrigin, autoHideDuration } = variantSettings[variant];

  return (
    <Snackbar
      open={open}
      onClose={(event, reason) => onClose(event, reason)}
      anchorOrigin={anchorOrigin}
      autoHideDuration={autoHideDuration}
      sx={sx}
    >
      <Alert
        onClose={(event) => onClose(event)}
        severity={severity}
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default NotificationBanner;
