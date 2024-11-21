import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, IconButton, Typography, Breadcrumbs, Link } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useTranslation } from "react-i18next";

export interface PageHeaderProps {
    titleKey: string;
    subtitleKey?: string;
    detailKey?: string;
    containerWidthPercent?: number;
}

const PageHeader: React.FC<PageHeaderProps> = ({ titleKey, subtitleKey, detailKey, containerWidthPercent }) => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const location = useLocation();

    const handleBackClick = () => {
        navigate(-1);
    };

    // Generar breadcrumbs basados en la ubicación actual
    const pathnames = location.pathname.split("/").filter((x) => x);

    // Función para transformar el nombre de la ruta al formato de traducción
    const transformRouteToTranslationKey = (route: string) => {
        return route.replace(/-/g, "_").toUpperCase(); // Reemplaza guion por guion bajo y convierte a mayúsculas
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                mx: "auto",
                px: 2,
                py: 3,
                width: containerWidthPercent ? `${containerWidthPercent}%` : "100%",
            }}
        >
            {/* Navegación hacia atrás */}
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    flexWrap: "nowrap",
                    width: "100%",
                }}
            >
                <IconButton onClick={handleBackClick} sx={{ color: "text.primary", mr: 1 }}>
                    <KeyboardBackspaceIcon fontSize="medium" />
                </IconButton>
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: "bold",
                        color: "text.secondary",
                        overflowWrap: "break-word",
                        lineHeight: 1.2,
                        flexGrow: 1,
                        minWidth: 0,
                    }}
                >
                    {t(titleKey)}
                </Typography>
            </Box>

            {/* Breadcrumbs */}
            <Breadcrumbs
                aria-label="breadcrumb"
                sx={{
                    mt: 1,
                    mb: 2,
                    color: "text.secondary",
                }}
            >
                {/* Redirigir "Inicio" siempre a "/welcome" */}
                <Link
                    underline="hover"
                    color="inherit"
                    onClick={() => navigate("/welcome")}
                    sx={{ cursor: "pointer" }}
                >
                    {t("HOME")}
                </Link>
                {pathnames.map((value, index) => {
                    const to = `/${pathnames.slice(0, index + 1).join("/")}`;

                    return index === pathnames.length - 1 ? (
                        <Typography key={to} color="text.primary">
                            {t(transformRouteToTranslationKey(value))}
                        </Typography>
                    ) : (
                        <Link
                            underline="hover"
                            color="inherit"
                            onClick={() => navigate(to)}
                            key={to}
                            sx={{ cursor: "pointer" }}
                        >
                            {t(transformRouteToTranslationKey(value))}
                        </Link>
                    );
                })}
            </Breadcrumbs>

            {/* Subtítulo */}
            {subtitleKey && (
                <Typography
                    variant="subtitle1"
                    sx={{
                        color: "text.primary",
                        fontSize: "1.1rem",
                        mt: 1,
                        lineHeight: 1.4,
                        wordWrap: "break-word",
                    }}
                >
                    {t(subtitleKey)}
                </Typography>
            )}

            {/* Detalles */}
            {detailKey && (
                <Typography
                    variant="body2"
                    sx={{
                        color: "text.disabled",
                        mt: 0.5,
                        lineHeight: 1.4,
                        wordWrap: "break-word",
                    }}
                >
                    {t(detailKey)}
                </Typography>
            )}
        </Box>
    );
};

export default PageHeader;
