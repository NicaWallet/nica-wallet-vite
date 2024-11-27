import { useState } from "react";
import {
    Box,
    Typography,
    Card,
    CardContent,
    CircularProgress,
    Grid,
} from "@mui/material";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import PageHeader from "../../components/PageHeader";
import ErrorSnackbar from "../../components/ErrorSnackbar";

// Mock data for statistics
const mockStatistics = [
    {
        id: 1,
        name: "Active Users",
        value: 1200,
        details: "Users active this month",
    },
    {
        id: 2,
        name: "New Signups",
        value: 300,
        details: "Users who signed up this month",
    },
    {
        id: 3,
        name: "Revenue",
        value: 15000,
        details: "Revenue generated this month",
    },
];

const mockChartData = [
    { name: "Jan", users: 400, revenue: 5000 },
    { name: "Feb", users: 500, revenue: 7000 },
    { name: "Mar", users: 450, revenue: 6000 },
    { name: "Apr", users: 600, revenue: 8000 },
];

export const StatisticsPage = () => {
    const [loading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSnackbarClose = () => setError(null);

    if (loading) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100vh"
            >
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <ErrorSnackbar
                message="Failed to load statistics. Please try again."
                open={Boolean(error)}
                autoHideDuration={5000}
                severity="error"
                onClose={handleSnackbarClose}
            />
        );
    }

    return (
        <>
            <PageHeader titleKey="Statistics" />

            {/* Summary Cards */}
            <Grid container spacing={4} mb={4}>
                {mockStatistics.map((stat) => (
                    <Grid item xs={12} md={4} key={stat.id}>
                        <Card
                            sx={{
                                backgroundColor: "#f5f5f5",
                                borderRadius: 1,
                                padding: 2,
                                textAlign: "center",
                            }}
                        >
                            <CardContent>
                                <Typography variant="h6" color="textSecondary">
                                    {stat.name}
                                </Typography>
                                <Typography variant="h4" fontWeight="bold">
                                    {stat.value.toLocaleString()}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {stat.details}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Chart Section */}
            <Box
                sx={{
                    backgroundColor: "#ffffff",
                    borderRadius: 1,
                    padding: 2,
                    mb: 4,
                }}
            >
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Monthly Trends
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={mockChartData}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="users" fill="#4caf50" name="Users" />
                        <Bar dataKey="revenue" fill="#2196f3" name="Revenue" />
                    </BarChart>
                </ResponsiveContainer>
            </Box>
        </>
    );
};
