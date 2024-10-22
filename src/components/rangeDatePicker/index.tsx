import React from "react";
import { TextField, Box, Skeleton } from "@mui/material";

export interface RangeDatePickerProps {
  labelStart: string;
  labelEnd: string;
  startDate: string;
  endDate: string;
  onStartDateChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onEndDateChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disablePast?: boolean;
  disableFuture?: boolean;
  size?: "small" | "medium" | "large";
  disabledStart?: boolean;
  disabledEnd?: boolean;
  isLoading?: boolean;
  widthPercent?: number;
}

const RangeDatePicker: React.FC<RangeDatePickerProps> = ({
  labelStart,
  labelEnd,
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  disablePast = false,
  disableFuture = false,
  size = "medium",
  disabledStart = false,
  disabledEnd = false,
  isLoading = false,
  widthPercent = 100,
}) => {
  const minDate = disablePast
    ? new Date().toISOString().split("T")[0]
    : undefined;
  const maxDate = disableFuture
    ? new Date().toISOString().split("T")[0]
    : undefined;

  const sizeValues = {
    small: { height: 40, width: "80%" },
    medium: { height: 56, width: "100%" },
    large: { height: 72, width: "100%" },
  };

  return (
    <Box
      display="flex"
      gap={2}
      sx={{
        width: `${widthPercent}%`,
        margin: "auto",
        justifyContent: "space-between",
      }}
    >
      {isLoading ? (
        <Skeleton
          variant="rectangular"
          width={sizeValues[size].width}
          height={sizeValues[size].height}
          animation="wave"
          sx={{ bgcolor: "rgba(0,0,0,0.1)" }}
        />
      ) : (
        <TextField
          label={labelStart}
          type="date"
          value={startDate}
          onChange={onStartDateChange}
          InputLabelProps={{ shrink: true }}
          inputProps={{
            min: minDate,
            max: endDate || maxDate,
          }}
          size={size === "large" ? "medium" : size}
          fullWidth
          disabled={disabledStart}
          sx={{
            "& .MuiInputBase-input": {
              fontSize: size === "small" ? "0.875rem" : "1rem",
            },
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
            },
          }}
        />
      )}

      {isLoading ? (
        <Skeleton
          variant="rectangular"
          width={sizeValues[size].width}
          height={sizeValues[size].height}
          animation="wave"
          sx={{ bgcolor: "rgba(0,0,0,0.1)" }}
        />
      ) : (
        <TextField
          label={labelEnd}
          type="date"
          value={endDate}
          onChange={onEndDateChange}
          InputLabelProps={{ shrink: true }}
          inputProps={{
            min: startDate || minDate,
            max: maxDate,
          }}
          size={size === "large" ? "medium" : size}
          fullWidth
          disabled={disabledEnd}
          sx={{
            "& .MuiInputBase-input": {
              fontSize: size === "small" ? "0.875rem" : "1rem",
            },
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
            },
          }}
        />
      )}
    </Box>
  );
};

export default RangeDatePicker;
