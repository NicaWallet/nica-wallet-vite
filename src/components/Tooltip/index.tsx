import React from "react";
import { Tooltip, IconButton } from "@mui/material";
import HelpIcon from "@mui/icons-material/Help";

interface TooltipComponentProps {
  title: string;
  placement?: "top" | "bottom" | "left" | "right";
}

const TooltipComponent: React.FC<TooltipComponentProps> = ({
  title,
  placement = "top",
}) => {
  return (
    <Tooltip title={title} placement={placement}>
      <IconButton>
        <HelpIcon />
      </IconButton>
    </Tooltip>
  );
};

export default TooltipComponent;
