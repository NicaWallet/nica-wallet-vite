import { useState } from "react";
import { Box } from "@mui/material";
import TableComponent from "../../components/TableComponent";
import Loader from "../../components/Loader";
import ErrorSnackbar from "../../components/ErrorSnackbar";
import PageHeader from "../../components/PageHeader";
import { useTranslation } from "react-i18next";
import ActionButton from "../../components/ActionButton";

interface Investment {
  investment_id: number;
  user_id: number;
  name: string;
  amount: number;
  type: string;
  start_date: string;
  updated_at: string;
  [key: string]: unknown;
}

// Simulación de datos de inversiones (reemplazar con la API real)
const useMockInvestments = () => {
  const [investments] = useState<Investment[]>([
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
  const [loading] = useState(false);
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

  const handleView = (investment: Investment) => {
    console.log(t("VIEWING_INVESTMENT"), investment);
    setSnackbarOpen(true);
  };

  const handleEdit = (investment: Investment) => {
    console.log(t("EDITING_INVESTMENT"), investment);
    setSnackbarOpen(true);
  };

  const handleDelete = (investment: Investment) => {
    console.log(t("DELETING_INVESTMENT"), investment);
    setSnackbarOpen(true);
  };

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
    <>
      <PageHeader titleKey={t("INVESTMENTS_PAGE")} />

      <ActionButton
        label={"CREATE_INVESTMENT"}
        color="secondary"
        variant="outlined"
        onClick={() => {}}
        isLoading={false}
        iconType="add"
      />

      {/* Tabla de Inversiones */}
      <Box sx={{ p: 2 }}>
        <TableComponent<Investment>
          rows={investments}
          columnOrder={[
            "investment_id",
            "name",
            "type",
            "amount",
            "start_date",
          ]}
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
    </>
  );
};
