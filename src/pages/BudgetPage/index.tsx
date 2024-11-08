import { Box, Typography } from "@mui/material";
import PageHeader from "../../components/PageHeader";

export const BudgetPage = () => {
    return (
        <>
            <PageHeader titleKey="BUDGET_PAGE" />
            <Box sx={{ p: 2 }}>
                <Typography variant="h4" gutterBottom>
                    Budget
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Welcome to the budget page!
                </Typography>
            </Box>
        </>
    );
}