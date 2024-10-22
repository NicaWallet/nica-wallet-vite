import React from "react";
import { TFunction } from "i18next";
import { IconButton, Chip } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import StarIcon from "@mui/icons-material/Star";

/**
 * Interface for column configuration.
 */
export interface ColumnConfig {
  id: string;
  titleKey: string;
  dataType: "String" | "Number" | "Boolean" | "Date" | "Custom";
  filterId?: string;
  filterType?: "search" | "dropdown" | "multiselect" | "radiobutton";
  renderType?: string;
  width?: number;
  loadingStateType?: string;
  options?: Array<{ value: string | number; label: string }>;
  renderLogic?: (
    data: Record<string, unknown>,
    titleKey: string,
    t: TFunction
  ) => React.ReactNode;
}

/**
 * Renders a call button with the name.
 * @param data - The data record containing name and phoneNumber.
 * @returns A React node with the call button and name.
 */
const renderCallName = (data: Record<string, unknown>): React.ReactNode => {
  const name = data.name as string | undefined;
  const phoneNumber = data.phoneNumber as string | undefined;

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <IconButton
        aria-label="Call"
        onClick={() => console.log(`Llamando a ${phoneNumber}`)}
      >
        <PhoneIcon />
      </IconButton>
      <span style={{ marginLeft: "8px" }}>{name}</span>
    </div>
  );
};

/**
 * Renders a status chip.
 * @param data - The data record containing status.
 * @returns A React node with the status chip.
 */
const renderStatusChip = (data: Record<string, unknown>): React.ReactNode => {
  const status = data.status as string | undefined;

  return (
    <Chip
      label={status?.toUpperCase()}
      color={status === "active" ? "success" : "default"}
      variant="outlined"
      sx={{
        textTransform: "uppercase",
        alignContent: "center",
        width: "50%",
        justifyContent: "center",
      }}
    />
  );
};

/**
 * Renders rating stars.
 * @param data - The data record containing rating.
 * @returns A React node with the rating stars.
 */
const renderRatingStars = (data: Record<string, unknown>): React.ReactNode => {
  const rating = data.rating as number | undefined;
  const score = Math.round(rating || 0);
  const totalStars = 5;
  const stars = [];

  for (let i = 1; i <= totalStars; i++) {
    const color = i <= score ? "#FFD700" : "#E0E0E0";
    stars.push(<StarIcon key={i} style={{ color }} />);
  }

  return <div style={{ display: "flex" }}>{stars}</div>;
};

/**
 * Validates and logs a warning for duplicate IDs in the column configuration.
 * @param columns - The array of column configurations.
 */
const validateUniqueIds = (columns: ColumnConfig[]): void => {
  const idSet = new Set<string>();
  columns.forEach((column) => {
    if (idSet.has(column.id)) {
      console.warn(
        `Advertencia: ID duplicado encontrado en columnConfig: ${column.id}`
      );
    }
    idSet.add(column.id);
  });
};

/**
 * Array of column configurations.
 */
const columnConfig: ColumnConfig[] = [
  {
    id: "name",
    titleKey: "Name",
    dataType: "Custom",
    filterId: "name",
    filterType: "search",
    renderType: "custom",
    width: 120,
    loadingStateType: "medium-text",
    renderLogic: renderCallName,
  },
  {
    id: "age",
    titleKey: "Age",
    dataType: "Number",
    filterId: "age",
    filterType: "search",
    renderType: "text",
    width: 100,
    loadingStateType: "medium-text",
  },
  {
    id: "status",
    titleKey: "Status",
    dataType: "String",
    filterId: "status",
    filterType: "dropdown",
    options: [
      { value: "active", label: "Active" },
      { value: "inactive", label: "Inactive" },
    ],
    renderType: "custom",
    width: 150,
    loadingStateType: "medium-text",
    renderLogic: renderStatusChip,
  },
  {
    id: "rating",
    titleKey: "Rating",
    dataType: "Number",
    filterId: "rating",
    filterType: "search",
    renderType: "custom",
    width: 150,
    loadingStateType: "medium-text",
    renderLogic: renderRatingStars,
  },
];

validateUniqueIds(columnConfig);

export default columnConfig;
