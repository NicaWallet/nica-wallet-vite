import { Box, Typography } from "@mui/material";
import PageHeader from "../../components/PageHeader";

export const BillsPage = () => {
    return (
        <>
            <PageHeader titleKey="BILLS_PAGE" />
            <Box sx={{ p: 2 }}>
                <Typography variant="h4" gutterBottom>
                    Bills
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Welcome to the bills page!
                </Typography>
            </Box>
        </>
    );
}