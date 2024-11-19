import { useState, useEffect } from "react";
import { Box, Container, Typography, Chip } from "@mui/material";
import TableComponent from "../../components/TableComponent";
import Loader from "../../components/Loader";
import ErrorSnackbar from "../../components/ErrorSnackbar";
import PageHeader from "../../components/PageHeader";
import CardComponent from "../../components/CardComponent";
import { useTranslation } from "react-i18next";
import { CreateOrUpdateTransactionModal } from "./local-components/CreateOrUpdateTransactionModal";
import transactionDataMock from "./transactionDataMock.json"; // Este es un mock de ejemplo
import { TransactionDetailModal } from "./local-components/TransactionDetailModal";
import DeleteConfirmationModal from "../../components/DeleteConfirmationModal";
import ButtonComponent from "../../components/ButtonComponent";
import { Add } from "@mui/icons-material";

// Simulación de obtención de transacciones (reemplazar con tu servicio real)
const useMockTransactions = () => {
  const [transactions, setTransactions] = useState<any[]>([
    {
      transaction_id: 67,
      amount: 100,
      date: "2024-11-17T05:24:31.252Z",
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
      category: { name: "Groceries" },
      subcategory: { name: "Food" },
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

  return { transactions, loading, error };
};

export const TransactionsPage = () => {
  const { transactions, loading, error } = useMockTransactions();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [isCreateOrUpdateModalOpen, setIsCreateOrUpdateModalOpen] =
    useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "update">("create");
  const [selectedTransaction, setSelectedTransaction] = useState<any | null>(
    null
  );
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { t } = useTranslation();

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleView = (transaction: any) => {
    setSelectedTransaction(transaction);
    setIsDetailModalOpen(true);
  };

  const handleEdit = (transaction: any) => {
    setModalMode("update");
    setSelectedTransaction(transaction);
    setIsCreateOrUpdateModalOpen(true);
  };

  const handleDelete = (transaction: any) => {
    setSelectedTransaction(transaction);
    setIsDeleteModalOpen(true);
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
      <PageHeader titleKey="TRANSACTIONS_PAGE" />
      <Box display="flex" sx={{ p: 2 }} gap={6} mb={4}>
        <CardComponent
          title={t("TOTAL_TRANSACTIONS")}
          description={t("SUMMARY_OF_TRANSACTIONS")}
          customBody={
            <>
              <Box sx={{ mt: 1, mr: 1 }}>
                <Typography variant="body2">
                  {t("TOTAL_TRANSACTIONS")}: {transactions.length}
                </Typography>
              </Box>
            </>
          }
        />
      </Box>

      <Box display="flex" justifyContent="flex-end" sx={{ p: 2 }}>
        <ButtonComponent
          label={t("CREATE_TRANSACTION")}
          color="primary"
          variant="outlined"
          size="medium"
          isLoading={false}
          startIcon={<Add />}
          SxProps={{ mb: 2, alignContent: "flex-end", display: "flex" }}
          onClick={() => {
            setModalMode("create");
            setIsCreateOrUpdateModalOpen(true);
          }}
        />
      </Box>

      <TableComponent<any>
        rows={transactions}
        columnOrder={[
          "transaction_id",
          "amount",
          "date",
          "category.name",
          "subcategory.name",
          "classification.name",
        ]}
        handleView={handleView}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        sx={{ p: 2 }}
      />

      <ErrorSnackbar
        message={t("FEATURE_NOT_AVAILABLE")}
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        autoHideDuration={5000}
        severity="info"
      />

      {isCreateOrUpdateModalOpen && (
        <CreateOrUpdateTransactionModal
          isOpen={isCreateOrUpdateModalOpen}
          onClose={() => setIsCreateOrUpdateModalOpen(false)}
          mode={modalMode}
          categories={[
            {
              category_id: 1,
              name: "Groceries",
            },
            {
              category_id: 2,
              name: "Transport",
            },
            {
              category_id: 3,
              name: "Health",
            },
          ]} // Reemplaza con datos reales
          subcategories={[
            {
              subcategory_id: 1,
              name: "Food",
            },
            {
              subcategory_id: 2,
              name: "Transport",
            },
            {
              subcategory_id: 3,
              name: "Medicine",
            },
          ]} // Reemplaza con datos reales
          classifications={[
            {
              classification_id: 1,
              name: "Essential",
            },
            {
              classification_id: 2,
              name: "Non-essential",
            },
          ]} // Reemplaza con datos reales
          transactionData={selectedTransaction}
        />
      )}

      {isDetailModalOpen && (
        <TransactionDetailModal
          isOpen={isDetailModalOpen}
          transactionData={selectedTransaction}
          onClose={() => setIsDetailModalOpen(false)}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={() => {
            setIsDeleteModalOpen(false);
            setSnackbarOpen(true);
          }}
        />
      )}
    </Container>
  );
};
