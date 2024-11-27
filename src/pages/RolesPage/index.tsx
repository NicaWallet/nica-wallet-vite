import { Box } from "@mui/material";
import ErrorSnackbar from "../../components/ErrorSnackbar";
import Loader from "../../components/Loader";
import PageHeader from "../../components/PageHeader";
import { IUserRoleResponse, useGetAllUsersRoles } from "../../services/user-roles/getAllUserRoles.service";
import TableComponent from "../../components/TableComponent";
import { useState } from "react";

export const RolesPage = () => {
    const { userRoles, loading, error } = useGetAllUsersRoles();
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const FeatureNotAvailable = () => {
        setSnackbarOpen(true);
    };

    const handleView = (userRole: IUserRoleResponse) => {
        console.log("Viewing user role:", userRole);
        FeatureNotAvailable();
    };

    const handleEdit = (userRole: IUserRoleResponse) => {
        console.log("Editing user role:", userRole);
        FeatureNotAvailable();
    };

    const handleDelete = (userRole: IUserRoleResponse) => {
        console.log("Deleting user role:", userRole);
        FeatureNotAvailable();
    };

    if (loading) return <Loader overlayVariant="transparent" />;
    if (error) return <ErrorSnackbar message={error} open={true} autoHideDuration={5000} />;

    // console.log("userRoles before tablecomponent", userRoles);

    return (
        <>
            <PageHeader titleKey="ROLES_PAGE" subtitleKey="ROLES_PAGE_SUBTITLE" />

            <Box sx={{ p: 2 }}>
                <TableComponent<IUserRoleResponse>
                    rows={userRoles}
                    columnOrder={
                        [
                            "user.user_id",
                            "role.role_name",
                            "user.first_name",
                            "user.middle_name",
                            "user.first_surname",
                            "user.email",
                            "user.created_at",
                        ]
                    }
                    variant="default"
                    rowsPerPage={5}
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
}