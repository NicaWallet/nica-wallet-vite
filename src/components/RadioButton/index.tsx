import React from "react";
import { Radio, FormControlLabel, SxProps, Theme } from "@mui/material";

export interface RadioButtonComponentProps {
  label: string;
  value: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  color?: "primary" | "secondary" | "error" | "info" | "success" | "warning";
  size?: "small" | "medium";
  disabled?: boolean;
  variant?: "default" | "compact" | "outlined";
  sx?: SxProps<Theme>;
}

/**
 * RadioButtonComponent is a functional component that renders a radio button with customizable label, color, and styles.
 *
 * @param {RadioButtonComponentProps} props - The properties for the component.
 * @param {string} props.label - The label for the radio button.
 * @param {string} props.value - The value of the radio button.
 * @param {boolean} props.checked - Whether the radio button is checked.
 * @param {function} props.onChange - The function to call when the radio button state changes.
 * @param {string} [props.color="primary"] - The color of the radio button.
 * @param {string} [props.size="medium"] - The size of the radio button.
 * @param {boolean} [props.disabled=false] - Whether the radio button is disabled.
 * @param {string} [props.variant="default"] - The variant style of the radio button.
 * @param {object} [props.sx={}] - Additional custom styles for the radio button.
 * @returns {JSX.Element} The rendered RadioButtonComponent.
 */
const RadioButtonComponent: React.FC<RadioButtonComponentProps> = ({
  label,
  value,
  checked,
  onChange,
  color = "primary",
  size = "medium",
  disabled = false,
  variant = "default",
  sx = {},
}) => {
  const variantStyles = {
    default: {
      m: 1,
    },
    compact: {
      m: 0.5,
      "& .MuiFormControlLabel-label": {
        fontSize: "0.875rem",
      },
    },
    outlined: {
      border: "1px solid",
      borderColor: "divider",
      borderRadius: 2,
      p: 1,
      m: 1,
    },
  };

  return (
    <FormControlLabel
      control={
        <Radio
          checked={checked}
          onChange={onChange}
          value={value}
          color={color}
          size={size}
          disabled={disabled}
          sx={{ ...variantStyles[variant], ...sx }}
        />
      }
      label={label}
    />
  );
};

export default RadioButtonComponent;
