import React from "react";
import { t, TFunction } from "i18next";
import { IconButton, Chip } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import StarIcon from "@mui/icons-material/Star";
import { DateTimeUtils } from '../../utils/dateTimeUtils';

/**
 * Interface for column configuration.
 */
export interface IColumnConfig<T = Record<string, unknown>> {
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
    data: T,
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
const validateUniqueIds = (columns: IColumnConfig[]): void => {
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

const validateStringNotNull = (value: string | null | undefined): React.ReactNode => {
  if (value === null || value === undefined) {
    return <Chip label={t("NOT_FOUND")} variant="outlined" color="error" />;
  }
  return value;
};

/**
 * Array of column configurations.
 */

const columnConfig: IColumnConfig[] = [

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
  /**
   * User columns
   */
  {
    id: "user_id",
    titleKey: "USER_ID",
    dataType: "Number",
    filterId: "user_id",
    filterType: "search",
    width: 100,
    loadingStateType: "medium-text",
  },
  {
    id: "first_name",
    titleKey: "FIRST_NAME",
    dataType: "String",
    filterId: "first_name",
    filterType: "search",
    width: 120,
    loadingStateType: "medium-text",
  },
  {
    id: "middle_name",
    titleKey: "MIDDLE_NAME",
    dataType: "String",
    filterId: "middle_name",
    filterType: "search",
    width: 120,
    loadingStateType: "medium-text",
    renderType: "custom",
    renderLogic: (data) =>
      validateStringNotNull(data.middle_name as string | null | undefined),
  },
  {
    id: "first_surname",
    titleKey: "FIRST_SURNAME",
    dataType: "String",
    filterId: "first_surname",
    filterType: "search",
    width: 120,
    loadingStateType: "medium-text",
  },
  {
    id: "second_surname",
    titleKey: "SECOND_SURNAME",
    dataType: "String",
    filterId: "second_surname",
    filterType: "search",
    width: 120,
    loadingStateType: "medium-text",
    renderType: "custom",
    renderLogic: (data) =>
      validateStringNotNull(data.second_surname as string | null | undefined),
  },
  {
    id: "email",
    titleKey: "EMAIL",
    dataType: "String",
    filterId: "email",
    filterType: "search",
    width: 200,
    loadingStateType: "medium-text",
  },
  {
    id: "phone_number",
    titleKey: "PHONE_NUMBER",
    dataType: "String",
    filterId: "phone_number",
    filterType: "search",
    width: 150,
    loadingStateType: "medium-text",
    renderType: "custom",
    renderLogic: (data) =>
      validateStringNotNull(data.phone_number as string | null | undefined),
  },
  {
    id: "birthdate",
    titleKey: "BIRTHDATE",
    dataType: "Date",
    filterId: "birthdate",
    filterType: "search",
    width: 150,
    loadingStateType: "medium-text",
    renderLogic: (data) => {
      const birthdate = new Date((data as { birthdate: string }).birthdate);
      return DateTimeUtils.formatHumanReadable(birthdate);
    },
  },
  {
    id: "created_at",
    titleKey: "CREATED_AT",
    dataType: "Date",
    filterId: "created_at",
    filterType: "search",
    width: 150,
    loadingStateType: "medium-text",
  },
  {
    id: "updated_at",
    titleKey: "UPDATED_AT",
    dataType: "Date",
    filterId: "updated_at",
    filterType: "search",
    width: 150,
    loadingStateType: "medium-text",
  },
  {
    id: "userRoles",
    titleKey: "USER_ROLES",
    dataType: "Custom",
    filterId: "userRoles",
    filterType: "search",
    renderType: "custom",
    width: 200,
    loadingStateType: "medium-text",
    renderLogic: (data) => {
      const roles = data.userRoles as
        | Array<{ role: { role_name: string } }>
        | undefined;
      return roles?.map((roleObj, index) => (
        <Chip key={index} label={roleObj.role.role_name} variant="outlined" />
      ));
    },
  },
  /**
   * User roles columns
   */
  {
    id: "user.user_id",
    titleKey: "USER_ID",
    dataType: "Number",
    filterId: "user_id",
    filterType: "search",
    width: 60,
    loadingStateType: "medium-text",
    renderLogic: (data) => (data.user as { user_id: number }).user_id,
  },
  {
    id: "user.first_name",
    titleKey: "FIRST_NAME",
    dataType: "String",
    filterId: "first_name",
    filterType: "search",
    width: 120,
    loadingStateType: "medium-text",
    renderLogic: (data) => (data.user as { first_name: string }).first_name,
  },
  {
    id: "user.middle_name",
    titleKey: "MIDDLE_NAME",
    dataType: "String",
    filterId: "middle_name",
    filterType: "search",
    width: 120,
    loadingStateType: "medium-text",
    renderType: "custom",
    renderLogic: (data) =>
      validateStringNotNull((data.user as { middle_name: string }).middle_name),
  },
  {
    id: "user.first_surname",
    titleKey: "FIRST_SURNAME",
    dataType: "String",
    filterId: "first_surname",
    filterType: "search",
    width: 120,
    loadingStateType: "medium-text",
    renderLogic: (data) => (data.user as { first_surname: string }).first_surname,
  },
  {
    id: "user.email",
    titleKey: "EMAIL",
    dataType: "String",
    filterId: "email",
    filterType: "search",
    width: 200,
    loadingStateType: "medium-text",
    renderLogic: (data) => (data.user as { email: string }).email,
  },
  {
    id: "user.created_at",
    titleKey: "CREATED_AT",
    dataType: "Date",
    filterId: "created_at",
    filterType: "search",
    width: 150,
    loadingStateType: "medium-text",
    renderLogic: (data) => {
      const createdAt = new Date((data.user as { created_at: string }).created_at);
      return DateTimeUtils.formatHumanReadable(createdAt, true);
    },
  },
  {
    id: "role.role_name",
    titleKey: "ROLE_NAME",
    dataType: "String",
    filterId: "role_name",
    filterType: "search",
    width: 100,
    loadingStateType: "medium-text",
    renderLogic: (data) => (data.role as { role_name: string }).role_name,
  },
];

validateUniqueIds(columnConfig);

export default columnConfig;
