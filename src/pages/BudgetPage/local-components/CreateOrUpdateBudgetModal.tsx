import React, { useEffect, useState } from "react";
import Modal from "../../../components/Modal";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { BudgetForm } from "../../../forms/BudgetsForm";
import getBudgetById from "../../../services/budget/getBudgetById.service";
import { createBudget } from "../../../services/budget/createBudget.service";
import { updateBudget } from "../../../services/budget/updateBudget.service";
import { useBudgetStore } from "../../../stores/budgets/budgetsStore";
import Loader from "../../../components/Loader";
import { Box } from "@mui/material";
import { IBudgetById } from "../../../types/Transactions/Budgets/budgets.types";

interface CreateOrUpdateBudgetModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "create" | "update";
  budgetId?: number;
  categories: { category_id: number; name: string }[];
}

export const CreateOrUpdateBudgetModal: React.FC<CreateOrUpdateBudgetModalProps> = ({
  isOpen,
  onClose,
  mode,
  budgetId,
  categories,
}) => {
  const { t } = useTranslation();
  const { setBudgetData, clearBudgetData } = useBudgetStore();
  const [fetchedBudget, setFetchedBudget] = useState<IBudgetById | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm({
    defaultValues: {
      amount: 0,
      category_id: 0,
      start_date: "",
      end_date: "",
    },
  });

  useEffect(() => {
    if (mode === "update" && budgetId) {
      setLoading(true);
      getBudgetById(budgetId)
        .then((data) => {
          setFetchedBudget(data);
          setBudgetData(data);
          form.reset({
            amount: data.amount,
            category_id: data.category_id,
            start_date: new Date(data.start_date).toISOString().split("T")[0],
            end_date: new Date(data.end_date).toISOString().split("T")[0],
          });
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
        start_date: "",
        end_date: "",
      });
    }
  }, [mode, budgetId, form, setBudgetData]);

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      setLoading(true);

      const requestData = {
        amount: data.amount,
        category_id: data.category_id,
        start_date: new Date(data.start_date),
        end_date: new Date(data.end_date),
      };

      if (mode === "create") {
        await createBudget(requestData);
      } else if (mode === "update" && budgetId) {
        await updateBudget(budgetId, requestData);
      }

      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : t("ERROR_SAVING_BUDGET"));
    } finally {
      setLoading(false);
    }
  });


  const handleClose = () => {
    form.reset({
      amount: 0,
      category_id: 0,
      start_date: "",
      end_date: "",
    }); // Resetea el formulario

    clearBudgetData(); // Limpia los datos almacenados en Zustand si aplica
    setFetchedBudget(null); // Limpia los datos cargados
    setError(null); // Limpia errores
    onClose(); // Cierra el modal
  };


  return (
    <Modal
      isOpen={isOpen}
      title={mode === "create" ? t("CREATE_BUDGET") : t("UPDATE_BUDGET_TITLE")}
      onClose={handleClose}
      onConfirm={handleSubmit}
      confirmText={t("SUBMIT")}
      cancelText={t("CANCEL")}
      variant={mode === "create" ? "info" : "warning"}
      importantAction={true}
      fullWidth={true}
      maxWidth="md"
      showCloseIcon={true}
      modalContent={loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", height: 200 }}>
          <Loader overlayVariant="transparent" />
        </Box>
      ) : error ? (
        <p>{t("ERROR_FETCHING_DATA")}</p>
      ) : (
        <BudgetForm
          form={form}
          categories={categories}
          mode={mode}
          initialData={fetchedBudget
            ? {
              category_id: fetchedBudget.category_id,
              amount: fetchedBudget.amount,
              start_date: new Date(fetchedBudget.start_date),
              end_date: new Date(fetchedBudget.end_date),
            }
            : undefined} />
      )} open={false} />
  );
};
