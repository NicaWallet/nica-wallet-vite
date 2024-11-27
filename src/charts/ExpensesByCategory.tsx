import React from "react";
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
];

const COLORS = mockPieData.map(() => getRandomColor());

// Componente de visualización de gastos por categoría
const ExpensesByCategory: React.FC = () => {
    return (
        <>
            <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                    <Pie
                        data={mockPieData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label={({ name, value }) => `${name}: $${value}`}
                        dataKey="value"
                        stroke="#ffffff"
                    >
                        {mockPieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </>
    );
};

export default ExpensesByCategory;
