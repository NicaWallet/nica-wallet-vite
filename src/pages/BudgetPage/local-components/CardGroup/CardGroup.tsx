import React from "react";
import { Box } from "@mui/material";
import { t } from "i18next";
import CardComponent from "../../../../components/CardComponent";
import BudgetOverviewDetails from "./BudgetOverviewDetails";
import HighestBudgetDetails from "./HighestBudgetDetails";
import TopCategoriesByAmount from "./TopCategoriesByAmount";



interface CardGroupProps {
    totalAmountByCategory: { [key: string]: number };
    totalBudgets: number;
    totalAmount: number;
    highestBudget: {
        category_id: number;
        amount: number;
        start_date: string | Date;
        end_date: string | Date;
    } | null;
    categoryNames: { [key: number]: string };
    isLoading?: boolean;
}

/**
 * CardGroup maneja y renderiza un conjunto de tarjetas con datos calculados.
 */
const CardGroup: React.FC<CardGroupProps> = ({
    totalAmountByCategory,
    totalBudgets,
    totalAmount,
    highestBudget,
    categoryNames,
    isLoading = false,
}) => {
    return (
        <Box display="flex" sx={{ justifyContent: "center", m: 4, gap: 6 }}>
            {/* Total amount by category */}
            <CardComponent
                title={t("TOTAL_AMOUNT_BY_CATEGORY")}
                description={t("TOP_5_CATEGORIES_HIGHEST_AMOUNTS")}
                borderColor="primary.main"
                isLoading={isLoading}
                rounded={true}
                customBody={
                    <TopCategoriesByAmount totalAmountByCategory={totalAmountByCategory} />
                }
            />

            {/* Budget overview */}
            <CardComponent
                title={t("BUDGET_OVERVIEW")}
                description={t("SUMMARY_OF_BUDGET_STATISTICS")}
                borderColor="primary.main"
                isLoading={isLoading}
                rounded={true}
                customBody={
                    <BudgetOverviewDetails
                        totalBudgets={totalBudgets}
                        totalAmount={totalAmount}
                    />
                }
            />

            {/* Highest budget */}
            <CardComponent
                title={t("HIGHEST_BUDGET")}
                description={t("DETAILS_OF_HIGHEST_BUDGET")}
                borderColor="primary.main"
                isLoading={isLoading}
                rounded={true}
                customBody={
                    <HighestBudgetDetails
                        highestBudget={highestBudget}
                        categoryNames={categoryNames}
                    />
                }
            />
        </Box>
    );
};

export default CardGroup;
