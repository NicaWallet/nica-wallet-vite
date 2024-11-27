import React, { useState } from "react";
import {
    Box,
    Typography,
    Card,
    Switch,
    Divider,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Grid,
} from "@mui/material";
import { WarningAmber, DeviceUnknown } from "@mui/icons-material";
import PageHeader from "../../components/PageHeader";
import TableComponent from "../../components/TableComponent";
import ErrorSnackbar from "../../components/ErrorSnackbar";

interface Session {
    session_id: number;
    device: string;
    ip: string;
    location: string;
    start_time: string;
    end_time?: string;
    [key: string]: string | number | undefined;
}

const mockSessions: Session[] = [
    {
        session_id: 1,
        device: "Windows PC",
        ip: "192.168.1.1",
        location: "Managua, Nicaragua",
        start_time: "2024-11-20 10:00:00",
        end_time: undefined, // Sesión activa
    },
    {
        session_id: 2,
        device: "Android Phone",
        ip: "192.168.1.2",
        location: "Granada, Nicaragua",
        start_time: "2024-11-19 14:30:00",
        end_time: "2024-11-19 15:45:00",
    },
];

export const SecurityPage: React.FC = () => {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [alertsEnabled, setAlertsEnabled] = useState({
        failedLogin: true,
        newDevice: false,
    });

    const handleSnackbarClose = () => setSnackbarOpen(false);

    const handleViewDetails = (session: Session) => {
        console.log("View Session Details:", session);
        setSnackbarOpen(true);
    };

    const handleDeleteSession = (session: Session) => {
        console.log("Delete Session:", session);
        setSnackbarOpen(true);
    };

    const handleToggleAlert = (type: keyof typeof alertsEnabled) => {
        setAlertsEnabled((prev) => ({
            ...prev,
            [type]: !prev[type],
        }));
    };

    return (
        <>
            <PageHeader titleKey="Security Settings" />

            {/* Security Alerts Configuration */}
            <Box mb={4}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Security Alerts Configuration
                </Typography>
                <Grid container spacing={3}>
                    {[
                        { label: "Failed Login Attempts", type: "failedLogin" as keyof typeof alertsEnabled },
                        { label: "Access from New Devices", type: "newDevice" as keyof typeof alertsEnabled },
                    ].map((alert) => (
                        <Grid item xs={12} md={6} key={alert.type}>
                            <Card sx={{ padding: 2 }}>
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="space-between"
                                >
                                    <Typography>{alert.label}</Typography>
                                    <Switch
                                        checked={alertsEnabled[alert.type]}
                                        onChange={() => handleToggleAlert(alert.type)}
                                    />
                                </Box>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            <Divider sx={{ my: 4 }} />

            {/* Suspicious Activities */}
            <Box sx={{ gap: 4 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Recent Suspicious Activities
                </Typography>
                <Card sx={{ padding: 2, gap: 2 }}>
                    <List>
                        {[
                            {
                                icon: <WarningAmber color="warning" />,
                                text: "Login attempt from unknown device in Managua.",
                            },
                            {
                                icon: <DeviceUnknown color="error" />,
                                text: "Multiple failed login attempts detected.",
                            },
                        ].map((activity, index) => (
                            <ListItem key={index}>
                                <ListItemIcon>{activity.icon}</ListItemIcon>
                                <ListItemText primary={activity.text} />
                            </ListItem>
                        ))}
                    </List>
                </Card>
            </Box>

            {/* Active and Past Sessions */}
            <Box mt={4}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Active and Past Sessions
                </Typography>
                <TableComponent<Session>
                    rows={mockSessions}
                    columnOrder={["device", "ip", "location", "start_time", "end_time"]}
                    handleView={handleViewDetails}
                    handleDelete={handleDeleteSession}
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
