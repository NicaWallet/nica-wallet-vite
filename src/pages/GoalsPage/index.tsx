import { useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import { useTranslation } from "react-i18next";
import PageHeader from "../../components/PageHeader";
import ActionButton from "../../components/ActionButton";
import TableComponent from "../../components/TableComponent";
import ErrorSnackbar from "../../components/ErrorSnackbar";

interface Goal {
  goal_id: number;
  description: string;
  target_amount: number;
  current_amount: number;
  deadline: string;
  [key: string]: unknown;
}

const useMockGoals = () => {
  const [goals] = useState<Goal[]>([
    {
      goal_id: 1,
      description: "Save for a car",
      target_amount: 5000,
      current_amount: 1500,
      deadline: "2024-12-31",
    },
    {
      goal_id: 2,
      description: "Vacation fund",
      target_amount: 3000,
      current_amount: 1000,
      deadline: "2025-06-01",
    },
  ]);
  const [loading] = useState(false);
  const [error] = useState<string | null>(null);

  return { goals, loading, error };
};

export const GoalsPage = () => {
  const { goals, loading, error } = useMockGoals();
  const { t } = useTranslation();
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSnackbarClose = () => setSnackbarOpen(false);

  const handleView = (goal: Goal) => console.log(t("VIEWING_GOAL"), goal);
  const handleEdit = (goal: Goal) => console.log(t("EDITING_GOAL"), goal);
  const handleDelete = (goal: Goal) => console.log(t("DELETING_GOAL"), goal);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <ErrorSnackbar
        message={t("ERROR_LOADING_GOALS")}
        open={true}
        autoHideDuration={5000}
        severity="error"
        onClose={handleSnackbarClose}
      />
    );
  }

  return (
    <>
      <PageHeader titleKey={t("GOALS_PAGE")} />

      <ActionButton
        label={t("CREATE_GOAL")}
        color="secondary"
        variant="outlined"
        iconType="add"
        onClick={() => console.log(t("CREATE_GOAL_CLICK"))}
      />

      <TableComponent<Goal>
        rows={goals}
        columnOrder={[
          "goal_id",
          "description",
          "target_amount",
          "current_amount",
          "deadline",
        ]}
        handleView={handleView}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        sx={{ p: 4 }}
      />

      {/* Snackbar */}
      <ErrorSnackbar
        message={t("FEATURE_NOT_AVAILABLE")}
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        autoHideDuration={5000}
        severity="info"
      />
    </>
  );
};
