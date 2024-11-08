import React from "react";
import { LinearProgress, Typography, Box, SxProps, Theme } from "@mui/material";

export interface ProgressBarProps {
  value: number;
  label?: string;
  showPercentage?: boolean;
  color?: "primary" | "secondary" | "error" | "info" | "success" | "warning";
  size?: "small" | "medium" | "large";
  variant?: "default" | "compact" | "custom";
  sx?: SxProps<Theme>;
}

/**
 * ProgressBar component - Shows a progress bar with an optional label and percentage.
 *
 * @param {ProgressBarProps} props - The properties for the component.
 * @param {number} props.value - The current value of the progress bar.
 * @param {string} [props.label] - Optional label to display next to the progress bar.
 * @param {boolean} [props.showPercentage=true] - Whether to show the percentage value.
 * @param {"primary" | "secondary" | "error" | "info" | "success" | "warning"} [props.color="primary"] - Color of the progress bar.
 * @param {"small" | "medium" | "large"} [props.size="medium"] - Size of the progress bar.
 * @param {"default" | "compact" | "custom"} [props.variant="default"] - Variant style of the progress bar.
 * @param {SxProps<Theme>} [props.sx={}] - Additional custom styles.
 * @returns {JSX.Element} The rendered ProgressBar component.
 */
const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  label,
  showPercentage = true,
  color = "primary",
  size = "medium",
  variant = "default",
  sx = {},
}) => {
  const sizeValues = {
    small: 6,
    medium: 10,
    large: 14,
  };

  const variantStyles = {
    default: {
      display: "flex",
      alignItems: "center",
      width: "100%",
    },
    compact: {
      display: "flex",
      alignItems: "center",
      width: "80%",
      "& .MuiTypography-root": {
        marginRight: 1,
      },
    },
    custom: {
      display: "flex",
      alignItems: "center",
      width: "100%",
      backgroundColor: "lightgray",
      borderRadius: "10px",
      p: 1,
    },
  };

  return (
    <Box sx={{ ...variantStyles[variant], ...sx }}>
      {label && (
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{ marginRight: 2 }}
        >
          {label}
        </Typography>
      )}
      <Box width="100%">
        <LinearProgress
          variant="determinate"
          value={value}
          color={color}
          sx={{ height: sizeValues[size], borderRadius: 5 }}
        />
      </Box>
      {showPercentage && (
        <Box minWidth={35}>
          <Typography variant="body2" color="textSecondary">
            {`${Math.round(value)}%`}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default ProgressBar;
