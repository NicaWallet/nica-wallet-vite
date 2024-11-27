import React, { useState } from "react";
import {
    Box,
    Typography,
    Grid,
    Card,
    TextField,
    Button,
    CircularProgress,
    Alert,
} from "@mui/material";
import { HelpOutline, Link as LinkIcon } from "@mui/icons-material";
import PageHeader from "../../components/PageHeader";

export const SupportPage = () => {
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleFormSubmit = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setSuccessMessage("Your message has been sent successfully!");
            setForm({ name: "", email: "", message: "" });
        }, 2000);
    };

    return (
        <>
            <PageHeader titleKey="Support" />

            {/* Sección de Ayuda Rápida */}
            <Box mb={6} sx={{
                paddingX: 6,
            }}>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                    Quick Help
                </Typography>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                        <Card
                            sx={{
                                borderRadius: 2,
                                padding: 3,
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                            }}
                        >
                            <HelpOutline sx={{ fontSize: 40, color: "#1976d2" }} />
                            <Box>
                                <Typography variant="h6" fontWeight="bold">
                                    Frequently Asked Questions
                                </Typography>
                                <Typography variant="body2" color="textSecondary" gutterBottom>
                                    Find answers to common questions about using the platform.
                                </Typography>
                                <Button
                                    variant="contained"
                                    size="small"
                                    onClick={() => console.log("Navigating to FAQ")}
                                >
                                    View FAQs
                                </Button>
                            </Box>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Card
                            sx={{
                                borderRadius: 2,
                                padding: 3,
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                            }}
                        >
                            <LinkIcon sx={{ fontSize: 40, color: "#1976d2" }} />
                            <Box>
                                <Typography variant="h6" fontWeight="bold">
                                    Useful Links
                                </Typography>
                                <Typography variant="body2" color="textSecondary" gutterBottom>
                                    Access guides, tutorials, and documentation.
                                </Typography>
                                <Button
                                    variant="contained"
                                    size="small"
                                    onClick={() => console.log("Navigating to Resources")}
                                >
                                    View Resources
                                </Button>
                            </Box>
                        </Card>
                    </Grid>
                </Grid>
            </Box >

            {/* Formulario de Contacto */}
            < Box sx={{
                backgroundColor: "#f5f5f5",
                borderRadius: 2,
                paddingX: 6,
                paddingBottom: 6,
                marginBottom: 6,
            }
            }>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                    Contact Us
                </Typography>
                <Card sx={{ borderRadius: 2, padding: 4 }}>
                    <Box component="form" noValidate autoComplete="off">
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Your Name"
                                    name="name"
                                    value={form.name}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Your Email"
                                    name="email"
                                    type="email"
                                    value={form.email}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Your Message"
                                    name="message"
                                    value={form.message}
                                    onChange={handleInputChange}
                                    multiline
                                    rows={4}
                                    variant="outlined"
                                />
                            </Grid>
                        </Grid>
                        <Box mt={3}>
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                onClick={handleFormSubmit}
                                disabled={loading}
                                sx={{ padding: 1.5 }}
                            >
                                {loading ? <CircularProgress size={24} /> : "Send Message"}
                            </Button>
                        </Box>
                    </Box>
                </Card>
                {
                    successMessage && (
                        <Alert severity="success" sx={{ mt: 3 }}>
                            {successMessage}
                        </Alert>
                    )
                }
            </ Box >
        </>
    );
};
