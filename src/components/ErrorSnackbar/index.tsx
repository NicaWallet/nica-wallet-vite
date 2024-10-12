import React from "react";
import { Snackbar, Alert } from "@mui/material";

interface ErrorSnackbarProps {
  /**
   * The error message to display in the snackbar.
   */
  errorMessage: string;

  /**
   * Callback function to handle the closing of the snackbar.
   */
  onClose: () => void;
}

/**
 * ErrorSnackbar component displays an error message in a snackbar.
 *
 * @param {ErrorSnackbarProps} props - The properties for the component.
 * @returns {JSX.Element} The rendered ErrorSnackbar component.
 */
const ErrorSnackbar: React.FC<ErrorSnackbarProps> = ({
  errorMessage,
  onClose,
}) => {
  return (
    <Snackbar open autoHideDuration={6000} onClose={onClose}>
      <Alert severity="error" sx={{ width: "100%" }}>
        {errorMessage}
      </Alert>
    </Snackbar>
  );
};

export default ErrorSnackbar;
