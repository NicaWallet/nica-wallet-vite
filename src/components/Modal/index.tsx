import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Typography,
  useTheme,
  useMediaQuery,
  Slide,
  DialogProps,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningIcon from "@mui/icons-material/Warning";
import ErrorIcon from "@mui/icons-material/Error";
import InfoIcon from "@mui/icons-material/Info";
import { TransitionProps } from "@mui/material/transitions";
import { t } from "i18next";

export interface ModalProps extends Omit<DialogProps, "content"> {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
  variant?: "success" | "warning" | "error" | "info" | "default";
  importantAction?: boolean;
  disableBackdropClick?: boolean;
  fullWidth?: boolean;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl";
  showCloseIcon?: boolean;
  modalContent: React.ReactNode;
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

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

/**
 * Modal component that displays a dialog with customizable content and actions.
 *
 * @param {ModalProps} props - The properties for the component.
 * @returns {JSX.Element} The rendered modal component.
 */
const Modal: React.FC<ModalProps> = ({
  isOpen,
  title,
  modalContent,
  onClose,
  onConfirm,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "default",
  importantAction = false,
  disableBackdropClick = false,
  fullWidth = true,
  maxWidth = "sm",
  showCloseIcon = true,
  ...props
}) => {
  const [confirmClose, setConfirmClose] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

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
      <Dialog
        onClose={disableBackdropClick ? undefined : handleClose}
        fullScreen={fullScreen}
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        TransitionComponent={Transition}
        {...props}
        open={isOpen}
      >
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            bgcolor:
              variant === "success"
                ? "green.100"
                : variant === "warning"
                ? "orange.100"
                : variant === "error"
                ? "red.100"
                : variant === "info"
                ? "blue.100"
                : undefined,
          }}
        >
          <span style={{ display: "flex", alignItems: "center" }}>
            {getIcon(variant)}
            <Typography variant="h6" sx={{ ml: 1 }}>
              {title}
            </Typography>
          </span>
          {showCloseIcon && (
            <IconButton aria-label="close" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          )}
        </DialogTitle>
        <DialogContent dividers>{modalContent}</DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            {cancelText}
          </Button>
          {onConfirm && (
            <Button onClick={onConfirm} color="primary" variant="contained">
              {confirmText}
            </Button>
          )}
        </DialogActions>
      </Dialog>

      {importantAction && (
        <Dialog open={confirmClose} onClose={() => setConfirmClose(false)}>
          <DialogTitle>{t("CONFIRMATION_TITLE")}</DialogTitle>
          <DialogContent>
            <Typography>{t("CONFIRMATION_MESSAGE")}</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setConfirmClose(false)}>{t("NO")}</Button>
            <Button onClick={handleConfirmClose} color="primary">
              {t("YES_CONTINUE")}
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default Modal;
