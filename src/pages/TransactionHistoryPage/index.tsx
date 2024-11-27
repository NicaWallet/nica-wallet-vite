import { useState, useEffect } from "react";
import TableComponent from "../../components/TableComponent";
import Loader from "../../components/Loader";
import ErrorSnackbar from "../../components/ErrorSnackbar";
import PageHeader from "../../components/PageHeader";
import { useTranslation } from "react-i18next";
import { Transaction } from "../../types/user/user.types";

// Simulación de obtención del historial de transacciones (reemplazar con tu servicio real)
const useMockTransactionHistory = () => {

  const [transactionHistory] = useState<Transaction[]>([
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
      user_id: 0,
      category_id: 0,
      subcategory_id: 0,
      classification_id: 0,
      type: "EXPENSE"
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
      user_id: 0,
      category_id: 0,
      subcategory_id: 0,
      classification_id: 0,
      type: "EXPENSE"
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
  const [, setSelectedTransaction] = useState<Transaction | null>(
    null
  );
  const { t } = useTranslation();

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleView = (transaction: Transaction) => {
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
    <>
      <PageHeader titleKey="TRANSACTION_HISTORY_PAGE" />

      <TableComponent<Transaction>
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
        sx={{ p: 4 }}
      />

      <ErrorSnackbar
        message="Feature not currently available, please try again in future updates"
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        autoHideDuration={5000}
        severity="info"
      />
    </>
  );
};
