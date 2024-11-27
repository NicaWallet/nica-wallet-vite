import { useState } from "react";
import { Box, Typography, Paper } from "@mui/material";
import TableComponent from "../../components/TableComponent";
import Loader from "../../components/Loader";
import ErrorSnackbar from "../../components/ErrorSnackbar";
import PageHeader from "../../components/PageHeader";
import { useTranslation } from "react-i18next";
import { Paid, Pending, AttachMoney } from "@mui/icons-material";
import ActionButton from "../../components/ActionButton";

interface Bill {
  bill_id: number;
  user_id: number;
  name: string;
  amount: number;
  due_date: string;
  status: string;
  updated_at: string;
  [key: string]: unknown;
}

const useMockBills = () => {
  const [bills] = useState<Bill[]>([
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
  const [loading] = useState(false);
  const [error] = useState<string | null>(null);

  return { bills, loading, error };
};

export const BillsPage = () => {
  const { bills, loading, error } = useMockBills();
  const { t } = useTranslation();
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleView = (bill: Bill) => {
    console.log(t("VIEWING_BILL"), bill);
    setSnackbarOpen(true);
  };

  const handleEdit = (bill: Bill) => {
    console.log(t("EDITING_BILL"), bill);
    setSnackbarOpen(true);
  };

  const handleDelete = (bill: Bill) => {
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
    <>
      <PageHeader titleKey={t("BILLS_PAGE")} />

      <Box
        display="flex"
        justifyContent="space-between"
        flexWrap="wrap"
        sx={{ mb: 4 }}
      >
        <Box
          component={Paper}
          elevation={1}
          sx={{
            p: 2,
            textAlign: "center",
            flex: "1 1 21%",
            m: 1,
          }}
        >
          <Paid fontSize="large" color="primary" />
          <Typography variant="h6">{t("TOTAL_BILLS")}</Typography>
          <Typography variant="h4">{totalBills}</Typography>
        </Box>
        <Box
          component={Paper}
          elevation={1}
          sx={{
            p: 2,
            textAlign: "center",
            flex: "1 1 21%",
            m: 1,
          }}
        >
          <Pending fontSize="large" color="error" />
          <Typography variant="h6">{t("TOTAL_PENDING")}</Typography>
          <Typography variant="h4" color="error">
            {totalPending}
          </Typography>
        </Box>
        <Box
          component={Paper}
          elevation={1}
          sx={{
            p: 2,
            textAlign: "center",
            flex: "1 1 21%",
            m: 1,
          }}
        >
          <Paid fontSize="large" color="success" />
          <Typography variant="h6">{t("TOTAL_PAID")}</Typography>
          <Typography variant="h4" color="success">
            {totalPaid}
          </Typography>
        </Box>
        <Box
          component={Paper}
          elevation={1}
          sx={{
            p: 2,
            textAlign: "center",
            flex: "1 1 21%",
            m: 1,
          }}
        >
          <AttachMoney fontSize="large" color="secondary" />
          <Typography variant="h6">{t("TOTAL_AMOUNT")}</Typography>
          <Typography variant="h4">${totalAmount.toFixed(2)}</Typography>
        </Box>
      </Box>

      <ActionButton
        label={"CREATE_BILL"}
        color="secondary"
        variant="outlined"
        onClick={() => console.log(t("CREATE_BILL_CLICK"))}
        isLoading={false}
        iconType="add"
      />

      {/* Tabla de facturas */}
      <Box sx={{ p: 2 }}>
        <TableComponent<Bill>
          rows={bills}
          columnOrder={["bill_id", "name", "amount", "status"]}
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
