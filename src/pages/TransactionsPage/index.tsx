import { Box, Typography } from "@mui/material";
import PageHeader from "../../components/PageHeader";

export const TransactionsPage = () => {
    return (
        <>
            <PageHeader titleKey="TRANSACTIONS_PAGE" />
            <Box sx={{ p: 2 }}>
                <Typography variant="h4" gutterBottom>
                    Transactions
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Welcome to the transactions page!
                </Typography>
            </Box>
        </>
    );
}