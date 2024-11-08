import { useState } from "react";
import { Box } from "@mui/material";
import TableComponent from "../../components/Table";
import { GetAllUser, useGetAllUsers } from "../../services/users/getAllUsers.service";
import Loader from "../../components/Loader";
import ErrorSnackbar from "../../components/ErrorSnackbar";
import PageHeader from "../../components/PageHeader";

export const UsersPage = () => {
  const { users, loading, error } = useGetAllUsers();
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const FeatureNotAvailable = () => {
    setSnackbarOpen(true);
  };

  const handleView = (user: GetAllUser) => {
    console.log("Viewing user:", user);
    FeatureNotAvailable();
  };

  const handleEdit = (user: GetAllUser) => {
    console.log("Editing user:", user);
    FeatureNotAvailable();
  };

  const handleDelete = (user: GetAllUser) => {
    console.log("Deleting user:", user);
    FeatureNotAvailable();
  };

  if (loading) return <Loader overlayVariant="transparent" />;
  if (error) return <ErrorSnackbar message={error} open={true} autoHideDuration={5000} />;

  return (
    <>
      <PageHeader titleKey="Users Page" />

      <Box sx={{ p: 2 }}>
        <TableComponent<GetAllUser>
          rows={users}
          columnOrder={[
            "user_id",
            "first_name",
            "first_surname",
            "email",
            "birthdate",
            "userRoles",
          ]}
          handleView={handleView}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      </Box>

      <ErrorSnackbar
        message="Feature not currently available, please try again in future updates"
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        autoHideDuration={5000}
        severity="info"
      />
    </>
  );
};
