import { t } from "i18next";
import Modal from "../../../components/Modal";
import { DetailBudget } from "./DetailBudget";
import Loader from "../../../components/Loader";
import { useState, useEffect } from "react";
import getBudgetById from "../../../services/budget/getBudgetById.service";
import { IBudgetById } from "../../../types/Transactions/Budgets/budgets.types";

interface IBudgetDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  budgetId: number;
}

export const BudgetDetailModal = ({ isOpen, onClose, budgetId }: IBudgetDetailModalProps) => {
  const [budget, setBudget] = useState<IBudgetById | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    const fetchBudget = async () => {
      try {
        const result = await getBudgetById(budgetId);
        setBudget(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBudget();
  }, [budgetId]);

  return (
    <Modal
      title={t("DETAILS_OF_BUDGET")}
      variant="default"
      onClose={onClose}
      modalContent={
        loading ? (
          <Loader overlayVariant="transparent" />
        ) : error ? (
          <p>{t("ERROR_FETCHING_BUDGET")}</p>
        ) : (
          <DetailBudget budgetData={budget} isLoading={loading} />
        )
      }
      isOpen={isOpen}
      open={isOpen}
    />
  );
};
