import React from "react";
import { LinearProgress, Typography, Box } from "@mui/material";

interface ProgressBarProps {
  value: number;
  label?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value, label }) => {
  return (
    <Box display="flex" alignItems="center">
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
        <LinearProgress variant="determinate" value={value} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">
          {`${Math.round(value)}%`}
        </Typography>
      </Box>
    </Box>
  );
};

export default ProgressBar;