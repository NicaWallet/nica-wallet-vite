import React from "react";
import {
  CircularProgress,
  Box,
  CircularProgressProps,
  SxProps,
  Theme,
} from "@mui/material";

// Variantes de estilo predefinido
const overlayVariantStyles: { [key: string]: SxProps<Theme> } = {
  default: {
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
  },
  transparent: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "transparent",
    zIndex: 9999,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  blur: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backdropFilter: "blur(5px)",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    zIndex: 9999,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  dark: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    zIndex: 9999,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  light: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    zIndex: 9999,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};

export interface LoaderProps extends CircularProgressProps {
  overlayVariant?: "default" | "transparent" | "blur" | "dark" | "light";
  overlaySx?: SxProps<Theme>; // Estilos adicionales opcionales para el overlay
}

const Loader: React.FC<LoaderProps> = ({
  color = "primary",
  size = 40,
  overlayVariant = "default",
  overlaySx = {},
  ...props // Permitir que se pasen props adicionales a CircularProgress
}) => {
  // Combina los estilos predefinidos con los personalizados
  const combinedOverlaySx = {
    ...overlayVariantStyles[overlayVariant],
    ...overlaySx,
  };

  return (
    <Box sx={combinedOverlaySx}>
      <CircularProgress color={color} size={size} {...props} />
    </Box>
  );
};

export default Loader;
