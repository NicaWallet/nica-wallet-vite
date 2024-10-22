import React, { useState } from "react";
import {
  Avatar,
  Menu,
  MenuItem,
  CircularProgress,
  SxProps,
  Theme,
} from "@mui/material";
import { deepOrange } from "@mui/material/colors";

export interface AvatarComponentProps {
  src?: string;
  alt?: string;
  fallbackText?: string;
  size?: "small" | "medium" | "large";
  backgroundColor?: string;
  textColor?: string;
  border?: string;
  sx?: SxProps<Theme>;
  onClick?: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  menuOptions?: Array<{ label: string; onClick: () => void }>;
}

/**
 * AvatarComponent is a customizable avatar component with optional loading state and menu options.
 *
 * @param {AvatarComponentProps} props - The properties for the AvatarComponent.
 * @returns {JSX.Element} The rendered AvatarComponent.
 */
const AvatarComponent: React.FC<AvatarComponentProps> = ({
  src,
  alt,
  fallbackText,
  size = "medium",
  backgroundColor,
  textColor = "#fff",
  border,
  sx = {},
  onClick,
  isLoading = false,
  disabled = false,
  menuOptions = [],
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    if (!disabled && menuOptions.length > 0) {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const sizeValues = {
    small: 30,
    medium: 50,
    large: 70,
  };

  return (
    <>
      <div
        style={{
          position: "relative",
          cursor: onClick && !disabled ? "pointer" : "default",
        }}
        onClick={handleMenuClick}
      >
        <Avatar
          alt={alt}
          src={!isLoading ? src : undefined}
          sx={{
            width: sizeValues[size],
            height: sizeValues[size],
            backgroundColor:
              backgroundColor || (src ? "transparent" : deepOrange[500]),
            color: textColor,
            border: border || "none",
            opacity: disabled ? 0.5 : 1,
            ...sx,
          }}
        >
          {!isLoading && !src && fallbackText?.[0]}
        </Avatar>

        {isLoading && (
          <CircularProgress
            size={sizeValues[size] / 2}
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        )}
      </div>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            padding: "10px",
            borderRadius: "10px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          },
        }}
        MenuListProps={{
          sx: {
            padding: 0,
          },
        }}
      >
        {menuOptions.map((option, index) => (
          <MenuItem
            key={index}
            onClick={() => {
              option.onClick();
              handleMenuClose();
            }}
            sx={{
              margin: "5px 0",
              padding: "10px 20px",
              borderRadius: "8px",
              "&:hover": {
                backgroundColor: "#e0e0e0",
                color: "#000",
                transform: "scale(1.05)",
              },
              transition:
                "background-color 0.3s ease, color 0.3s ease, transform 0.3s ease",
            }}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default AvatarComponent;
