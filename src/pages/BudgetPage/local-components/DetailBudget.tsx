import { Typography, Grid, Divider, Paper } from "@mui/material";
import { t } from "i18next";
import { DateTimeUtils } from "../../../utils/dateTimeUtils";
import Loader from "../../../components/Loader";
import { IBudgetById } from "../../../types/Transactions/Budgets/budgets.types";

interface DetailBudgetProps {
  budgetData: IBudgetById | null;
  isLoading?: boolean;
}

export const DetailBudget = ({ budgetData, isLoading }: DetailBudgetProps) => {
  if (!budgetData) {
    return isLoading ? (
      <Loader
        overlayVariant="transparent"
      />
    ) : (
      <Typography variant="body1" sx={{ color: "#6b7280" }}>
        {t("ERROR_FETCHING_BUDGET")}
      </Typography>
    );
  }

  return (
    <>
      {isLoading ? (
        <Loader overlayVariant="transparent" />
      ) : (
        <Paper elevation={4} sx={{ p: 4, backgroundColor: "#ffffff", borderRadius: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "#374151" }}>
                {t("CATEGORY_NAME")}
              </Typography>
              <Typography variant="h6" sx={{ color: "#4b5563" }}>
                {budgetData.category?.name || t("UNKNOWN_CATEGORY")}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "#374151" }}>
                {t("AMOUNT")}
              </Typography>
              <Typography variant="h5" sx={{ color: "#10b981", fontWeight: "bold" }}>
                ${budgetData.amount.toFixed(2)}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "#374151" }}>
                {t("START_DATE")}
              </Typography>
              <Typography variant="body1" sx={{ color: "#6b7280" }}>
                {DateTimeUtils.formatHumanReadable(new Date(budgetData.start_date))}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "#374151" }}>
                {t("END_DATE")}
              </Typography>
              <Typography variant="body1" sx={{ color: "#6b7280" }}>
                {DateTimeUtils.formatHumanReadable(new Date(budgetData.end_date))}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "#374151" }}>
                {t("CREATED_AT")}
              </Typography>
              <Typography variant="body1" sx={{ color: "#6b7280" }}>
                {DateTimeUtils.formatHumanReadable(new Date(budgetData.created_at))}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "#374151" }}>
                {t("UPDATED_AT")}
              </Typography>
              <Typography variant="body1" sx={{ color: "#6b7280" }}>
                {DateTimeUtils.formatHumanReadable(new Date(budgetData.updated_at))}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      )}
    </>
  );
};
