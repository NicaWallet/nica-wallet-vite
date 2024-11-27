import React from "react";
import { Typography, LinearProgress, Box, Avatar } from "@mui/material";

// Tipo para datos de metas
interface Goal {
    name: string;
    target: number;
    current: number;
}

// Datos simulados de metas
const mockGoals: Goal[] = [
    { name: "Car", target: 5000, current: 2000 },
    { name: "Vacation", target: 3000, current: 1500 },
    { name: "Emergency Fund", target: 10000, current: 7500 },
    { name: "Debt Payment", target: 7000, current: 3000 },
    { name: "House", target: 30000, current: 10000 },
];

// Componente de progreso de metas
const GoalsProgress: React.FC = () => {
    return (
        <>
            {mockGoals.map((goal, index) => (
                <Box
                    key={index}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "16px",
                        padding: "8px",
                        backgroundColor: "#fafafa",
                        borderRadius: "8px",
                    }}
                >
                    <Avatar sx={{ backgroundColor: "#4caf50", marginRight: "16px" }}>
                        {goal.name.charAt(0)}
                    </Avatar>
                    <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="body1">{goal.name}</Typography>
                        <LinearProgress
                            variant="determinate"
                            value={(goal.current / goal.target) * 100}
                            sx={{ marginY: "8px", height: "10px", borderRadius: "5px" }}
                        />
                        <Typography variant="caption">
                            ${goal.current} / ${goal.target} ({((goal.current / goal.target) * 100).toFixed(1)}%)
                        </Typography>
                    </Box>
                </Box>

            ))}
        </>
    );
};

export default GoalsProgress;
