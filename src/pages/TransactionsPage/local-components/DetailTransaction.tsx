import React from "react";
import { Box, Typography, Divider, Grid, Paper, Avatar } from "@mui/material";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import CategoryIcon from "@mui/icons-material/Category";
import { DateTimeUtils } from "../../../utils/dateTimeUtils";
import { ITransactionWithDetails } from "../../../types/Transactions/transactions.types";
import { t } from "i18next";


interface IDetailTransactionProps {
  transaction: ITransactionWithDetails;
}

export const DetailTransaction: React.FC<IDetailTransactionProps> = ({
  transaction,
}) => {
  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: "12px" }}>
      <Divider sx={{ mb: 2 }} />

      <Grid container spacing={3}>
        {/* Transaction Info */}
        <Grid item xs={12} md={6}>
          <Box display="flex" alignItems="center" mb={2}>
            <Avatar sx={{ bgcolor: "primary.main", mr: 2 }}>
              <MonetizationOnIcon />
            </Avatar>
            <Typography variant="h6">{t('TRANSACTION_INFO')}</Typography>
          </Box>
          <Typography variant="body1">
            <strong>{t('TRANSACTION_ID')}</strong> {transaction.transaction_id || "N/A"}
          </Typography>
          <Typography variant="body1">
            <strong>{t('')}</strong> ${transaction.amount.toFixed(2) || "N/A"}
          </Typography>
          <Typography variant="body1">
            <strong>Date:</strong>{" "}
            {DateTimeUtils.formatHumanReadable(new Date(transaction.date)) || "N/A"}
          </Typography>
        </Grid>

        {/* Category Info */}
        <Grid item xs={12} md={6}>
          <Box display="flex" alignItems="center" mb={2}>
            <Avatar sx={{ bgcolor: "secondary.main", mr: 2 }}>
              <CategoryIcon />
            </Avatar>
            <Typography variant="h6">Category Information</Typography>
          </Box>
          <Typography variant="body1">
            <strong>Category:</strong> {transaction.category.name || "N/A"}
          </Typography>
          <Typography variant="body1">
            <strong>Subcategory:</strong>{" "}
            {transaction.category?.subcategories?.[0]?.name || "N/A"}
          </Typography>
          <Typography variant="body1">
            <strong>Classification:</strong> {transaction.classification.name || "N/A"}
          </Typography>
        </Grid>
      </Grid>

      <Divider sx={{ my: 3 }} />

      {/* Additional Info */}
      <Box textAlign="center">
        <Typography variant="body2" color="textSecondary">
          Created At:{" "}
          {DateTimeUtils.formatHumanReadable(new Date(transaction.created_at)) || "N/A"}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Updated At:{" "}
          {DateTimeUtils.formatHumanReadable(new Date(transaction.updated_at)) || "N/A"}
        </Typography>
      </Box>
    </Paper>
  );
};
