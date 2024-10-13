import React from "react";
import { Breadcrumbs, Link, Typography } from "@mui/material";

interface BreadcrumbComponentProps {
  links: { label: string; href: string }[];
  current: string;
}

const BreadcrumbComponent: React.FC<BreadcrumbComponentProps> = ({
  links,
  current,
}) => {
  return (
    <Breadcrumbs aria-label="breadcrumb">
      {links.map((link, index) => (
        <Link color="inherit" href={link.href} key={index}>
          {link.label}
        </Link>
      ))}
      <Typography color="textPrimary">{current}</Typography>
    </Breadcrumbs>
  );
};

export default BreadcrumbComponent;
