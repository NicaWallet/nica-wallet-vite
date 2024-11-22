import React, { useEffect, useState } from "react";
import {
    Box,
    Grid,
    Typography,
    Avatar,
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
    Repeat as RepeatIcon,
    LocationOn as LocationOnIcon,
    Edit as EditIcon,
    Lock as LockIcon,
    Logout as LogoutIcon,
    Timeline as TimelineIcon,
    Dashboard as DashboardIcon,
    Layers as LayersIcon,
    ListAlt as ListAltIcon,
    History as HistoryIcon,
} from "@mui/icons-material";

export const ProfilePage = () => {
    const [profileData, setProfileData] = useState<UserResponseDto | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const data = await getUserProfile();
                setProfileData(data);
            } catch (err) {
                console.error("Error fetching profile data:", err);
                setError("Failed to fetch profile data.");
            } finally {
                setLoading(false);
            }
        };

        fetchProfileData();
    }, []);

    if (loading) return <Loader overlayVariant="transparent" />;
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
                        <Avatar
                            alt={profileData?.first_name}
                            sx={{
                                width: 120,
                                height: 120,
                                bgcolor: "primary.main",
                                fontSize: "2.5rem",
                                textTransform: "uppercase",
                            }}
                        >
                            {profileData?.first_name[0]}
                        </Avatar>
                        <Box>
                            <Typography variant="h4" sx={{ mb: 1, fontWeight: "bold" }}>
                                {profileData?.first_name} {profileData?.first_surname}
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 1, color: "text.secondary" }}>
                                {profileData?.email}
                            </Typography>
                            <Typography variant="body2" sx={{ color: "text.secondary" }}>
                                Member since:{" "}
                                {new Date(profileData?.created_at || "").toLocaleDateString()}
                            </Typography>
                        </Box>
                    </Box>

                    {/* Stats Section */}
                    <Box sx={{ textAlign: "center", flex: 1, minWidth: "200px" }}>
                        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
                            Quick Stats
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
                            Total Resources:{" "}
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
                            Explore your resources below.
                        </Typography>
                    </Box>
                </Paper>

                {/* Quick Actions Section */}
                <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
                    Quick Actions
                </Typography>
                <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
                    <Button
                        variant="contained"
                        startIcon={<EditIcon />}
                        onClick={() => console.log("Edit Profile")}
                    >
                        Edit Profile
                    </Button>
                    <Button
                        variant="outlined"
                        startIcon={<LockIcon />}
                        onClick={() => console.log("Change Password")}
                    >
                        Change Password
                    </Button>
                    <Button
                        variant="outlined"
                        color="error"
                        startIcon={<LogoutIcon />}
                        onClick={() => console.log("Logout")}
                    >
                        Logout
                    </Button>
                </Stack>

                {/* Transactions Actions Section */}
                <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
                    Transactions Actions
                </Typography>
                <Grid container spacing={3} sx={{ mb: 4 }}>
                    {/* Transaction Overview */}
                    <Grid item xs={12} sm={6} md={4}>
                        <CardComponent
                            title="Transaction Overview"
                            description="Overview of all transactions"
                            icon={<DashboardIcon color="primary" fontSize="large" />}
                            onClick={() => console.log("Navigate to Transaction Overview")}
                        />
                    </Grid>

                    {/* Categories */}
                    <Grid item xs={12} sm={6} md={4}>
                        <CardComponent
                            title="Categories"
                            description="Manage transaction categories"
                            icon={<CategoryIcon color="secondary" fontSize="large" />}
                            onClick={() => console.log("Navigate to Categories")}
                        />
                    </Grid>

                    {/* Subcategories */}
                    <Grid item xs={12} sm={6} md={4}>
                        <CardComponent
                            title="Subcategories"
                            description="Manage transaction subcategories"
                            icon={<LayersIcon color="action" fontSize="large" />}
                            onClick={() => console.log("Navigate to Subcategories")}
                        />
                    </Grid>

                    {/* Classification */}
                    <Grid item xs={12} sm={6} md={4}>
                        <CardComponent
                            title="Classification"
                            description="Organize transactions by type"
                            icon={<ListAltIcon color="success" fontSize="large" />}
                            onClick={() => console.log("Navigate to Classification")}
                        />
                    </Grid>

                    {/* Transaction History */}
                    <Grid item xs={12} sm={6} md={4}>
                        <CardComponent
                            title="Transaction History"
                            description="View detailed transaction history"
                            icon={<HistoryIcon color="error" fontSize="large" />}
                            onClick={() => console.log("Navigate to Transaction History")}
                        />
                    </Grid>
                </Grid>

                {/* Resources Section */}
                <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
                    Your Resources
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
                            onClick={() => console.log("Navigate to budgets")}
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
                            onClick={() => console.log("Navigate to goals")}
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
                            onClick={() => console.log("Navigate to categories")}
                        />
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};
