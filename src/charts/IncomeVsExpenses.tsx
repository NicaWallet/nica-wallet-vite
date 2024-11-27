import React from "react";
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    CartesianGrid,
} from "recharts";

const mockTransactions = [
    { name: "Jan", income: 15000, expense: 5000 },
    { name: "Feb", income: 30000, expense: 2000 },
    { name: "Mar", income: 10000, expense: 15000 },
    { name: "Apr", income: 50000, expense: 10000 },
    { name: "May", income: 20000, expense: 25000 },
    { name: "Jun", income: 45000, expense: 5000 },
    { name: "Jul", income: 25000, expense: 30000 },
    { name: "Aug", income: 35000, expense: 1000 },
    { name: "Sep", income: 15000, expense: 20000 },
    { name: "Oct", income: 50000, expense: 5000 },
    { name: "Nov", income: 10000, expense: 40000 },
    { name: "Dec", income: 60000, expense: 10000 },
];

const IncomeVsExpenses: React.FC = () => (
    <ResponsiveContainer width="100%" height={350}>
        <BarChart
            data={mockTransactions}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
                dataKey="name"
                tick={{ fontSize: 12 }}
                axisLine={{ stroke: "#8884d8" }}
                tickLine={{ stroke: "#8884d8" }}
            />
            <YAxis
                tickFormatter={(value) => `$${value / 1000}k`}
                axisLine={{ stroke: "#8884d8" }}
                tickLine={{ stroke: "#8884d8" }}
                tick={{ fontSize: 12 }}
            />
            <Tooltip
                formatter={(value: number) => [`$${value.toLocaleString()}`, ""]}
                contentStyle={{
                    backgroundColor: "#ffffff",
                    borderRadius: "8px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                }}
                labelStyle={{ color: "#8884d8", fontWeight: "bold" }}
            />
            <Legend
                verticalAlign="top"
                align="right"
                wrapperStyle={{ paddingBottom: "10px" }}
            />
            <Bar
                dataKey="income"
                fill="#4caf50"
                name="Income"
                barSize={30}
                radius={[10, 10, 0, 0]}
            />
            <Bar
                dataKey="expense"
                fill="#f44336"
                name="Expense"
                barSize={30}
                radius={[10, 10, 0, 0]}
            />
        </BarChart>
    </ResponsiveContainer>
);

export default IncomeVsExpenses;
