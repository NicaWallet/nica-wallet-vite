import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  SxProps,
  Theme,
  Box,
} from "@mui/material";

export interface ListComponentProps {
  items: { text: string; icon?: React.ReactNode }[];
  dense?: boolean;
  variant?:
    | "default"
    | "outlined"
    | "compact"
    | "custom"
    | "danger"
    | "succes"
    | "warning"
    | "info"
    | "outlinedAndCompact";
  sx?: SxProps<Theme>;
}

/**
 * ListComponent - Componente de lista con estilos predefinidos seleccionables.
 *
 * @param {ListComponentProps} props - Las propiedades del componente.
 * @returns {JSX.Element} El componente de lista renderizado.
 */
const ListComponent: React.FC<ListComponentProps> = ({
  items,
  dense = false,
  variant = "default",
  sx = {},
}) => {
  const variantStyles: { [key: string]: SxProps<Theme> } = {
    default: {
      backgroundColor: "background.paper",
      borderRadius: 2,
      p: 2,
    },
    outlined: {
      border: "1px solid",
      borderColor: "divider",
      borderRadius: 2,
      p: 2,
    },
    compact: {
      backgroundColor: "background.paper",
      borderRadius: 2,
      p: 1,
      "& .MuiListItem-root": {
        paddingTop: 0,
        paddingBottom: 0,
      },
    },
    outlinedAndCompact: {
      border: "1px solid",
      borderColor: "divider",
      borderRadius: 2,
      p: 1,
      "& .MuiListItem-root": {
        paddingTop: 0,
        paddingBottom: 0,
      },
    },
    danger: {
      backgroundColor: "#f8d7da", // red-50
      borderRadius: 2,
      boxShadow: 3,
      p: 2,
    },
    succes: {
      backgroundColor: "#d4edda", // green-50
      borderRadius: 2,
      boxShadow: 3,
      p: 2,
    },
    warning: {
      backgroundColor: "#fff3cd", // yellow-50
      borderRadius: 2,
      boxShadow: 3,
      p: 2,
    },
    info: {
      backgroundColor: "#d1ecf1", // cyan-50
      borderRadius: 2,
      boxShadow: 3,
      p: 2,
    },
    custom: {
      backgroundColor: "chocolate", // brown-50
      borderRadius: 2,
      boxShadow: 3,
      p: 2,
    },
  };

  const combinedStyles = { ...variantStyles[variant], ...sx };

  return (
    <Box sx={combinedStyles}>
      <List dense={dense}>
        {items.map((item, index) => (
          <ListItem key={index}>
            {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ListComponent;
