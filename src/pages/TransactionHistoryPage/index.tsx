import { useState, useEffect } from "react";
import { Box, Container, Typography } from "@mui/material";
import TableComponent from "../../components/TableComponent";
import Loader from "../../components/Loader";
import ErrorSnackbar from "../../components/ErrorSnackbar";
import PageHeader from "../../components/PageHeader";
import { useTranslation } from "react-i18next";

// Simulación de obtención del historial de transacciones (reemplazar con tu servicio real)
const useMockTransactionHistory = () => {
  const [transactionHistory] = useState<any[]>([
    {
      transaction_id: 67,
      amount: 100,
      date: "2024-11-17T05:24:31.252Z",
      description: "Grocery shopping",
      category: { name: "Groceries" },
      subcategory: { name: "Food" },
      classification: { name: "Essential" },
      created_at: "2024-11-17T05:24:31.254Z",
      updated_at: "2024-11-17T05:24:31.254Z",
    },
    {
      transaction_id: 37,
      amount: 200,
      date: "2024-09-20T00:00:00.000Z",
      description: "Transport fee",
      category: { name: "Transport" },
      subcategory: { name: "Bus fare" },
      classification: { name: "Essential" },
      created_at: "2024-10-02T16:31:13.027Z",
      updated_at: "2024-11-17T05:39:15.373Z",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [error] = useState<string | null>(null);

  useEffect(() => {
    setLoading(false);
  }, []);

  return { transactionHistory, loading, error };
};

export const TransactionHistoryPage = () => {
  const { transactionHistory, loading, error } = useMockTransactionHistory();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<any | null>(
    null
  );
  const { t } = useTranslation();

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleView = (transaction: any) => {
    setSelectedTransaction(transaction);
    setSnackbarOpen(true);
  };

  if (loading) return <Loader overlayVariant="transparent" />;
  if (error)
    return (
      <ErrorSnackbar
        message={t("ERROR_LOADING_TRANSACTIONS")}
        open={true}
        autoHideDuration={5000}
      />
    );

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <PageHeader titleKey="TRANSACTION_HISTORY_PAGE" />
    
      <TableComponent<any>
        rows={transactionHistory}
        columnOrder={[
          "transaction_id",
          "amount",
          "date",
          "description",
          "category.name",
          "subcategory.name",
          "classification.name",
        ]}
        handleView={handleView}
        sx={{ p: 2 }}
      />

      <ErrorSnackbar
        message={
          selectedTransaction
            ? `${t("VIEW_TRANSACTION_DETAILS")}: ${selectedTransaction.description}`
            : t("FEATURE_NOT_AVAILABLE")
        }
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        autoHideDuration={5000}
        severity="info"
      />
    </Container>
  );
};
