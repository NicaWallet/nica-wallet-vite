import React from "react";
import { Box, Typography, LinearProgress } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

export interface PasswordStrengthMeterProps {
  strength: number;
}

/**
 * PasswordStrengthMeter component displays a visual representation of password strength.
 *
 * @param {PasswordStrengthMeterProps} props - The properties for the component.
 * @param {number} props.strength - The strength of the password, represented as a number between 0 and 100.
 *
 * @returns {JSX.Element} The rendered PasswordStrengthMeter component.
 */
const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({
  strength,
}) => {
  const theme = useTheme();
  const { t } = useTranslation();

  /**
   * Determines the color of the progress bar based on the password strength.
   *
   * @returns {string} The color corresponding to the password strength.
   */
  const getPasswordStrengthColor = (): string => {
    if (strength === 100) return theme.palette.success.main;    // Green
    if (strength >= 75) return theme.palette.warning.main;      // Yellow
    return theme.palette.error.main;                            // Red
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="body2">
        {strength === 100
          ? t("PASSWORD_STRONG")
          : strength >= 75
          ? t("PASSWORD_MODERATE")
          : t("PASSWORD_WEAK")}
      </Typography>
      <LinearProgress
        variant="determinate"
        value={strength}
        sx={{
          height: 10,
          borderRadius: 5,
          backgroundColor: theme.palette.background.default,
          "& .MuiLinearProgress-bar": {
            backgroundColor: getPasswordStrengthColor(),
          },
        }}
      />
    </Box>
  );
};

export default PasswordStrengthMeter;
