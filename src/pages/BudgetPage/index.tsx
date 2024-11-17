import { useState } from "react";
import { Box, Container, Typography, Chip } from "@mui/material";
import TableComponent from "../../components/TableComponent";
import Loader from "../../components/Loader";
import ErrorSnackbar from "../../components/ErrorSnackbar";
import PageHeader from "../../components/PageHeader";
import CardComponent from "../../components/CardComponent";
import { useMockBudgets } from "./Butget";
import { useTranslation } from "react-i18next";
import { DateTimeUtils } from "../../utils/dateTimeUtils";

export const BudgetPage = () => {
  const { t } = useTranslation();
  const budgets = useMockBudgets();
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const FeatureNotAvailable = () => {
    setSnackbarOpen(true);
  };

  const handleView = (budget: any) => {
    console.log(t("VIEWING_BUDGET"), budget);
    FeatureNotAvailable();
  };

  const handleEdit = (budget: any) => {
    console.log(t("EDITING_BUDGET"), budget);
    FeatureNotAvailable();
  };

  const handleDelete = (budget: any) => {
    console.log(t("DELETING_BUDGET"), budget);
    FeatureNotAvailable();
  };

  // Cálculo del monto total por categoría
  const totalAmountByCategory = budgets.reduce((acc, budget) => {
    if (!acc[budget.category]) {
      acc[budget.category] = budget.amount;
    } else {
      acc[budget.category] += budget.amount;
    }
    return acc;
  }, {} as { [key: string]: number });

  // Información adicional
  const totalBudgets = budgets.length;
  const totalAmount = budgets.reduce((sum, budget) => sum + budget.amount, 0);
  const highestBudget = budgets.reduce(
    (prev, current) => (prev.amount > current.amount ? prev : current),
    budgets[0]
  );

  if (!budgets.length) return <Loader overlayVariant="transparent" />;

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <PageHeader titleKey={t("BUDGET_PAGE")} />

      <Box
        display="flex"
        sx={{ p: 2, justifyContent: "space-between" }}
        mb={4}
      >
        {/* Total amount by category */}
        <CardComponent
          title={t("TOTAL_AMOUNT_BY_CATEGORY")}
          description={t("TOP_5_CATEGORIES_HIGHEST_AMOUNTS")}
          customBody={
            <>
              {Object.entries(totalAmountByCategory)
                .sort(([, amountA], [, amountB]) => amountB - amountA)
                .slice(0, 5)
                .map(([category, amount]) => (
                  <Chip
                    key={category}
                    label={`${t(category)}: $${amount.toFixed(2)}`}
                    sx={{ mt: 1, mr: 1 }}
                    variant="outlined"
                    color="primary"
                    size="small"
                  />
                ))}
            </>
          }
        />

        {/* Budget overview */}
        <CardComponent
          title={t("BUDGET_OVERVIEW")}
          description={t("SUMMARY_OF_BUDGET_STATISTICS")}
          customBody={
            <>
              <Box sx={{ mt: 1, mr: 1 }}>
                <Typography variant="body2">
                  {t("TOTAL_BUDGETS")}: {totalBudgets}
                </Typography>
              </Box>
              <Box sx={{ mt: 1, mr: 1 }}>
                <Typography variant="body2">
                  {t("TOTAL_AMOUNT")}: ${totalAmount.toFixed(2)}
                </Typography>
              </Box>
            </>
          }
        />

          
        <CardComponent
          title={t("HIGHEST_BUDGET")}
          description={t("DETAILS_OF_HIGHEST_BUDGET")}
          customBody={
            <>
              <Box sx={{ mt: 1, mr: 1 }}>
                <Typography variant="body2">
                  {t("CATEGORY")}: {highestBudget?.category}
                </Typography>
              </Box>
              <Box sx={{ mt: 1, mr: 1 }}>
                <Typography variant="body2">
                  {t("AMOUNT")}: ${highestBudget?.amount.toFixed(2)}
                </Typography>
              </Box>
              <Box sx={{ mt: 1, mr: 1 }}>
                <Typography variant="body2">
                  {t("PERIOD")}: {DateTimeUtils.formatHumanReadable(new Date(highestBudget?.start_date))} -{" "}
                  {DateTimeUtils.formatHumanReadable(new Date(highestBudget?.end_date))}
                </Typography>
              </Box>
            </>
          }
        />
      </Box>

      <Box sx={{ p: 2 }}>
        <TableComponent<any>
          rows={budgets}
          columnOrder={[
            "budget_id",
            "amount",
            "start_date",
            "end_date",
            "category",
          ]}
          handleView={handleView}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      </Box>

      <ErrorSnackbar
        message={t("FEATURE_NOT_AVAILABLE")}
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        autoHideDuration={5000}
        severity="info"
      />
    </Container>
  );
};
