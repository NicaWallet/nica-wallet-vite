import React, { useState } from "react";
import {
  IconButton,
  Menu,
  MenuItem,
  IconButtonProps,
  MenuProps,
  MenuItemProps,
  SxProps,
  Theme,
} from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import { useTranslation } from "react-i18next";

export interface LanguageSwitcherProps {
  sx?: SxProps<Theme>;
  iconButtonProps?: IconButtonProps;
  menuProps?: MenuProps;
  menuItemProps?: MenuItemProps;
  languages?: Array<{ code: string; name: string }>;
}

/**
 * LanguageSwitcher component allows users to switch between available languages.
 *
 * @param {object} sx - Optional styles to customize the component.
 * @param {object} iconButtonProps - Optional props for the IconButton component.
 * @param {object} menuProps - Optional props for the Menu component.
 * @param {object} menuItemProps - Optional props for the MenuItem components.
 * @param {Array<{code: string; name: string}>} languages - Optional list of available languages with their display names.
 */
const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  sx,
  iconButtonProps,
  menuProps,
  menuItemProps,
  languages = [
    { code: "es", name: "Español" },
    { code: "en", name: "English" },
  ],
}) => {
  const { i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

  const currentLanguage = i18n.language;
  const languagesToDisplay = languages.filter(
    (lang) => lang.code !== currentLanguage
  );

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
    handleMenuClose();
  };

  return (
    <>
      <IconButton
        color="inherit"
        aria-label="change language"
        onClick={handleMenuOpen}
        sx={sx}
        {...iconButtonProps}
      >
        <LanguageIcon />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={handleMenuClose}
        MenuListProps={{
          "aria-labelledby": "language-switcher",
        }}
        {...menuProps}
      >
        {languagesToDisplay.map((lang) => (
          <MenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            sx={{
              "&:hover": {
                backgroundColor: "primary.main",
                color: "white",
              },
            }}
            {...menuItemProps}
          >
            {lang.name}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default LanguageSwitcher;
