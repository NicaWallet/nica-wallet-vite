import { useState, useEffect } from "react";
import { Box, Container} from "@mui/material";
import TableComponent from "../../components/TableComponent";
import Loader from "../../components/Loader";
import ErrorSnackbar from "../../components/ErrorSnackbar";
import PageHeader from "../../components/PageHeader";
import { useTranslation } from "react-i18next";
import ButtonComponent from "../../components/ButtonComponent";
import { Add } from "@mui/icons-material";

// Simulación de obtención de clasificaciones (reemplazar con tu servicio real)
const useMockClassifications = () => {
  const [classifications] = useState<any[]>([
    {
      classification_id: 36,
      name: "Updated Classification Name",
      created_at: "2024-10-02T16:31:12.820Z",
      updated_at: "2024-11-19T08:06:15.534Z",
    },
    // Agrega más clasificaciones si es necesario
  ]);
  const [loading, setLoading] = useState(false);
  const [error] = useState<string | null>(null);

  useEffect(() => {
    setLoading(false);
  }, []);

  return { classifications, loading, error };
};

export const ClassificationPage = () => {
  const { classifications, loading, error } = useMockClassifications();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [setSelectedClassification] = useState<
    any | null
  >(null);
  const { t } = useTranslation();

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleView = (classification: any) => {
    setSelectedClassification(classification);
  };

  const handleDelete = (classification: any) => {
    setSelectedClassification(classification);
  };

  if (loading) return <Loader overlayVariant="transparent" />;
  if (error)
    return (
      <ErrorSnackbar
        message={t("ERROR_LOADING_CLASSIFICATIONS")}
        open={true}
        autoHideDuration={5000}
      />
    );

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <PageHeader titleKey="CLASSIFICATION_PAGE" />

      <Box display="flex" justifyContent="flex-end" sx={{ p: 2 }}>
        <ButtonComponent
          label={t("CREATE_CLASSIFICATION")}
          color="primary"
          variant="outlined"
          size="medium"
          isLoading={false}
          startIcon={<Add />}
          SxProps={{ mb: 2, alignContent: "flex-end", display: "flex" }}
          onClick={() => {
            console.log("Create new classification");
          }}
        />
      </Box>

      <TableComponent<any>
        rows={classifications}
        columnOrder={[
            "classification_id",
            "name",
            "created_at",
            "updated_at",
            "subcategories",
        ]}
        handleView={handleView}
        handleDelete={handleDelete}
        sx={{ p: 2 }}
      />

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
