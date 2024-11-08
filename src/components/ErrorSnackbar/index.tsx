import React from "react";
import { Snackbar, Alert, AlertColor, SnackbarOrigin } from "@mui/material";

export interface ErrorSnackbarProps {
  message: string;
  onClose?: () => void;
  open: boolean;
  severity?: AlertColor;
  autoHideDuration?: number;
  anchorOrigin?: SnackbarOrigin;
  dismissOnClickAway?: boolean;
}

/**
 * ErrorSnackbar component displays a message in a snackbar with various severity levels.
 *
 * @param {ErrorSnackbarProps} props - The properties for the component.
 * @returns {JSX.Element} The rendered ErrorSnackbar component.
 */
const ErrorSnackbar: React.FC<ErrorSnackbarProps> = ({
  message,
  onClose,
  open,
  severity = "error",
  autoHideDuration = 6000,
  anchorOrigin = { vertical: "bottom", horizontal: "center" },
  dismissOnClickAway = true,
}) => {
  const handleClose = onClose || (() => {});

  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
      anchorOrigin={anchorOrigin}
      ClickAwayListenerProps={{
        onClickAway: dismissOnClickAway ? handleClose : undefined,
      }}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default ErrorSnackbar;
