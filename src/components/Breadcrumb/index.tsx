import React from "react";
import { Breadcrumbs, Link, Typography } from "@mui/material";

/**
 * Props for the BreadcrumbComponent.
 * @property {Array<{ label: string; href: string }>} links - Array of breadcrumb links.
 * @property {string} current - The current breadcrumb label.
 */
export interface BreadcrumbComponentProps {
  links: { label: string; href: string }[];
  current: string;
}

/**
 * BreadcrumbComponent renders a breadcrumb navigation bar.
 * @param {BreadcrumbComponentProps} props - The props for the component.
 * @returns {JSX.Element} The rendered breadcrumb component.
 */
const BreadcrumbComponent: React.FC<BreadcrumbComponentProps> = ({
  links,
  current,
}) => {
  return (
    <Breadcrumbs
      aria-label="breadcrumb"
      sx={{
        padding: "10px 20px",
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      {links.map((link, index) => (
        <Link
          color="inherit"
          href={link.href}
          key={index}
          sx={{
            transition: "color 0.3s ease",
            "&:hover": {
              color: "#1976d2",
              textDecoration: "underline",
            },
          }}
        >
          {link.label}
        </Link>
      ))}
      <Typography
        color="textPrimary"
        sx={{
          fontWeight: "bold",
          color: "#555",
        }}
      >
        {current}
      </Typography>
    </Breadcrumbs>
  );
};

export default BreadcrumbComponent;
