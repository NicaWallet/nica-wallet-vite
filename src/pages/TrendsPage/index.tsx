import { useState } from "react";
import {
    Box,
    Typography,
    Card,
    CardContent,
    CircularProgress,
    Grid,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    SelectChangeEvent,
} from "@mui/material";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import PageHeader from "../../components/PageHeader";
import ErrorSnackbar from "../../components/ErrorSnackbar";

const mockTrendData = [
    { month: "Jan", value: 400 },
    { month: "Feb", value: 600 },
    { month: "Mar", value: 800 },
    { month: "Apr", value: 700 },
    { month: "May", value: 900 },
    { month: "Jun", value: 1100 },
];

const mockComparisonData = [
    { month: "Jan", series1: 300, series2: 400 },
    { month: "Feb", series1: 500, series2: 600 },
    { month: "Mar", series1: 700, series2: 800 },
    { month: "Apr", series1: 600, series2: 700 },
    { month: "May", series1: 800, series2: 900 },
    { month: "Jun", series1: 1000, series2: 1100 },
];

export const TrendsPage = () => {
    const [loading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [timeRange, setTimeRange] = useState("6M"); // 6M (6 meses) por defecto

    const handleSnackbarClose = () => setError(null);
    const handleTimeRangeChange = (event: SelectChangeEvent<string>) => {
        setTimeRange(event.target.value as string);
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <ErrorSnackbar
                message="Failed to load trend data. Please try again."
                open={Boolean(error)}
                autoHideDuration={5000}
                severity="error"
                onClose={handleSnackbarClose}
            />
        );
    }

    return (
        <>
            <PageHeader titleKey="Trends" />

            {/* Filtro de Rango de Tiempo */}
            <Box mb={4} display="flex" justifyContent="flex-end">
                <FormControl variant="outlined" size="small">
                    <InputLabel>Time Range</InputLabel>
                    <Select
                        value={timeRange}
                        onChange={handleTimeRangeChange}
                        label="Time Range"
                    >
                        <MenuItem value="1M">Last 1 Month</MenuItem>
                        <MenuItem value="3M">Last 3 Months</MenuItem>
                        <MenuItem value="6M">Last 6 Months</MenuItem>
                        <MenuItem value="1Y">Last 1 Year</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            {/* Tarjetas de Resumen */}
            <Grid container spacing={4} mb={4}>
                <Grid item xs={12} md={6}>
                    <Card
                        sx={{
                            backgroundColor: "#ffffff",
                            borderRadius: 1,
                            padding: 2,
                        }}
                    >
                        <CardContent>
                            <Typography variant="h6" color="textSecondary">
                                Peak Value
                            </Typography>
                            <Typography variant="h4" fontWeight="bold">
                                $1,100
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card
                        sx={{
                            backgroundColor: "#ffffff",
                            borderRadius: 1,
                            padding: 2,
                        }}
                    >
                        <CardContent>
                            <Typography variant="h6" color="textSecondary">
                                Average Value
                            </Typography>
                            <Typography variant="h4" fontWeight="bold">
                                $750
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Gráfico de Línea: Tendencia Principal */}
            <Box
                sx={{
                    backgroundColor: "#ffffff",
                    borderRadius: 1,
                    padding: 2,
                    mb: 4,
                }}
            >
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Main Trend
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={mockTrendData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line
                            type="monotone"
                            dataKey="value"
                            stroke="#4caf50"
                            strokeWidth={2}
                            dot={{ r: 4 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </Box>

            {/* Gráfico Comparativo */}
            <Box
                sx={{
                    backgroundColor: "#ffffff",
                    borderRadius: 1,
                    padding: 2,
                    mb: 4,
                }}
            >
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Comparative Trends
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={mockComparisonData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line
                            type="monotone"
                            dataKey="series1"
                            stroke="#2196f3"
                            strokeWidth={2}
                            dot={{ r: 4 }}
                            name="Series 1"
                        />
                        <Line
                            type="monotone"
                            dataKey="series2"
                            stroke="#f44336"
                            strokeWidth={2}
                            dot={{ r: 4 }}
                            name="Series 2"
                        />
                    </LineChart>
                </ResponsiveContainer>
            </Box>
        </>
    );
};
