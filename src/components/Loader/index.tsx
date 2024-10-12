import React from "react";
import { CircularProgress, Box, styled } from "@mui/material";

// Styled component for the overlay
const Overlay = styled(Box)(() => ({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(255, 255, 255, 0.8)",
  zIndex: 9999,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

/**
 * Loader component
 *
 * @param {Object} props - Component props
 * @param {"inherit" | "primary" | "secondary" | "error" | "info" | "success" | "warning"} [props.color="primary"] - Color of the loader
 * @param {number} [props.size=40] - Size of the loader
 *
 * @returns {JSX.Element} The Loader component
 */
const Loader: React.FC<{
  color?:
    | "inherit"
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning";
  size?: number;
}> = ({ color = "primary", size = 40 }) => {
  return (
    <Overlay>
      <CircularProgress color={color} size={size} />
    </Overlay>
  );
};

export default Loader;
