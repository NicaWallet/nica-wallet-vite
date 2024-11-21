import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import WarningIcon from "@mui/icons-material/Warning";
import { useTranslation } from "react-i18next";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  recordName?: string; // Nombre opcional del registro a eliminar para mostrarlo en el mensaje
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  recordName,
}) => {
  const { t } = useTranslation();

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          fontWeight: "bold",
        }}
      >
        <WarningIcon color="warning" />
        {t("CONFIRM_DELETION")}
      </DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          {recordName
            ? t("DELETE_CONFIRMATION_MESSAGE_WITH_NAME", { recordName })
            : t("DELETE_CONFIRMATION_MESSAGE")}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" variant="outlined">
          {t("CANCEL")}
        </Button>
        <Button onClick={onConfirm} color="error" variant="contained">
          {t("DELETE")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationModal;