import React from "react";
import { Typography, Box } from "@mui/material";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { getRandomColor } from "../utils/getRandomColor";

// Tipo para datos de gastos por categoría
interface ExpenseCategory {
    name: string;
    value: number;
}

// Datos simulados de ejemplo
const mockPieData: ExpenseCategory[] = [
    { name: "Food", value: 400 },
    { name: "Rent", value: 300 },
    { name: "Savings", value: 300 },
    { name: "Transportation", value: 200 },
    { name: "Entertainment", value: 100 },
    { name: "Health", value: 50 },
    { name: "Other", value: 150 },
    { name: "Education", value: 200 },
];

const COLORS = mockPieData.map(() => getRandomColor());

const ExpensesByCategory: React.FC = () => {
    return (
        <>
            <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "16px",
            }}
            >
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={mockPieData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={100}
                            paddingAngle={5}
                            dataKey="value"
                            stroke="#ffffff"
                            label={({ name, value }) => `${name}: $${value}`}
                        >
                            {mockPieData.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={COLORS[index % COLORS.length]}
                                    style={{
                                        cursor: "pointer",
                                        transition: "transform 0.2s",
                                    }}
                                    onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
                                    onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
                                />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{
                                borderRadius: "8px",
                                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                            }}
                        />
                    </PieChart>
                </ResponsiveContainer>
                {/* Leyenda */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-around",
                        marginTop: "16px",
                        flexWrap: "wrap",
                    }}
                >
                    {mockPieData.map((entry, index) => (
                        <Box
                            key={index}
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                                margin: "4px 8px",
                            }}
                        >
                            <Box
                                sx={{
                                    width: "16px",
                                    height: "16px",
                                    backgroundColor: COLORS[index % COLORS.length],
                                    borderRadius: "50%",
                                }}
                            />
                            <Typography variant="body2" fontWeight="bold">
                                {entry.name}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </Box>
        </>
    );
};

export default ExpensesByCategory;
