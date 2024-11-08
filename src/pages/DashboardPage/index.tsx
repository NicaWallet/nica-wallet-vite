import { Box, Typography } from "@mui/material";
import PageHeader from "../../components/PageHeader";

export const DashboardPage = () => {
    return (
        <>
            <PageHeader titleKey="DASHBOARD_PAGE" />
            <Box sx={{ p: 2 }}>
                <Typography variant="h4" gutterBottom>
                    Dashboard
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Welcome to the dashboard!
                </Typography>
            </Box>
        </>
    );
}