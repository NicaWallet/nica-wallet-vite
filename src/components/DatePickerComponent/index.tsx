import React from "react";
import { TextField, Box, Skeleton, SxProps, Theme } from "@mui/material";

/**
 * Props for DatePickerComponent
 */
export interface DatePickerComponentProps {
  label: string;
  value: string;
  onChange: (date: string) => void; // Ahora espera un string directamente
  disablePast?: boolean;
  disableFuture?: boolean;
  size?: "small" | "medium" | "large";
  isLoading?: boolean;
  width?: string;
  sx?: SxProps<Theme>;
}

/**
 * DatePickerComponent is a reusable date picker component with optional loading state.
 * 
 * @param {DatePickerComponentProps} props - The props for the component.
 * @returns {JSX.Element} The rendered date picker component.
 */
const DatePickerComponent: React.FC<DatePickerComponentProps> = ({
  label,
  value,
  onChange,
  disablePast = false,
  disableFuture = false,
  size = "medium",
  isLoading = false,
  width = "100%",
  sx = {},
}) => {
  const minDate = disablePast
    ? new Date().toISOString().split("T")[0]
    : undefined;
  const maxDate = disableFuture
    ? new Date().toISOString().split("T")[0]
    : undefined;

  const sizeStyles = {
    small: {
      inputSize: "small",
      fontSize: "0.875rem",
      height: 40,
    },
    medium: {
      inputSize: "medium",
      fontSize: "1rem",
      height: 56,
    },
    large: {
      inputSize: "medium",
      fontSize: "1.25rem",
      height: 72,
    },
  };

  return (
    <Box width={width}>
      {isLoading ? (
        <Skeleton
          variant="rectangular"
          width="100%"
          height={sizeStyles[size].height}
          animation="wave"
          sx={{ bgcolor: "rgba(0,0,0,0.1)" }}
        />
      ) : (
        <TextField
          label={label}
          type="date"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          InputLabelProps={{ shrink: true }}
          inputProps={{ min: minDate, max: maxDate }}
          size={sizeStyles[size].inputSize as "small" | "medium"}
          fullWidth
          sx={{
            "& .MuiInputBase-input": {
              fontSize: sizeStyles[size].fontSize,
              height: sizeStyles[size].height,
            },
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
              height: sizeStyles[size].height,
            },
            ...sx,
          }}
        />
      )}
    </Box>
  );
};

export default DatePickerComponent;
