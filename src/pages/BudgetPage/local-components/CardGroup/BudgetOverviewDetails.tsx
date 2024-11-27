import React from "react";
import { Box, Typography } from "@mui/material";
import { t } from "i18next";

interface BudgetOverviewDetailsProps {
    totalBudgets: number;
    totalAmount: number;
}

/**
 * Componente para mostrar un resumen de estadísticas de presupuesto.
 */
const BudgetOverviewDetails: React.FC<BudgetOverviewDetailsProps> = ({
    totalBudgets,
    totalAmount,
}) => {
    return (
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
    );
};

export default BudgetOverviewDetails;
