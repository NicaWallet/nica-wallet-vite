import { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Drawer,
  IconButton,
} from "@mui/material";
import TableComponent from "../../components/TableComponent";
import Loader from "../../components/Loader";
import ErrorSnackbar from "../../components/ErrorSnackbar";
import PageHeader from "../../components/PageHeader";
import ButtonComponent from "../../components/ButtonComponent";
import { useTranslation } from "react-i18next";
import { Add, Paid, Pending, AttachMoney } from "@mui/icons-material";

// Simulación de datos de facturas (reemplazar con la API real)
const useMockBills = () => {
  const [bills, setBills] = useState<any[]>([
    {
      bill_id: 1,
      user_id: 1,
      name: "Electricity Bill",
      amount: 120.5,
      due_date: "2024-12-15T00:00:00.000Z",
      status: "pending",
      updated_at: "2024-11-20T12:00:00.000Z",
    },
    {
      bill_id: 2,
      user_id: 1,
      name: "Water Bill",
      amount: 45.75,
      due_date: "2024-12-10T00:00:00.000Z",
      status: "paid",
      updated_at: "2024-11-20T12:00:00.000Z",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [error] = useState<string | null>(null);

  return { bills, loading, error };
};

export const BillsPage = () => {
  const { bills, loading, error } = useMockBills();
  const { t } = useTranslation();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedBill, setSelectedBill] = useState<any>(null);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleView = (bill: any) => {
    setSelectedBill(bill);
    setDrawerOpen(true);
  };

  const handleEdit = (bill: any) => {
    console.log(t("EDITING_BILL"), bill);
    setSnackbarOpen(true);
  };

  const handleDelete = (bill: any) => {
    console.log(t("DELETING_BILL"), bill);
    setSnackbarOpen(true);
  };

  const totalBills = bills.length;
  const totalPending = bills.filter((bill) => bill.status === "pending").length;
  const totalPaid = bills.filter((bill) => bill.status === "paid").length;
  const totalAmount = bills.reduce((sum, bill) => sum + bill.amount, 0);

  if (loading) return <Loader overlayVariant="transparent" />;
  if (error)
    return (
      <ErrorSnackbar
        message={t("ERROR_LOADING_BILLS")}
        open={true}
        autoHideDuration={5000}
      />
    );

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <PageHeader titleKey={t("BILLS_PAGE")} />

      {/* Resumen en tarjetas */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              textAlign: "center",
              position: "relative",
              ":hover": { boxShadow: 6, transform: "scale(1.05)" },
              transition: "all 0.3s ease",
            }}
          >
            <Paid fontSize="large" color="primary" />
            <Typography variant="h6">{t("TOTAL_BILLS")}</Typography>
            <Typography variant="h4">{totalBills}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              textAlign: "center",
              ":hover": { boxShadow: 6, transform: "scale(1.05)" },
              transition: "all 0.3s ease",
            }}
          >
            <Pending fontSize="large" color="error" />
            <Typography variant="h6">{t("TOTAL_PENDING")}</Typography>
            <Typography variant="h4" color="error">
              {totalPending}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              textAlign: "center",
              ":hover": { boxShadow: 6, transform: "scale(1.05)" },
              transition: "all 0.3s ease",
            }}
          >
            <Paid fontSize="large" color="success" />
            <Typography variant="h6">{t("TOTAL_PAID")}</Typography>
            <Typography variant="h4" color="success">
              {totalPaid}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              textAlign: "center",
              ":hover": { boxShadow: 6, transform: "scale(1.05)" },
              transition: "all 0.3s ease",
            }}
          >
            <AttachMoney fontSize="large" color="secondary" />
            <Typography variant="h6">{t("TOTAL_AMOUNT")}</Typography>
            <Typography variant="h4">${totalAmount.toFixed(2)}</Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Botón para agregar nueva factura */}
      <Box display="flex" justifyContent="flex-end" sx={{ mb: 3 }}>
        <ButtonComponent
          label={t("CREATE_BILL")}
          color="primary"
          variant="contained"
          size="large"
          startIcon={<Add />}
          onClick={() => console.log(t("CREATE_BILL_CLICK"))}
        />
      </Box>

      {/* Tabla de facturas */}
      <Box sx={{ p: 2 }}>
        <TableComponent<any>
          rows={bills}
          columnOrder={["bill_id", "name", "amount", "status"]}
          handleView={handleView}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      </Box>

      {/* Drawer para mostrar detalles */}
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 350, p: 3 }}>
          <Typography variant="h5">{t("BILL_DETAILS")}</Typography>
          {selectedBill ? (
            <>
              <Typography variant="body1">
                {t("NAME")}: {selectedBill.name}
              </Typography>
              <Typography variant="body1">
                {t("AMOUNT")}: ${selectedBill.amount.toFixed(2)}
              </Typography>
              <Typography variant="body1">
                {t("STATUS")}: {selectedBill.status}
              </Typography>
              <Typography variant="body1">
                {t("DUE_DATE")}: {new Date(selectedBill.due_date).toLocaleDateString()}
              </Typography>
            </>
          ) : (
            <Typography>{t("NO_DETAILS_AVAILABLE")}</Typography>
          )}
        </Box>
      </Drawer>

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