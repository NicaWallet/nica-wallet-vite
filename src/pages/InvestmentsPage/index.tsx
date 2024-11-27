import { useState } from "react";
import { Box, Container, Typography, Button, Card, CardContent } from "@mui/material";
import TableComponent from "../../components/TableComponent";
import Loader from "../../components/Loader";
import ErrorSnackbar from "../../components/ErrorSnackbar";
import PageHeader from "../../components/PageHeader";
import { useTranslation } from "react-i18next";
import { Add } from "@mui/icons-material";

// Simulación de datos de inversiones (reemplazar con la API real)
const useMockInvestments = () => {
  const [investments, setInvestments] = useState<any[]>([
    {
      investment_id: 1,
      user_id: 1,
      name: "Stock Portfolio",
      amount: 15000,
      type: "Stock",
      start_date: "2024-01-01T00:00:00.000Z",
      updated_at: "2024-11-20T12:00:00.000Z",
    },
    {
      investment_id: 2,
      user_id: 1,
      name: "Real Estate Fund",
      amount: 25000,
      type: "Real Estate",
      start_date: "2024-03-15T00:00:00.000Z",
      updated_at: "2024-11-20T12:00:00.000Z",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [error] = useState<string | null>(null);

  return { investments, loading, error };
};

export const InvestmentsPage = () => {
  const { investments, loading, error } = useMockInvestments();
  const { t } = useTranslation();
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleView = (investment: any) => {
    console.log(t("VIEWING_INVESTMENT"), investment);
    setSnackbarOpen(true);
  };

  const handleEdit = (investment: any) => {
    console.log(t("EDITING_INVESTMENT"), investment);
    setSnackbarOpen(true);
  };

  const handleDelete = (investment: any) => {
    console.log(t("DELETING_INVESTMENT"), investment);
    setSnackbarOpen(true);
  };

  const totalInvestments = investments.length;
  const totalAmountInvested = investments.reduce(
    (sum, investment) => sum + investment.amount,
    0
  );

  if (loading) return <Loader overlayVariant="transparent" />;
  if (error)
    return (
      <ErrorSnackbar
        message={t("ERROR_LOADING_INVESTMENTS")}
        open={true}
        autoHideDuration={5000}
      />
    );

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <PageHeader titleKey={t("INVESTMENTS_PAGE")} />

      {/* Resumen total de inversiones */}
      <Box display="flex" justifyContent="space-between" mb={4}>
        <Card
          sx={{
            width: "100%",
            background: "linear-gradient(135deg, #83a4d4, #b6fbff)",
            borderRadius: 2,
            boxShadow: 2,
            color: "#fff",
          }}
        >
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {t("INVESTMENT_SUMMARY")}
            </Typography>
            <Box mt={2}>
              <Typography variant="body1">
                {t("TOTAL_INVESTMENTS")}: <strong>{totalInvestments}</strong>
              </Typography>
              <Typography variant="body1">
                {t("TOTAL_AMOUNT_INVESTED")}: <strong>${totalAmountInvested.toFixed(2)}</strong>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Botón para agregar nueva inversión */}
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          sx={{
            "&:hover": {
              transform: "scale(1.05)",
            },
            transition: "transform 0.2s ease-in-out",
          }}
          onClick={() => console.log(t("CREATE_INVESTMENT_CLICK"))}
        >
          {t("CREATE_INVESTMENT")}
        </Button>
      </Box>

      {/* Tabla de inversiones */}
      <Box sx={{ p: 2 }}>
        <TableComponent<any>
          rows={investments}
          columnOrder={["investment_id", "name", "type", "amount", "start_date"]}
          handleView={handleView}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      </Box>

      <ErrorSnackbar
        message={t("FEATURE_NOT_AVAILABLE")}
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        autoHideDuration={5000}
        severity="info"
      />
    </Container>
  );
};