import React from "react";
import { Badge, IconButton } from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";

interface BadgeComponentProps {
  count: number;
}

const BadgeComponent: React.FC<BadgeComponentProps> = ({ count }) => {
  return (
    <Badge badgeContent={count} color="primary">
      <IconButton color="inherit">
        <MailIcon />
      </IconButton>
    </Badge>
  );
};

export default BadgeComponent;
