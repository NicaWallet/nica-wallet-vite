import React, { useEffect, useState } from "react";
import Modal from "../../../components/Modal";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import TransactionForm from "../../../forms/TransactionsForms";
import { getTransactionById } from "../../../services/transactions/getTransactionById.service";
import { createTransaction } from "../../../services/transactions/createTransaction.service";
import { updateTransaction } from "../../../services/transactions/updateTransaction.service";
import Loader from "../../../components/Loader";
import { Box } from "@mui/material";
import {
  ITransactionWithDetails,
  ITransactionForm,
} from "../../../types/Transactions/transactions.types";
import { ICategory } from "../../../types/Transactions/Categories/categories.types";
import { ISubcategory } from "../../../types/Transactions/Subcategories/subcategories.types";
import { IClassification } from "../../../types/Transactions/Classification/classification.types";

interface CreateOrUpdateTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "create" | "update";
  transactionId?: number | null;
  categories: ICategory[];
  subcategories: ISubcategory[];
  classifications: IClassification[];
}

export const CreateOrUpdateTransactionModal: React.FC<CreateOrUpdateTransactionModalProps> = ({
  isOpen,
  onClose,
  mode,
  transactionId,
  categories,
  subcategories,
  classifications,
}) => {
  const { t } = useTranslation();
  const [fetchedTransaction, setFetchedTransaction] = useState<ITransactionWithDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<ITransactionForm>({
    defaultValues: {
      amount: 0,
      category_id: 0,
      subcategory_id: 0,
      classification_id: 0,
      type: "EXPENSE",
    },
  });

  useEffect(() => {
    if (mode === "update" && transactionId) {
      setLoading(true);
      getTransactionById(transactionId)
        .then((data) => {
          if (data) {
            setFetchedTransaction(data);
            form.reset({
              amount: data.amount,
              category_id: data.category_id,
              subcategory_id: data.subcategory_id,
              classification_id: data.classification_id,
              type: data.type,
            });
          }
        })
        .catch((err) => {
          setError(err.message);
        })
        .finally(() => {
          setLoading(false);
        });
    } else if (mode === "create") {
      form.reset({
        amount: 0,
        category_id: 0,
        subcategory_id: 0,
        classification_id: 0,
        type: "EXPENSE",
      });
    }
  }, [mode, transactionId, form]);

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      setLoading(true);

      const requestData = { ...data };
      delete requestData.date;

      if (mode === "create") {
        await createTransaction(requestData);
      } else if (mode === "update" && transactionId) {
        await updateTransaction(transactionId, requestData);
      }

      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : t("ERROR_SAVING_TRANSACTION"));
    } finally {
      setLoading(false);
    }
  });



  const handleClose = () => {
    form.reset({
      amount: 0,
      category_id: 0,
      subcategory_id: 0,
      classification_id: 0,
      type: "EXPENSE",
    });
    setFetchedTransaction(null);
    setError(null);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      title={mode === "create" ? t("CREATE_TRANSACTION_TITLE") : t("UPDATE_TRANSACTION_TITLE")}
      onClose={handleClose}
      onConfirm={handleSubmit}
      confirmText={t("SUBMIT")}
      cancelText={t("CANCEL")}
      variant={mode === "create" ? "info" : "warning"}
      importantAction={true}
      fullWidth={true}
      maxWidth="md"
      showCloseIcon={true}
      modalContent={
        loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", height: 200 }}>
            <Loader overlayVariant="transparent" />
          </Box>
        ) : error ? (
          <p>{t("ERROR_FETCHING_DATA")}</p>
        ) : (
          <TransactionForm
            form={form}
            categories={categories}
            subcategories={subcategories}
            classifications={classifications}
            mode={mode}
            initialData={
              fetchedTransaction
                ? {
                  amount: fetchedTransaction.amount,
                  category_id: fetchedTransaction.category_id,
                  subcategory_id: fetchedTransaction.subcategory_id,
                  classification_id: fetchedTransaction.classification_id,
                  type: fetchedTransaction.type,
                }
                : undefined
            }
          />
        )
      }
      open={false}
    />
  );
};
