import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, IconButton, Typography } from "@mui/material";
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

    const handleBackClick = () => {
        navigate(-1);
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
                        color: "text.secondary", // Menor intensidad
                        overflowWrap: "break-word",
                        lineHeight: 1.2,
                        flexGrow: 1,
                        minWidth: 0,
                    }}
                >
                    {t(titleKey)}
                </Typography>
            </Box>
            {subtitleKey && (
                <Typography
                    variant="subtitle1"
                    sx={{
                        color: "text.primary",
                        fontSize: "1.1rem", // Un poco más grande para diferenciarlo del detalle
                        mt: 1,
                        lineHeight: 1.4,
                        wordWrap: "break-word",
                    }}
                >
                    {t(subtitleKey)}
                </Typography>
            )}
            {detailKey && (
                <Typography
                    variant="body2"
                    sx={{
                        color: "text.disabled", // Color más suave para el detalle
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
