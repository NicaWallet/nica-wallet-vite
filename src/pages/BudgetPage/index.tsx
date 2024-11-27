import { t } from "i18next";
import { useState, useEffect } from "react";
import ActionButton from "../../components/ActionButton";
import DeleteConfirmationModal from "../../components/DeleteConfirmationModal";
import ErrorSnackbar from "../../components/ErrorSnackbar";
import Loader from "../../components/Loader";
import PageHeader from "../../components/PageHeader";
import TableComponent from "../../components/TableComponent";
import { deleteBudget } from "../../services/budget/deleteBudget.service";
import { useGetAllBudgets } from "../../services/budget/getAllBudgets.service";
import { getAllCategories } from "../../services/categories/getAllCategories.service";
import { getCategoryById } from "../../services/categories/getCategoryById.service";
import { IBudget } from "../../types/Transactions/Budgets/budgets.types";
import { BudgetDetailModal } from "./local-components/BudgetDetailModal";
import CardGroup from "./local-components/CardGroup/CardGroup";
import { CreateOrUpdateBudgetModal } from "./local-components/CreateOrUpdateBudgetModal";

export const BudgetPage = () => {
  const { budgets, loading, error, fetchBudgets } = useGetAllBudgets();
  const [categoryNames, setCategoryNames] = useState<{ [key: number]: string }>({});
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isCreateOrUpdateModalOpen, setIsCreateOrUpdateModalOpen] = useState(false);
  const [selectedBudgetId, setSelectedBudgetId] = useState<number | null>(null);
  const [modalMode, setModalMode] = useState<"create" | "update">("create");
  const [categories, setCategories] = useState<{ category_id: number; name: string }[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategories();
        setCategories(response || []);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoadingCategories(true);
      const uniqueCategoryIds = Array.from(new Set(budgets.map((budget) => budget.category_id)));
      const categoryMap: { [key: number]: string } = {};

      try {
        await Promise.all(
          uniqueCategoryIds.map(async (categoryId) => {
            const category = await getCategoryById(categoryId);
            if (category) {
              categoryMap[categoryId] = category.name;
            } else {
              categoryMap[categoryId] = `Category ${categoryId}`;
            }
          })
        );
        setCategoryNames(categoryMap);
      } catch (err) {
        console.error("Error fetching categories:", err);
      } finally {
        setLoadingCategories(false);
      }
    };

    if (budgets.length > 0) {
      fetchCategories();
    }
  }, [budgets]);

  const handleDelete = async () => {
    if (!selectedBudgetId) return;

    const success = await deleteBudget(selectedBudgetId);
    if (success) {
      setSnackbarMessage(t("BUDGET_DELETED_SUCCESS"));
      fetchBudgets();
    } else {
      setSnackbarMessage(t("BUDGET_DELETE_ERROR"));
    }

    setIsDeleteModalOpen(false);
    setSelectedBudgetId(null);
  };

  const openDeleteModal = (budgetId: number) => {
    setSelectedBudgetId(budgetId);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedBudgetId(null);
  };

  const handleView = (budgetId: number) => {
    setSelectedBudgetId(budgetId);
    setIsViewModalOpen(true);
  };

  const handleEdit = (budgetId: number) => {
    setSelectedBudgetId(budgetId);
    setModalMode("update");
    setIsCreateOrUpdateModalOpen(true);
  };

  const handleCreate = () => {
    setModalMode("create");
    setIsCreateOrUpdateModalOpen(true);
  };

  const handleCloseCreateOrUpdateModal = () => {
    setIsCreateOrUpdateModalOpen(false);
    setSelectedBudgetId(null);
    fetchBudgets();
  };

  if (loading || loadingCategories) return <Loader overlayVariant="transparent" />;
  if (error) return <ErrorSnackbar message={t("BUDGETS_FETCH_FAILED")} open={true} onClose={() => { }} />;

  return (
    <>
      <PageHeader titleKey={t("BUDGET_PAGE")} />

      <CardGroup
        totalAmountByCategory={budgets.reduce((acc, budget) => {
          const categoryKey = categoryNames[budget.category_id] || `Category ${budget.category_id}`;
          acc[categoryKey] = (acc[categoryKey] || 0) + budget.amount;
          return acc;
        }, {} as { [key: string]: number })}
        totalBudgets={budgets.length}
        totalAmount={budgets.reduce((sum, budget) => sum + budget.amount, 0)}
        highestBudget={budgets.reduce((prev, current) => (prev.amount > current.amount ? prev : current), budgets[0] || {})}
        categoryNames={categoryNames}
        isLoading={loading}
      />

      <ActionButton
        label={t("CREATE_BUDGET")}
        onClick={handleCreate}
        variant="outlined"
        size="large"
        iconType="add"
        iconPosition="start"
        color="secondary"
      />

      <TableComponent<IBudget>
        rows={budgets}
        columnOrder={["budget_id", "category.name", "amount", "start_date", "end_date", "created_at", "updated_at"]}
        handleView={(budget) => handleView(budget.budget_id)}
        handleEdit={(budget) => handleEdit(budget.budget_id)}
        handleDelete={(budget) => openDeleteModal(budget.budget_id)}
        sx={{ m: 4 }}
      />

      {isViewModalOpen && selectedBudgetId !== null && (
        <BudgetDetailModal
          isOpen={isViewModalOpen}
          onClose={() => setIsViewModalOpen(false)}
          budgetId={selectedBudgetId}
        />
      )}

      {isCreateOrUpdateModalOpen && (
        <CreateOrUpdateBudgetModal
          isOpen={isCreateOrUpdateModalOpen}
          onClose={handleCloseCreateOrUpdateModal}
          mode={modalMode}
          budgetId={selectedBudgetId || undefined}
          categories={categories}
        />
      )}

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleDelete}
        recordName={selectedBudgetId ? t("BUDGET", { id: selectedBudgetId }) : undefined}
      />

      {snackbarMessage && (
        <ErrorSnackbar
          message={snackbarMessage}
          open={!!snackbarMessage}
          onClose={() => setSnackbarMessage(null)}
          severity="info"
        />
      )}
    </>
  );
};
