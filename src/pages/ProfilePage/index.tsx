import { useEffect, useState } from "react";
import {
    Box,
    Grid,
    Typography,
    Paper,
    Button,
    Stack,
} from "@mui/material";
import PageHeader from "../../components/PageHeader";
import CardComponent from "../../components/CardComponent";
import Loader from "../../components/Loader";
import ErrorSnackbar from "../../components/ErrorSnackbar";
import { UserResponseDto } from "../../types/user/user.types";
import { getUserProfile } from "../../services/users/getUserById.service";
import {
    AccountBalanceWallet as AccountBalanceWalletIcon,
    Flag as FlagIcon,
    Category as CategoryIcon,
    Edit as EditIcon,
    Lock as LockIcon,
    Logout as LogoutIcon,
    Dashboard as DashboardIcon,
    Layers as LayersIcon,
    ListAlt as ListAltIcon,
    History as HistoryIcon,
} from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import AvatarComponent from "../../components/AvatarComponent";
import { useNavigate } from "react-router-dom"
import Modal from "../../components/Modal";

export const ProfilePage = () => {
    const [profileData, setProfileData] = useState<UserResponseDto | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [openLogoutModal, setOpenLogoutModal] = useState(false);
    const [loggingOut, setLoggingOut] = useState(false); // Estado para el loader después de confirmar

    // Función para manejar el logout con loader
    const handleLogout = () => {
        setLoggingOut(true); // Activa el loader
        setTimeout(() => {
            localStorage.removeItem("token");
            navigate("/auth/login");
        }, 3000); // 3 segundos de retraso
    };

    const handleOpenLogoutModal = () => {
        setOpenLogoutModal(true);
    };

    const handleCloseLogoutModal = () => {
        setOpenLogoutModal(false);
    };

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const data = await getUserProfile();
                setProfileData(data);
            } catch (err) {
                console.error("Error fetching profile data:", err);
                setError(t("ERROR_FETCH_PROFILE"));
            } finally {
                setLoading(false);
            }
        };

        fetchProfileData();
    }, [t]);

    if (loading || loggingOut) return <Loader overlayVariant="transparent" />;
    if (error)
        return (
            <ErrorSnackbar
                message={error}
                open={true}
                onClose={() => setError(null)}
            />
        );

    return (
        <>
            <PageHeader titleKey="PROFILE_PAGE" />
            <Box
                sx={{
                    p: 3,
                    maxWidth: "1200px",
                    margin: "0 auto",
                }}
            >
                {/* User Info Section */}
                <Paper
                    elevation={3}
                    sx={{
                        p: 3,
                        mb: 4,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        gap: 3,
                    }}
                >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                        <AvatarComponent
                            alt={profileData?.first_name}
                            sx={{
                                width: 120,
                                height: 120,
                                bgcolor: "primary.main",
                                fontSize: "2.5rem",
                                textTransform: "uppercase",
                            }}
                            src={`https://i.pravatar.cc/150?u=${profileData?.email}`}

                        />
                        <Box>
                            <Typography variant="h4" sx={{ mb: 1, fontWeight: "bold" }}>
                                {profileData?.first_name} {profileData?.first_surname}
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 1, color: "text.secondary" }}>
                                {profileData?.email}
                            </Typography>
                            <Typography variant="body2" sx={{ color: "text.secondary" }}>
                                {t("MEMBER_SINCE")}
                                {new Date(profileData?.created_at || "").toLocaleDateString()}
                            </Typography>
                        </Box>
                    </Box>

                    {/* Stats Section */}
                    <Box sx={{ textAlign: "center", flex: 1, minWidth: "200px" }}>
                        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
                            {t("PROFILE_STATS")}
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                mt: 2,
                                p: 2,
                                borderRadius: 2,
                                backgroundColor: "primary.light",
                                color: "white",
                                display: "inline-block",
                                fontWeight: "bold",
                            }}
                        >
                            {t("TOTAL_RESOURCES")}{" "}
                            {(profileData?._count?.addresses || 0) +
                                (profileData?._count?.budgets || 0) +
                                (profileData?._count?.Category || 0) +
                                (profileData?._count?.goals || 0) +
                                (profileData?._count?.recurringTransactions || 0)}
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{ mt: 1, color: "text.secondary", fontStyle: "italic" }}
                        >
                            {t("TOTAL_TRANSACTIONS")} {profileData?._count?.transactions || 0}
                        </Typography>
                    </Box>
                </Paper>

                {/* Quick Actions Section */}
                <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
                    {t("QUICK_ACTIONS")}
                </Typography>
                <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
                    <Button
                        variant="contained"
                        startIcon={<EditIcon />}
                        onClick={() => navigate("/profile/edit")}
                    >
                        {t("EDIT_PROFILE")}
                    </Button>
                    <Button
                        variant="outlined"
                        startIcon={<LockIcon />}
                        onClick={() => navigate("/profile/change-password")}
                    >
                        {t("CHANGE_PASSWORD")}
                    </Button>
                    <Button
                        variant="outlined"
                        color="error"
                        startIcon={<LogoutIcon />}
                        onClick={handleOpenLogoutModal}
                    >
                        {t("LOGOUT")}
                    </Button>
                </Stack>

                {/* Transactions Actions Section */}
                <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
                    {t("TRANSACTIONS_ACTIONS")}
                </Typography>
                <Grid container spacing={3} sx={{ mb: 4 }}>
                    {/* Transaction Overview */}
                    <Grid item xs={12} sm={6} md={4}>
                        <CardComponent
                            title="Transaction Overview"
                            description="Overview of all transactions"
                            icon={<DashboardIcon color="primary" fontSize="large" />}
                            onClick={() => navigate("/transactions-overview")}
                        />
                    </Grid>

                    {/* Categories */}
                    <Grid item xs={12} sm={6} md={4}>
                        <CardComponent
                            title="Categories"
                            description="Manage transaction categories"
                            icon={<CategoryIcon color="secondary" fontSize="large" />}
                            onClick={() => navigate("/transactions-categories")}
                        />
                    </Grid>

                    {/* Subcategories */}
                    <Grid item xs={12} sm={6} md={4}>
                        <CardComponent
                            title="Subcategories"
                            description="Manage transaction subcategories"
                            icon={<LayersIcon color="action" fontSize="large" />}
                            onClick={() => navigate("/transactions-sub-categories")}
                        />
                    </Grid>

                    {/* Classification */}
                    <Grid item xs={12} sm={6} md={4}>
                        <CardComponent
                            title="Classification"
                            description="Organize transactions by type"
                            icon={<ListAltIcon color="success" fontSize="large" />}
                            onClick={() => navigate("/transactions-classification")}
                        />
                    </Grid>

                    {/* Transaction History */}
                    <Grid item xs={12} sm={6} md={4}>
                        <CardComponent
                            title="Transaction History"
                            description="View detailed transaction history"
                            icon={<HistoryIcon color="error" fontSize="large" />}
                            onClick={() => navigate("/transactions-history")}
                        />
                    </Grid>
                </Grid>

                {/* Resources Section */}
                <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
                    {t("RESOURCES")}
                </Typography>
                <Grid container spacing={3}>
                    {/* Budgets */}
                    <Grid item xs={12} sm={6} md={4}>
                        <CardComponent
                            title="Budgets"
                            description="Manage your budgets"
                            icon={<AccountBalanceWalletIcon color="primary" fontSize="large" />}
                            customBody={
                                <Typography variant="h4">
                                    {profileData?._count?.budgets || 0}
                                </Typography>
                            }
                            onClick={() => navigate("/budgets")}
                        />
                    </Grid>

                    {/* Goals */}
                    <Grid item xs={12} sm={6} md={4}>
                        <CardComponent
                            title="Goals"
                            description="Track your financial goals"
                            icon={<FlagIcon color="success" fontSize="large" />}
                            customBody={
                                <Typography variant="h4">
                                    {profileData?._count?.goals || 0}
                                </Typography>
                            }
                            onClick={() => navigate("/goals")}
                        />
                    </Grid>

                    {/* Categories */}
                    <Grid item xs={12} sm={6} md={4}>
                        <CardComponent
                            title="Categories"
                            description="Organize your transactions"
                            icon={<CategoryIcon color="secondary" fontSize="large" />}
                            customBody={
                                <Typography variant="h4">
                                    {profileData?._count?.Category || 0}
                                </Typography>
                            }
                            onClick={() => navigate("/transactions-categories")}
                        />
                    </Grid>
                </Grid>
            </Box>

            {/* Logout Confirmation Modal */}
            <Modal
                isOpen={openLogoutModal}
                onClose={handleCloseLogoutModal}
                onConfirm={handleLogout}
                title={t("LOGOUT_CONFIRMATION_TITLE")}
                modalContent={<Typography>{t("LOGOUT_CONFIRMATION_MESSAGE")}</Typography>}
                confirmText={t("LOGOUT")}
                cancelText={t("CANCEL")}
                variant="warning"
                open={false}
            />
        </>
    );
};
