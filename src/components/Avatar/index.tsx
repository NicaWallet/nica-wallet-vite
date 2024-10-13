import React from "react";
import { Avatar } from "@mui/material";

interface AvatarComponentProps {
  src?: string;
  alt?: string;
  fallbackText?: string;
}

const AvatarComponent: React.FC<AvatarComponentProps> = ({
  src,
  alt,
  fallbackText,
}) => {
  return (
    <Avatar alt={alt} src={src}>
      {!src && fallbackText}
    </Avatar>
  );
};

export default AvatarComponent;
