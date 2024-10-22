import React from "react";
import { Button as MuiButton, CircularProgress, SxProps } from "@mui/material";

export interface ButtonProps {
  label: string;
  onClick: () => void;
  color?: "primary" | "secondary" | "error" | "warning";
  variant?: "contained" | "outlined" | "text";
  size?: "small" | "medium" | "large";
  isLoading?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  SxProps?: SxProps;
}

/**
 * Button component that wraps the Material-UI Button with additional props.
 *
 * @param {string} label - The text to display inside the button.
 * @param {() => void} onClick - The function to call when the button is clicked.
 * @param {string} [color="primary"] - The color of the button. Defaults to "primary".
 * @param {string} [variant="contained"] - The variant of the button. Defaults to "contained".
 * @param {string} [size="medium"] - The size of the button. Defaults to "medium".
 * @param {boolean} [isLoading=false] - If true, shows a loading spinner inside the button and disables it. Defaults to false.
 * @param {React.ReactNode} [startIcon] - The icon to display at the start of the button.
 * @param {React.ReactNode} [endIcon] - The icon to display at the end of the button.
 *
 * @returns {JSX.Element} The rendered button component.
 */
const ButtonComponent: React.FC<ButtonProps> = ({
  label,
  onClick,
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
