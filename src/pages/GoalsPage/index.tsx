import { useState } from "react";
import {
  Box,
  Container,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Divider,
  IconButton,
  useTheme,
} from "@mui/material";
import { Add, Edit, Delete, Visibility } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

const useMockGoals = () => {
  const [goals] = useState<any[]>([
    {
      goal_id: 1,
      description: "Save for a car",
      target_amount: 5000,
      current_amount: 1500,
      deadline: "2024-12-31",
    },
    {
      goal_id: 2,
      description: "Vacation fund",
      target_amount: 3000,
      current_amount: 1000,
      deadline: "2025-06-01",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [error] = useState<string | null>(null);

  return { goals, loading, error };
};

export const GoalsPage = () => {
  const { goals, loading, error } = useMockGoals();
  const { t } = useTranslation();
  const theme = useTheme();

  const totalGoals = goals.length;
  const totalTargetAmount = goals.reduce((sum, goal) => sum + goal.target_amount, 0);
  const totalCurrentAmount = goals.reduce((sum, goal) => sum + goal.current_amount, 0);
  const progressPercentage = ((totalCurrentAmount / totalTargetAmount) * 100).toFixed(2);

  const handleView = (goal: any) => console.log(t("VIEWING_GOAL"), goal);
  const handleEdit = (goal: any) => console.log(t("EDITING_GOAL"), goal);
  const handleDelete = (goal: any) => console.log(t("DELETING_GOAL"), goal);

  const progressColor =
    Number(progressPercentage) > 75
      ? theme.palette.success.main
      : Number(progressPercentage) > 50
      ? theme.palette.warning.main
      : theme.palette.error.main;

  if (loading)
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography color="error">{t("ERROR_LOADING_GOALS")}</Typography>
      </Box>
    );

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {t("GOALS_PAGE")}
      </Typography>

      <Box display="flex" gap={4} flexWrap="wrap" mb={4}>
        {/* Tarjeta de Progreso */}
        <Card
          sx={{
            flex: 1,
            background: "linear-gradient(135deg, #ff9a9e, #fad0c4)",
            color: theme.palette.common.white,
          }}
        >
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {t("GOAL_PROGRESS")}
            </Typography>
            <Box display="flex" flexDirection="column" alignItems="center" mt={2}>
              <CircularProgress
                variant="determinate"
                value={Number(progressPercentage)}
                size={80}
                thickness={5}
                sx={{ color: progressColor }}
              />
              <Typography variant="h5" mt={2} fontWeight="bold">
                {progressPercentage}%
              </Typography>
            </Box>
          </CardContent>
        </Card>

        {/* Tarjeta de Resumen */}
        <Card
          sx={{
            flex: 1,
            background: "linear-gradient(135deg, #a18cd1, #fbc2eb)",
            color: theme.palette.common.white,
          }}
        >
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {t("GOAL_OVERVIEW")}
            </Typography>
            <Box mt={2}>
              <Typography variant="body1">
                {t("TOTAL_GOALS")}: <strong>{totalGoals}</strong>
              </Typography>
              <Typography variant="body1">
                {t("TOTAL_TARGET_AMOUNT")}: <strong>${totalTargetAmount.toFixed(2)}</strong>
              </Typography>
              <Typography variant="body1">
                {t("TOTAL_CURRENT_AMOUNT")}: <strong>${totalCurrentAmount.toFixed(2)}</strong>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>

      <Divider sx={{ mb: 4 }} />

      {/* Botón de Agregar Meta */}
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          sx={{
            transition: "transform 0.2s",
            "&:hover": {
              transform: "scale(1.05)",
            },
          }}
          onClick={() => console.log(t("CREATE_GOAL_CLICK"))}
        >
          {t("CREATE_GOAL")}
        </Button>
      </Box>

      {/* Tabla de Metas */}
      <Box>
        <Table>
          <TableHead>
            <TableRow sx={{ background: theme.palette.grey[200] }}>
              <TableCell>{t("GOAL_ID")}</TableCell>
              <TableCell>{t("DESCRIPTION")}</TableCell>
              <TableCell>{t("TARGET_AMOUNT")}</TableCell>
              <TableCell>{t("CURRENT_AMOUNT")}</TableCell>
              <TableCell>{t("DEADLINE")}</TableCell>
              <TableCell>{t("ACTIONS")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {goals.map((goal) => (
              <TableRow
                key={goal.goal_id}
                sx={{
                  "&:hover": {
                    background: theme.palette.action.hover,
                  },
                }}
              >
                <TableCell>{goal.goal_id}</TableCell>
                <TableCell>{goal.description}</TableCell>
                <TableCell>${goal.target_amount.toFixed(2)}</TableCell>
                <TableCell>${goal.current_amount.toFixed(2)}</TableCell>
                <TableCell>{goal.deadline}</TableCell>
                <TableCell>
                  <Box display="flex" gap={1}>
                    <IconButton color="primary" onClick={() => handleView(goal)}>
                      <Visibility />
                    </IconButton>
                    <IconButton color="secondary" onClick={() => handleEdit(goal)}>
                      <Edit />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(goal)}>
                      <Delete />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Container>
  );
};