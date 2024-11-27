import { useState, useEffect } from "react";
import TableComponent from "../../components/TableComponent";
import Loader from "../../components/Loader";
import ErrorSnackbar from "../../components/ErrorSnackbar";
import PageHeader from "../../components/PageHeader";
import { useTranslation } from "react-i18next";
import ActionButton from "../../components/ActionButton";

interface Classification {
  classification_id: number;
  name: string;
  created_at: string;
  updated_at: string;
  [key: string]: unknown;
}

// Simulación de obtención de clasificaciones (reemplazar con tu servicio real)
const useMockClassifications = () => {
  const [classifications] = useState<Classification[]>([
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
  const [, setSelectedClassification] = useState<Classification | null>(null);
  const { t } = useTranslation();

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleView = (classification: Classification) => {
    setSelectedClassification(classification);
  };

  const handleDelete = (classification: Classification) => {
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
    <>
      <PageHeader titleKey="CLASSIFICATION_PAGE" />

      <ActionButton
        label={"CREATE_CLASSIFICATION"}
        color="secondary"
        variant="outlined"
        onClick={() => {}}
        isLoading={false}
        iconType="add"
      />

      <TableComponent<Classification>
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
        sx={{ p: 4 }}
      />

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
