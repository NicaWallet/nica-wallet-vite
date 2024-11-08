import React, { useState, useEffect } from "react";
import {
  TextField,
  TextFieldProps,
  InputAdornment,
  IconButton,
  SxProps,
  Theme,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export interface InputFieldProps
  extends Omit<TextFieldProps, "label" | "size"> {
  label: string;
  errorText?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  size?: "small" | "medium" | "large";
  sx?: SxProps<Theme>;
}

/**
 * InputField component provides validation and customization based on the input type.
 * It validates email, password, and numeric fields.
 *
 * @param {InputFieldProps} props - The props for the component.
 * @returns {JSX.Element} The rendered InputField component.
 */
const InputField: React.FC<InputFieldProps> = ({
  label,
  errorText,
  startIcon,
  endIcon,
  type = "text",
  size = "medium",
  sx = {},
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (email: string): boolean => {
    const emailInput = document.createElement("input");
    emailInput.type = "email";
    emailInput.value = email;
    return emailInput.checkValidity();
  };

  useEffect(() => {
    if (type === "email" && value) {
      setError(!validateEmail(value) ? "Correo no válido" : "");
    } else if (type === "password" && value) {
      setError(
        value.length < 8 ? "La contraseña debe tener al menos 8 caracteres" : ""
      );
    } else if (type === "number" && value) {
      setError("");
    }
  }, [value, type]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    if (type === "number" && isNaN(Number(inputValue))) {
      return;
    }

    setValue(inputValue);
  };

  const toggleShowPassword = () => setShowPassword(!showPassword);

  const sizeStyles = {
    small: {
      fontSize: "0.875rem",
    },
    medium: {
      fontSize: "1rem",
    },
    large: {
      fontSize: "1.25rem",
      height: "56px",
    },
  };

  return (
    <TextField
      label={label}
      error={!!error || !!errorText}
      helperText={error || errorText}
      fullWidth
      type={type === "password" && showPassword ? "text" : type}
      value={value}
      onChange={handleChange}
      InputProps={{
        startAdornment: startIcon && (
          <InputAdornment position="start">{startIcon}</InputAdornment>
        ),
        endAdornment:
          type === "password" ? (
            <InputAdornment position="end">
              <IconButton onClick={toggleShowPassword} edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ) : (
            endIcon && <InputAdornment position="end">{endIcon}</InputAdornment>
          ),
      }}
      size={size === "large" ? "medium" : size}
      sx={{
        "& .MuiInputBase-input": {
          fontSize: sizeStyles[size].fontSize,
        },
        ...(size === "large" && {
          "& .MuiOutlinedInput-root": {
            height: sizeStyles.large.height,
          },
        }),
        ...sx,
      }}
      {...props}
    />
  );
};

export default InputField;
