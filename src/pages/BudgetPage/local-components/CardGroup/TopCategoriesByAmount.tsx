import React from "react";
import { Box, Chip } from "@mui/material";
import { t } from "i18next";

interface TopCategoriesByAmountProps {
    totalAmountByCategory: { [key: string]: number };
    limit?: number; // Cantidad máxima de categorías a mostrar
}

/**
 * Componente para mostrar las categorías con los montos más altos.
 */
const TopCategoriesByAmount: React.FC<TopCategoriesByAmountProps> = ({
    totalAmountByCategory,
    limit = 5, // Límite predeterminado
}) => {
    return (
        <Box>
            {Object.entries(totalAmountByCategory)
                .sort(([, amountA], [, amountB]) => (amountB as number) - (amountA as number))
                .slice(0, limit)
                .map(([category, amount]) => (
                    <Chip
                        key={category}
                        label={`${t(category)}: $${amount}`}
                        sx={{ mt: 1, mr: 1 }}
                        variant="outlined"
                        color="primary"
                        size="small"
                    />
                ))}
        </Box>
    );
};

export default TopCategoriesByAmount;
