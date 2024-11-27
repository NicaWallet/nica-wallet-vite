import { useEffect, useState } from "react";
import { Box, Typography, Container, Avatar, Paper } from "@mui/material";
import TableComponent from "../../components/TableComponent";
import Loader from "../../components/Loader";
import ErrorSnackbar from "../../components/ErrorSnackbar";
import PageHeader from "../../components/PageHeader";
import CardComponent from "../../components/CardComponent";
import DeleteConfirmationModal from "../../components/DeleteConfirmationModal";
import { useTranslation } from "react-i18next";
import { Category, BarChart } from "@mui/icons-material";
import { getAllCategories } from "../../services/categories/getAllCategories.service";
import { ICategory } from "../../types/Transactions/Categories/categories.types";
import ActionButton from "../../components/ActionButton";

export const CategoryPage = () => {
  const { t } = useTranslation();
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getAllCategories();

        // Validar que los datos sean válidos
        if (!Array.isArray(data)) {
          console.error("Invalid data format received:", data);
          setError(t("ERROR_INVALID_DATA"));
          return;
        }

        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError(t("ERROR_FETCHING_CATEGORIES"));
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [t]);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleView = (category: ICategory) => {
    console.log(t("VIEWING_CATEGORY"), category);
    setSnackbarOpen(true);
  };

  const handleEdit = (category: ICategory) => {
    console.log(t("EDITING_CATEGORY"), category);
    setSnackbarOpen(true);
  };

  const handleDelete = (category: ICategory) => {
    setSelectedCategoryId(category.category_id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    console.log(t("DELETING_CATEGORY_ID"), selectedCategoryId);
    setIsDeleteModalOpen(false);
    setSnackbarOpen(true);
  };

  if (loading) return <Loader overlayVariant="transparent" />;

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h5" color="error" align="center">
          {error}
        </Typography>
      </Container>
    );
  }

  return (
    <>
      <PageHeader titleKey={t("CATEGORY_PAGE")} />

      {/* Summary Section */}
      <Box
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        gap={4}
        mb={4}
        p={6}
      >
        <CardComponent
          title={t("TOTAL_CATEGORIES")}
          description={t("SUMMARY_OF_CATEGORIES")}
          customBody={
            <Paper
              sx={{
                p: 2,
                background: "linear-gradient(135deg, #3498db, #2ecc71)",
                borderRadius: 3,
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                boxShadow: 3,
              }}
            >
              <Box display="flex" alignItems="center" gap={2}>
                <Avatar
                  sx={{
                    bgcolor: "rgba(255, 255, 255, 0.3)",
                    color: "white",
                    width: 56,
                    height: 56,
                  }}
                >
                  <Category />
                </Avatar>
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                  {categories.length}
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ opacity: 0.8, mt: 1 }}>
                {t("CATEGORIES_DESC_SHORT")}
              </Typography>
            </Paper>
          }
        />
        <CardComponent
          title={t("STATISTICS")}
          description={t("CATEGORIES_STATISTICS")}
          customBody={
            <Paper
              sx={{
                p: 2,
                background: "linear-gradient(135deg, #8e44ad, #9b59b6)",
                borderRadius: 3,
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
              elevation={3}
            >
              <Box display="flex" alignItems="center" gap={2}>
                <Avatar
                  sx={{
                    bgcolor: "rgba(255, 255, 255, 0.3)",
                    color: "white",
                    width: 56,
                    height: 56,
                  }}
                >
                  <BarChart />
                </Avatar>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {t("COMING_SOON")}
                </Typography>
              </Box>
            </Paper>
          }
        />
      </Box>

      <ActionButton
        label={"CREATE_CATEGORY"}
        color="secondary"
        variant="outlined"
        onClick={() => {}}
        isLoading={false}
        iconType="add"
      />

      {/* Categories Table */}
      <TableComponent<ICategory>
        rows={categories}
        columnOrder={["category_id", "name", "created_at", "updated_at"]}
        handleView={handleView}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        sx={{ px: 4, pb: 4 }}
      />

      {/* Snackbar */}
      <ErrorSnackbar
        message={t("OPERATION_SUCCESSFUL")}
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        autoHideDuration={5000}
        severity="info"
      />

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <DeleteConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </>
  );
};
