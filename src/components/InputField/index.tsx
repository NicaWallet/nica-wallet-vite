import React from "react";
import {
  TextField,
  InputAdornment,
  IconButton,
  SxProps,
  Theme,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export interface InputFieldProps {
  label: string;
  errorText?: string;
  type?:
  | "text"
  | "password"
  | "number"
  | "email"
  | "date"
  | "datetime-local"
  | "month"
  | "time"
  | "url"
  | "week";
  value: string | number;
  onChange: (value: string | number) => void;
  size?: "small" | "medium" | "large";
  select?: boolean;
  children?: React.ReactNode;
  required?: boolean;
  startIcon?: React.ReactNode; // Soporte para íconos al inicio
  endIcon?: React.ReactNode; // Soporte para íconos al final
  sx?: SxProps<Theme>;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  errorText,
  type = "text",
  value,
  onChange,
  size = "medium",
  select = false,
  children,
  required,
  startIcon,
  endIcon,
  sx = {},
}) => {
  const [showPassword, setShowPassword] = React.useState(false);

  // Alternar la visibilidad de la contraseña
  const toggleShowPassword = () => setShowPassword(!showPassword);

  // Estilos personalizados según el tamaño
  const sizeStyles = {
    small: { fontSize: "0.875rem" },
    medium: { fontSize: "1rem" },
    large: { fontSize: "1.25rem", height: "56px" },
  };

  return (
    <TextField
      label={label}
      error={!!errorText}
      helperText={errorText}
      fullWidth
      type={type === "password" && showPassword ? "text" : type} // Alternar visibilidad para contraseña
      value={value}
      onChange={(e) => onChange(e.target.value)}
      size={size === "large" ? "medium" : size}
      select={select} // Activar select si es necesario
      required={required}
      InputProps={{
        startAdornment: startIcon && (
          <InputAdornment position="start">{startIcon}</InputAdornment>
        ),
        endAdornment: select ? (
          endIcon && <InputAdornment position="end">{endIcon}</InputAdornment>
        ) : type === "password" ? (
          <InputAdornment position="end">
            <IconButton onClick={toggleShowPassword} edge="end">
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ) : (
          endIcon && <InputAdornment position="end">{endIcon}</InputAdornment>
        ),
      }}
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
    >
      {children}
    </TextField>
  );
};

export default InputField;
