import React from "react";
import { List, ListItem, ListItemText, ListItemIcon } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

interface ListComponentProps {
  items: string[];
}

const ListComponent: React.FC<ListComponentProps> = ({ items }) => {
  return (
    <List>
      {items.map((item, index) => (
        <ListItem key={index}>
          <ListItemIcon>
            <StarIcon />
          </ListItemIcon>
          <ListItemText primary={item} />
        </ListItem>
      ))}
    </List>
  );
};

export default ListComponent;
