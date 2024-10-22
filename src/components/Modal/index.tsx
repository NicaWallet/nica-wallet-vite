import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningIcon from "@mui/icons-material/Warning";
import ErrorIcon from "@mui/icons-material/Error";
import InfoIcon from "@mui/icons-material/Info";

export interface ModalProps {
  isOpen: boolean;
  title: string;
  content: React.ReactNode;
  onClose: () => void;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
  variant?: "success" | "warning" | "error" | "info" | "default";
  importantAction?: boolean;
}

const getIcon = (variant: string) => {
  switch (variant) {
    case "success":
      return <CheckCircleIcon sx={{ color: "green" }} />;
    case "warning":
      return <WarningIcon sx={{ color: "orange" }} />;
    case "error":
      return <ErrorIcon sx={{ color: "red" }} />;
    case "info":
      return <InfoIcon sx={{ color: "blue" }} />;
    default:
      return null;
  }
};

/**
 * Modal component that displays a dialog with customizable content and actions.
 *
 * @param {boolean} isOpen - Determines if the modal is open or closed.
 * @param {string} title - The title of the modal.
 * @param {React.ReactNode} content - The content to be displayed inside the modal.
 * @param {() => void} onClose - Callback function to handle the modal close action.
 * @param {() => void} [onConfirm] - Optional callback function to handle the confirm action.
 * @param {string} [confirmText] - Optional text for the confirm button. Defaults to "Confirm".
 * @param {string} [cancelText] - Optional text for the cancel button. Defaults to "Cancel".
 * @param {"default" | "warning" | "error"} [variant="default"] - The variant of the modal, which affects its styling.
 * @param {boolean} [importantAction=false] - If true, an additional confirmation dialog is shown before closing.
 *
 * @returns {JSX.Element} The rendered modal component.
 */
const Modal: React.FC<ModalProps> = ({
  isOpen,
  title,
  content,
  onClose,
  onConfirm,
  confirmText,
  cancelText,
  variant = "default",
  importantAction = false,
}) => {
  const [confirmClose, setConfirmClose] = useState(false);

  const handleClose = () => {
    if (importantAction) {
      setConfirmClose(true);
    } else {
      onClose();
    }
  };

  const handleConfirmClose = () => {
    setConfirmClose(false);
    onClose();
  };

  return (
    <>
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span style={{ display: "flex", alignItems: "center" }}>
            {getIcon(variant)}
            <Typography variant="h6" sx={{ ml: 1 }}>
              {title}
            </Typography>
          </span>
          <IconButton aria-label="close" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>{content}</DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            {cancelText || "Cancel"}
          </Button>
          {onConfirm && (
            <Button onClick={onConfirm} color="primary" variant="contained">
              {confirmText || "Confirm"}
            </Button>
          )}
        </DialogActions>
      </Dialog>

      {importantAction && (
        <Dialog open={confirmClose} onClose={() => setConfirmClose(false)}>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogContent>
            <Typography>
              Unsaved changes will be lost. Do you want to proceed?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setConfirmClose(false)}>No</Button>
            <Button onClick={handleConfirmClose} color="primary">
              Yes, continue
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default Modal;
