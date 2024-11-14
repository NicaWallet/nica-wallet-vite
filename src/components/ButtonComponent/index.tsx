import React from "react";
import { Button as MuiButton, CircularProgress, SxProps } from "@mui/material";

export interface ButtonProps {
  label: string;
  onClick: () => void;
  type?: "button" | "submit" | "reset";
  color?: "primary" | "secondary" | "error" | "warning";
  variant?: "contained" | "outlined" | "text";
  size?: "small" | "medium" | "large";
  isLoading?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  SxProps?: SxProps;
}

/**
 * ButtonComponent is a reusable button component built with Material-UI's Button.
 * It supports various props to customize its behavior and appearance.
 *
 * @param {string} label - The text to display inside the button.
 * @param {() => void} onClick - The function to call when the button is clicked.
 * @param {string} [type="button"] - The type attribute for the button element.
 * @param {string} [color="primary"] - The color of the button. Can be "primary", "secondary", etc.
 * @param {string} [variant="contained"] - The variant of the button. Can be "contained", "outlined", etc.
 * @param {string} [size="medium"] - The size of the button. Can be "small", "medium", or "large".
 * @param {boolean} [isLoading=false] - If true, the button will show a loading spinner and be disabled.
 * @param {React.ReactNode} [startIcon] - The icon to display at the start of the button.
 * @param {React.ReactNode} [endIcon] - The icon to display at the end of the button.
 * @param {object} [SxProps] - The sx prop for styling the button using the system.
 *
 * @returns {JSX.Element} The rendered button component.
 */
const ButtonComponent: React.FC<ButtonProps> = ({
  label,
  onClick,
  type = "button",
  color = "primary",
  variant = "contained",
  size = "medium",
  isLoading = false,
  startIcon,
  endIcon,
  SxProps,
}) => {
  return (
    <MuiButton
      type={type}
      variant={variant}
      color={color}
      size={size}
      onClick={onClick}
      startIcon={isLoading ? <CircularProgress size={20} /> : startIcon}
      endIcon={!isLoading ? endIcon : null}
      disabled={isLoading}
      sx={SxProps}
    >
      {!isLoading ? label : ""}
    </MuiButton>
  );
};

export default ButtonComponent;