import { Box, Typography } from "@mui/material";
import PageHeader from "../../components/PageHeader";

export const InvestmentsPage = () => {
    return (
        <>
            <PageHeader titleKey="INVESTMENTS_PAGE" />
            <Box sx={{ p: 2 }}>
                <Typography variant="h4" gutterBottom>
                    Investments
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Welcome to the investments page!
                </Typography>
            </Box>
        </>
    );
}