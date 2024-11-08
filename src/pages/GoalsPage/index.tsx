import { Box, Typography } from "@mui/material";
import PageHeader from "../../components/PageHeader";

export const GoalsPage = () => {
    return (
        <>
            <PageHeader titleKey="GOALS_PAGE" />
            <Box sx={{ p: 2 }}>
                <Typography variant="h4" gutterBottom>
                    Goals
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Welcome to the goals page!
                </Typography>
            </Box>
        </>
    );
}