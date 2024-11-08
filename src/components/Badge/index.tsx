import React from "react";
import { Badge, IconButton, SxProps, Theme } from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";

export interface BadgeComponentProps {
  count: number;
  maxCount?: number;
  sx?: SxProps<Theme>;
}

/**
 * BadgeComponent is a React functional component that displays a badge with a count.
 * The badge is customizable with additional styles and a maximum count limit.
 *
 * @param {BadgeComponentProps} props - The properties for the BadgeComponent.
 * @param {number} props.count - The count to display in the badge.
 * @param {number} [props.maxCount=99] - The optional maximum count to display before showing "99+".
 * @param {SxProps<Theme>} [props.sx] - Additional custom styles for the badge.
 * @returns {JSX.Element} The rendered BadgeComponent.
 */
const BadgeComponent: React.FC<BadgeComponentProps> = ({
  count,
  maxCount = 99,
  sx = {},
}) => {
  return (
    <Badge
      badgeContent={count > maxCount ? `${maxCount}+` : count}
      color="primary"
      sx={{
        "& .MuiBadge-badge": {
          minWidth: "20px",
          height: "20px",
          fontSize: "0.75rem",
          backgroundColor: "#f50057",
          color: "#fff",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
        },
        ...sx,
      }}
    >
      <IconButton
        color="inherit"
        sx={{
          padding: "10px",
          transition: "background-color 0.3s ease",
          "&:hover": {
            backgroundColor: "#f0f0f0",
          },
        }}
      >
        <MailIcon sx={{ fontSize: "24px" }} />
      </IconButton>
    </Badge>
  );
};

export default BadgeComponent;
