import { useState, useEffect } from "react";
import { Box, Container } from "@mui/material";
import TableComponent from "../../components/TableComponent";
import Loader from "../../components/Loader";
import ErrorSnackbar from "../../components/ErrorSnackbar";
import PageHeader from "../../components/PageHeader";
import { useTranslation } from "react-i18next";
import ButtonComponent from "../../components/ButtonComponent";
import { Add } from "@mui/icons-material";

// Simulación de obtención de subcategorías (reemplazar con tu servicio real)
const useMockSubcategories = () => {
  const [subcategories, setSubcategories] = useState<any[]>([
    {
      subcategory_id: 37,
      name: "Movies",
      category_id: 37,
      user_id: null,
      created_at: "2024-10-02T16:31:12.481Z",
      updated_at: "2024-10-02T16:31:12.481Z",
      category: {
        category_id: 37,
        name: "Entertainment",
        user_id: 37,
        created_at: "2024-10-02T16:31:11.599Z",
        updated_at: "2024-10-02T16:31:11.599Z",
      },
    },
    {
      subcategory_id: 36,
      name: "Food",
      category_id: 67,
      user_id: null,
      created_at: "2024-10-02T16:31:11.938Z",
      updated_at: "2024-11-19T04:53:50.241Z",
      category: {
        category_id: 67,
        name: "Comida",
        user_id: null,
        created_at: "2024-11-19T04:53:50.241Z",
        updated_at: "2024-11-19T04:53:02.702Z",
      },
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [error] = useState<string | null>(null);

  useEffect(() => {
    // Preprocesar las subcategorías para agregar la columna "category_name"
    setSubcategories((prev) =>
      prev.map((item) => ({
        ...item,
        category_name: item.category.name,
      }))
    );
    setLoading(false);
  }, []);

  return { subcategories, loading, error };
};

export const SubcategoryPage = () => {
  const { subcategories, loading, error } = useMockSubcategories();
  const { t } = useTranslation();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const showMessage = (message: string) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleView = (subcategory: any) => {
    console.log(t("VIEWING_SUBCATEGORY"), subcategory);
    showMessage(`${t("VIEWING_SUBCATEGORY")}: ${subcategory.name}`);
  };

  const handleEdit = (subcategory: any) => {
    console.log(t("EDITING_SUBCATEGORY"), subcategory);
    showMessage(`${t("EDITING_SUBCATEGORY")}: ${subcategory.name}`);
  };

  const handleDelete = (subcategory: any) => {
    console.log(t("DELETING_SUBCATEGORY"), subcategory);
    showMessage(`${t("DELETING_SUBCATEGORY")}: ${subcategory.name}`);
  };

  if (loading) return <Loader overlayVariant="transparent" />;

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <PageHeader titleKey={t("SUBCATEGORY_PAGE")} />

      <Box display="flex" justifyContent="flex-end" sx={{ p: 2 }}>
        <ButtonComponent
          label={t("CREATE_SUBCATEGORY")}
          color="primary"
          variant="outlined"
          size="medium"
          isLoading={false}
          startIcon={<Add />}
          SxProps={{ mb: 2, alignContent: "flex-end", display: "flex" }}
          onClick={() => {
            showMessage(t("CREATE_SUBCATEGORY_CLICK"));
          }}
        />
      </Box>

      <Box sx={{ p: 2 }}>
        <TableComponent<any>
          rows={subcategories}
          columnOrder={[
            "name",
            "category.name", 
            "created_at",
            "updated_at",
          ]}
          handleView={handleView}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      </Box>

      <ErrorSnackbar
        message={snackbarMessage}
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        autoHideDuration={5000}
        severity="info"
      />
    </Container>
  );
};
