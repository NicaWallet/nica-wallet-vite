import React from "react";
import { Box, ButtonProps as MuiButtonProps, SxProps } from "@mui/material";
import ButtonComponent from "../ButtonComponent";
import { AddCircleOutline, Edit, Delete, Visibility } from "@mui/icons-material";

export interface ActionButtonProps extends Omit<MuiButtonProps, 'color'> {
    groupSx?: SxProps;
    isLoading?: boolean;
    label: string;
    color?: "primary" | "secondary" | "error" | "warning";
    alignment?: "flex-start" | "center" | "flex-end";
    onClick?: () => void;
    iconType?: "add" | "edit" | "delete" | "view" | "custom";
    customIcon?: React.ReactNode;
    iconPosition?: "start" | "end";
    variantType?: "success" | "warning" | "error" | "info";
}

const ActionButton: React.FC<ActionButtonProps> = ({
    label,
    onClick = () => { },
    type = "button",
    color = "primary",
    variant = "contained",
    size = "medium",
    isLoading = false,
    groupSx = { m: 4 },
    alignment = "flex-end",
    iconType,
    customIcon,
    iconPosition = "end",
    variantType,
}) => {
    const getIcon = () => {
        if (iconType === "custom" && customIcon) {
            return React.cloneElement(customIcon as React.ReactElement, { color });
        }
        switch (iconType) {
            case "add":
                return <AddCircleOutline />;
            case "edit":
                return <Edit />;
            case "delete":
                return <Delete />;
            case "view":
                return <Visibility />;
            default:
                return null;
        }
    };

    const getVariantStyles = () => {
        switch (variantType) {
            case "success":
                return { color: "success.main", backgroundColor: "success.light" };
            case "warning":
                return { color: "warning.main", backgroundColor: "warning.light" };
            case "error":
                return { color: "error.main", backgroundColor: "error.light" };
            case "info":
                return { color: "info.main", backgroundColor: "info.light" };
            default:
                return {};
        }
    };

    return (
        <Box display="flex" justifyContent={alignment} sx={groupSx}>
            <ButtonComponent
                label={label}
                onClick={onClick}
                type={type}
                color={variantType ? undefined : color}
                variant={variant}
                size={size}
                isLoading={isLoading}
                startIcon={iconPosition === "start" ? getIcon() : undefined}
                endIcon={iconPosition === "end" ? getIcon() : undefined}
                SxProps={getVariantStyles()}
            />
        </Box>
    );
};

export default ActionButton;
