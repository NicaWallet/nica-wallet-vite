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
        Confirm Deletion
      </DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          {recordName
            ? `Are you sure you want to delete "${recordName}"? This action cannot be undone.`
            : "Are you sure you want to delete this record? This action cannot be undone."}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" variant="outlined">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="error" variant="contained">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationModal;
