// src/pages/Transactions/local-components/TransactionDetailModal.tsx

import React, { useEffect, useState } from "react";
import Modal from "../../../components/Modal";
import { DetailTransaction } from "./DetailTransaction";
import { getTransactionById } from "../../../services/transactions/getTransactionById.service";
import Loader from "../../../components/Loader";
import { Box } from "@mui/material";
import { ITransactionWithDetails } from "../../../types/Transactions/transactions.types";
import { t } from "i18next";

interface ITransactionDetailModalProps {
  isOpen: boolean;
  transactionId: number;
  onClose: () => void;
}

export const TransactionDetailModal: React.FC<ITransactionDetailModalProps> = ({
  isOpen,
  transactionId,
  onClose,
}) => {
  const [transaction, setTransaction] = useState<ITransactionWithDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTransactionById(transactionId)
      .then((data) => {
        setTransaction(data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [transactionId]);

  return (
    <Modal
      title={t("DETAILS_OF_TRANSACTION")}
      variant="info"
      onClose={onClose}
      modalContent={
        loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", height: 200 }}>
            <Loader overlayVariant="transparent" />
          </Box>
        ) : transaction ? (
          <DetailTransaction transaction={transaction} />
        ) : (
          <p>{t("ERROR_FETCHING_TRANSACTION")}</p>
        )
      }
      isOpen={isOpen}
      open={false}
    />
  );
};
