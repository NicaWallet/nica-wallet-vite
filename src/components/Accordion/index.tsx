import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Skeleton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

/**
 * Props for the AccordionComponent.
 */
export interface AccordionComponentProps {
  title: string;
  content: string;
  isLoading?: boolean;
  defaultExpanded?: boolean;
  disabled?: boolean;
  width?: string;
  height?: string;
}

/**
 * AccordionComponent is a customizable accordion component that can display a title and content.
 * It supports loading state, default expanded state, and can be disabled.
 *
 * @param {AccordionComponentProps} props - The props for the component.
 * @returns {JSX.Element} The rendered AccordionComponent.
 */
const AccordionComponent: React.FC<AccordionComponentProps> = ({
  title,
  content,
  isLoading = false,
  defaultExpanded = false,
  disabled = false,
  width = "100%",
  height,
}) => {
  const [expanded, setExpanded] = useState(defaultExpanded);

  return (
    <Accordion
      expanded={expanded}
      onChange={() => setExpanded(!expanded)}
      disabled={disabled || isLoading}
      sx={{ width, height }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        {isLoading ? (
          <Skeleton width="100%" height="40px" />
        ) : (
          <Typography>{title}</Typography>
        )}
      </AccordionSummary>
      <AccordionDetails>
        {isLoading ? (
          <Skeleton
            variant="rectangular"
            width="100%"
            height={height || "100px"}
          />
        ) : (
          <Typography>{content}</Typography>
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default AccordionComponent;
