import React from "react";
import { Snackbar, Alert, AlertColor, SnackbarOrigin } from "@mui/material";

export interface ErrorSnackbarProps {
  message: string;
  onClose: () => void;
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
  severity = "error",
  autoHideDuration = 6000,
  anchorOrigin = { vertical: "bottom", horizontal: "center" },
  dismissOnClickAway = true,
}) => {
  return (
    <Snackbar
      open
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={anchorOrigin}
      ClickAwayListenerProps={{
        onClickAway: dismissOnClickAway ? onClose : undefined,
      }}
    >
      <Alert onClose={onClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default ErrorSnackbar;
