import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import TableComponent from "../../components/TableComponent";
import Loader from "../../components/Loader";
import ErrorSnackbar from "../../components/ErrorSnackbar";
import PageHeader from "../../components/PageHeader";
import CardComponent from "../../components/CardComponent";
import { useTranslation } from "react-i18next";
import { CreateOrUpdateTransactionModal } from "./local-components/CreateOrUpdateTransactionModal";
import { TransactionDetailModal } from "./local-components/TransactionDetailModal";
import DeleteConfirmationModal from "../../components/DeleteConfirmationModal";
import ButtonComponent from "../../components/ButtonComponent";
import { Add } from "@mui/icons-material";
import { useGetAllTransactions } from "../../services/transactions/getAllTransactions.service";
import { getAllCategories } from "../../services/categories/getAllCategories.service";
import { getAllSubcategories } from "../../services/subcategories/getAllSubcategories.service";
import { getAllClassifications } from "../../services/classification/getAllClassifications.service";
import { ICategory } from "../../types/Transactions/Categories/categories.types";
import { ISubcategory } from "../../types/Transactions/Subcategories/subcategories.types";
import { IClassification } from "../../types/Transactions/Classification/classification.types";
import { deleteTransaction } from "../../services/transactions/deleteTransaction.service";
import { ITransactionWithDetails } from "../../types/Transactions/transactions.types";

export const TransactionsPage = () => {
  const { transactions, loading, fetchTransactions } = useGetAllTransactions();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [isCreateOrUpdateModalOpen, setIsCreateOrUpdateModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "update">("create");
  const [selectedTransactionId, setSelectedTransactionId] = useState<number | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { t } = useTranslation();
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [subcategories, setSubcategories] = useState<ISubcategory[]>([]);
  const [classifications, setClassifications] = useState<IClassification[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesData, subcategoriesData, classificationsData] = await Promise.all([
          getAllCategories(),
          getAllSubcategories(),
          getAllClassifications(),
        ]);
        setCategories(categoriesData);
        setSubcategories(subcategoriesData);
        setClassifications(classificationsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleView = (transaction: ITransactionWithDetails) => {
    setSelectedTransactionId(transaction.transaction_id);
    setIsDetailModalOpen(true);
  };

  const handleEdit = (transaction: ITransactionWithDetails) => {
    setModalMode("update");
    setSelectedTransactionId(transaction.transaction_id);
    setIsCreateOrUpdateModalOpen(true);
  };

  const handleDelete = (transaction: ITransactionWithDetails) => {
    setSelectedTransactionId(transaction.transaction_id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedTransactionId !== null) {
      const success = await deleteTransaction(selectedTransactionId);
      if (success) {
        setSnackbarOpen(true);
        fetchTransactions();
      } else {
        console.error("Error deleting transaction");
      }
      setIsDeleteModalOpen(false);
      setSelectedTransactionId(null);
    }
  };

  if (loading) return <Loader overlayVariant="transparent" />;

  return (
    <>
      <PageHeader titleKey="TRANSACTIONS_PAGE" />
      <Box display="flex" sx={{ p: 2 }} gap={6} mb={4}>
        <CardComponent
          title={t("TOTAL_TRANSACTIONS")}
          description={t("SUMMARY_OF_TRANSACTIONS")}
          customBody={
            <>
              <Box sx={{ mt: 1, mr: 1 }}>
                <Typography variant="body2">
                  {t("TOTAL_TRANSACTIONS")}: {transactions?.length || 0}
                </Typography>
              </Box>
            </>
          }
        />
        <CardComponent
          title={t("TOTAL_TRANSACTIONS")}
          description={t("SUMMARY_OF_TRANSACTIONS")}
          customBody={
            <>
              <Box sx={{ mt: 1, mr: 1 }}>
                <Typography variant="body2">
                  {t("TOTAL_TRANSACTIONS_INCOMES")}: {transactions?.filter((t) => t.type === "INCOME").length || 0}
                </Typography>
                <Typography variant="body2">
                  {t("TOTAL_TRANSACTIONS_EXPENSES")}: {transactions?.filter((t) => t.type === "EXPENSE").length || 0}
                </Typography>
              </Box>
            </>
          }
        />
        <CardComponent
          title={t("TOTAL_TRANSACTIONS")}
          description={t("SUMMARY_OF_TRANSACTIONS")}
          customBody={
            <>
              <Box sx={{ mt: 1, mr: 1 }}>
                <Typography variant="body2">
                  {t("TOTAL_SUM_TRANSACTIONS_INCOMES")}:{" USD: $"} {transactions?.filter((t) => t.type === "INCOME").reduce((sum, t) => sum + t.amount, 0) || 0}
                </Typography>
                <Typography variant="body2">
                  {t("TOTAL_SUM_TRANSACTIONS_EXPENSES")}:{" USD: $"} {transactions?.filter((t) => t.type === "EXPENSE").reduce((sum, t) => sum + t.amount, 0) || 0}
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
          startIcon={<Add />}
          SxProps={{ marginBottom: 2, alignContent: "flex-end", display: "flex" }}
          onClick={() => {
            setModalMode("create");
            setIsCreateOrUpdateModalOpen(true);
          }}
        />
      </Box>

      <TableComponent<ITransactionWithDetails>
        rows={transactions || []}
        columnOrder={[
          "amount",
          "type",
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
          transactionId={selectedTransactionId}
          categories={categories}
          subcategories={subcategories}
          classifications={classifications}
        />
      )}

      {isDetailModalOpen && selectedTransactionId !== null && (
        <TransactionDetailModal
          isOpen={isDetailModalOpen}
          transactionId={selectedTransactionId}
          onClose={() => setIsDetailModalOpen(false)}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </>
  );
};
