import React from "react";
import { Box, Typography } from "@mui/material";
import { t } from "i18next";
import { DateTimeUtils } from "../../../../utils/dateTimeUtils";

interface HighestBudgetDetailsProps {
    highestBudget: {
        category_id: number;
        amount: number;
        start_date: string | Date;
        end_date: string | Date;
    } | null;
    categoryNames: { [key: number]: string };
}

/**
 * Componente para mostrar los detalles del presupuesto más alto.
 */
const HighestBudgetDetails: React.FC<HighestBudgetDetailsProps> = ({
    highestBudget,
    categoryNames,
}) => {
    if (!highestBudget) {
        return null;
    }

    return (
        <>
            <Box sx={{ mt: 1, mr: 1 }}>
                <Typography variant="body2">
                    {t("CATEGORY")}: {categoryNames[highestBudget.category_id] || `Category ${highestBudget.category_id}`}
                </Typography>
            </Box>
            <Box sx={{ mt: 1, mr: 1 }}>
                <Typography variant="body2">
                    {t("AMOUNT")}: ${highestBudget.amount ? highestBudget.amount.toFixed(2) : "0.00"}
                </Typography>
            </Box>
            <Box sx={{ mt: 1, mr: 1 }}>
                <Typography variant="body2">
                    {t("PERIOD")}:{" "}
                    {highestBudget.start_date
                        ? DateTimeUtils.formatHumanReadable(new Date(highestBudget.start_date))
                        : t("N/A")}{" "}
                    -{" "}
                    {highestBudget.end_date
                        ? DateTimeUtils.formatHumanReadable(new Date(highestBudget.end_date))
                        : t("N/A")}
                </Typography>
            </Box>
        </>
    );
};

export default HighestBudgetDetails;
