import React from "react";
import { Box, Grid, Typography, Card } from "@mui/material";
import { motion } from "framer-motion";
import { AccountBalance, TrendingUp, TrendingDown } from "@mui/icons-material";
import PageHeader from "../../components/PageHeader";
import IncomeVsExpenses from "../../charts/IncomeVsExpenses";
import LatestTransactions from "../../charts/LatestTransactions";
import ExpensesByCategory from "../../charts/ExpensesByCategory";
import GoalsProgress from "../../charts/GoalsProgress";

const DashboardPage: React.FC = () => {
    const financialCards = [
        {
            title: "Total Balance",
            amount: "$30,192.98",
            color: "#4caf50",
            change: "+5% since last month",
            icon: <AccountBalance fontSize="large" sx={{ color: "#4caf50" }} />,
        },
        {
            title: "Income",
            amount: "$40,000.00",
            color: "#4caf50",
            change: "+3% since last month",
            icon: <TrendingUp fontSize="large" sx={{ color: "#4caf50" }} />,
        },
        {
            title: "Expenses",
            amount: "$5,041.63",
            color: "#f44336",
            change: "-2% since last month",
            icon: <TrendingDown fontSize="large" sx={{ color: "#f44336" }} />,
        },
    ];

    return (
        <Box
            component={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            sx={{
                backgroundColor: "#f9f9f9",
                padding: "32px",
                minHeight: "100vh",
            }}
        >
            {/* Encabezado */}
            <PageHeader titleKey="DASHBOARD" />

            <Box
                sx={{
                    textAlign: "center",
                    padding: "16px",
                    borderRadius: "12px",
                    marginBottom: "32px",
                }}
                component={motion.div}
                initial={{ y: -50 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <Typography variant="h3" fontWeight="bold">
                    Welcome to Your Dashboard
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                    Get insights into your financial progress.
                </Typography>
            </Box>

            {/* Resumen Financiero */}
            <Grid container spacing={4} sx={{ marginBottom: "32px" }}>
                {financialCards.map((item, index) => (
                    <Grid item xs={12} md={4} key={index}>
                        <Card
                            component={motion.div}
                            whileHover={{ scale: 1.05 }}
                            sx={{
                                borderRadius: "12px",
                                backgroundColor: "#ffffff",
                                padding: "16px",
                                textAlign: "center",
                                boxShadow: 3,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                gap: 2,
                            }}
                        >
                            {item.icon}
                            <Typography variant="h6" color="textSecondary">
                                {item.title}
                            </Typography>
                            <Typography
                                variant="h4"
                                fontWeight="bold"
                                color={item.color}
                            >
                                {item.amount}
                            </Typography>
                            <Typography
                                variant="subtitle2"
                                color={item.color === "#4caf50" ? "green" : "red"}
                            >
                                {item.change}
                            </Typography>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Sección de Gráficos */}
            <Grid container spacing={4} sx={{ marginBottom: "32px" }}>
                <Grid item xs={12} md={8}>
                    <Card
                        component={motion.div}
                        whileHover={{ scale: 1.02 }}
                        sx={{
                            borderRadius: "12px",
                            backgroundColor: "#ffffff",
                            padding: "16px",
                            boxShadow: 3,
                            height: "90%",
                        }}
                    >
                        <Typography
                            variant="h6"
                            fontWeight="bold"
                            gutterBottom
                            sx={{ textAlign: "center" }}
                        >
                            Financial Insights
                        </Typography>
                        <IncomeVsExpenses />
                    </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card
                        component={motion.div}
                        whileHover={{ scale: 1.02 }}
                        sx={{
                            borderRadius: "12px",
                            backgroundColor: "#ffffff",
                            padding: "16px",
                            boxShadow: 3,
                            height: "90%",
                        }}
                    >
                        <Typography
                            variant="h6"
                            fontWeight="bold"
                            gutterBottom
                            sx={{ textAlign: "center" }}
                        >
                            Expenses by Category
                        </Typography>
                        <ExpensesByCategory />
                    </Card>
                </Grid>
            </Grid>

            {/* Progreso de Metas */}
            <Grid container spacing={4} sx={{ marginBottom: "32px" }}>
                <Grid item xs={12} md={6}>
                    <Card
                        component={motion.div}
                        whileHover={{ scale: 1.02 }}
                        sx={{
                            backgroundColor: "#ffffff",
                            borderRadius: "12px",
                            padding: "16px",
                            boxShadow: 3,
                            height: "100%",
                        }}
                    >
                        <Typography
                            variant="h6"
                            fontWeight="bold"
                            gutterBottom
                            sx={{ textAlign: "center" }}
                        >
                            Goals Progress
                        </Typography>
                        <GoalsProgress />
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card
                        component={motion.div}
                        whileHover={{ scale: 1.02 }}
                        sx={{
                            backgroundColor: "#ffffff",
                            borderRadius: "12px",
                            padding: "16px",
                            boxShadow: 3,
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                        }}
                    >
                        <Typography
                            variant="h6"
                            fontWeight="bold"
                            gutterBottom
                            sx={{ textAlign: "center" }}
                        >
                            Recent Transactions
                        </Typography>
                        <LatestTransactions />
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default DashboardPage;
