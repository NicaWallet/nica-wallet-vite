import React, { useState } from "react";
import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Switch,
    TextField,
    Button,
    SelectChangeEvent,
} from "@mui/material";
import ErrorSnackbar from "../../components/ErrorSnackbar";
import PageHeader from "../../components/PageHeader";

const SettingsPage: React.FC = () => {
    const [language, setLanguage] = useState("en");
    const [darkMode, setDarkMode] = useState(false);
    const [emailNotifications, setEmailNotifications] = useState(false);
    const [twoFactorAuth] = useState(false);
    const [spendingLimit, setSpendingLimit] = useState("");

    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const handleLanguageChange = (event: SelectChangeEvent<string>) => {
        setLanguage(event.target.value as string);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const handleFeatureUnavailable = () => {
        setSnackbarOpen(true); // Muestra el Snackbar cuando se llama a esta función
    };

    return (
        <>
            <PageHeader titleKey="SETTINGS" />

            <Grid container spacing={4}>
                {/* Preferencias Generales */}
                <Grid item xs={12} md={6}>
                    <Card
                        sx={{
                            borderRadius: "16px",
                            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                            backgroundColor: "#ffffff",
                            transition: "transform 0.2s ease-in-out",
                            "&:hover": {
                                transform: "scale(1.02)",
                                boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.15)",
                            },
                        }}
                    >
                        <CardContent>
                            <Typography
                                variant="h5"
                                fontWeight="bold"
                                gutterBottom
                                sx={{ textAlign: "center" }}
                            >
                                General Preferences
                            </Typography>
                            <FormControl fullWidth margin="normal">
                                <InputLabel>Language</InputLabel>
                                <Select
                                    value={language}
                                    onChange={handleLanguageChange}
                                >
                                    <MenuItem value="en">English</MenuItem>
                                    <MenuItem value="es">Spanish</MenuItem>
                                    <MenuItem value="fr">French</MenuItem>
                                </Select>
                            </FormControl>
                            <Box
                                display="flex"
                                alignItems="center"
                                justifyContent="space-between"
                                marginTop={3}
                            >
                                <Typography>Dark Mode</Typography>
                                <Switch
                                    checked={darkMode}
                                    onChange={() => setDarkMode(!darkMode)}
                                />
                            </Box>
                            <Box
                                display="flex"
                                alignItems="center"
                                justifyContent="space-between"
                                marginTop={3}
                            >
                                <Typography>Email Notifications</Typography>
                                <Switch
                                    checked={emailNotifications}
                                    onChange={() => setEmailNotifications(!emailNotifications)}
                                />
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Seguridad */}
                <Grid item xs={12} md={6}>
                    <Card
                        sx={{
                            borderRadius: "16px",
                            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                            backgroundColor: "#ffffff",
                            transition: "transform 0.2s ease-in-out",
                            "&:hover": {
                                transform: "scale(1.02)",
                                boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.15)",
                            },
                        }}
                    >
                        <CardContent>
                            <Typography
                                variant="h5"
                                fontWeight="bold"
                                gutterBottom
                                sx={{ textAlign: "center" }}
                            >
                                Security
                            </Typography>
                            <TextField
                                fullWidth
                                type="password"
                                label="Change Password"
                                margin="normal"
                                variant="outlined"
                            />
                            <Box
                                display="flex"
                                alignItems="center"
                                justifyContent="space-between"
                                marginTop={3}
                            >
                                <Typography>Two-Factor Authentication</Typography>
                                <Switch
                                    checked={twoFactorAuth}
                                    onChange={handleFeatureUnavailable} // Muestra el Snackbar si no está disponible
                                />
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Opciones Avanzadas */}
                <Grid item xs={12}>
                    <Card
                        sx={{
                            borderRadius: "16px",
                            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                            backgroundColor: "#ffffff",
                            transition: "transform 0.2s ease-in-out",
                            "&:hover": {
                                transform: "scale(1.02)",
                                boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.15)",
                            },
                        }}
                    >
                        <CardContent>
                            <Typography
                                variant="h5"
                                fontWeight="bold"
                                gutterBottom
                                sx={{ textAlign: "center" }}
                            >
                                Advanced Settings
                            </Typography>
                            <Typography
                                variant="body2"
                                color="textSecondary"
                                sx={{ textAlign: "center", marginBottom: "16px" }}
                            >
                                Configure alerts for automatic spending or income limits.
                            </Typography>
                            <TextField
                                fullWidth
                                type="number"
                                label="Spending Limit ($)"
                                value={spendingLimit}
                                onChange={(e) => setSpendingLimit(e.target.value)}
                                margin="normal"
                                variant="outlined"
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{
                                    marginTop: "16px",
                                    display: "block",
                                    width: "50%",
                                    marginLeft: "auto",
                                    marginRight: "auto",
                                }}
                                onClick={handleFeatureUnavailable} // Muestra el Snackbar si no está disponible
                            >
                                Save Changes
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Snackbar para características no disponibles */}
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

export default SettingsPage;
