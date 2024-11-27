import React from "react";
import { t, TFunction } from "i18next";
import { Chip } from "@mui/material";
import { DateTimeUtils } from "../../utils/dateTimeUtils";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";

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

export function validateUniqueIds(columns: IColumnConfig[]): void {
  const ids = columns.map((column) => column.id);
  const duplicateMap = ids.reduce<Record<string, number[]>>((acc, id, index) => {
    if (!acc[id]) {
      acc[id] = [];
    }
    acc[id].push(index);
    return acc;
  }, {});

  // Filtrar solo los duplicados
  const duplicates = Object.entries(duplicateMap).filter(([, positions]) => positions.length > 1);

  if (duplicates.length > 0) {
    const errorMessages = duplicates.map(
      ([id, positions]) => `ID "${id}" is duplicated at positions: ${positions.join(", ")}`
    );
    throw new Error(`Duplicate column IDs found:\n${errorMessages.join("\n")}`);
  }
}


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

const validateStringNotNull = (value: string | null | undefined): React.ReactNode => {
  if (value === null || value === undefined) {
    return <Chip label={t("NOT_FOUND")} variant="outlined" color="error" />;
  }
  return value;
};

/**
 * Renders a formatted birthdate.
 * @param data - The data record containing birthdate.
 * @returns A formatted birthdate string.
 */
const renderFormattedDate = (
  data: Record<string, unknown>,
  key: string
): React.ReactNode => {
  const rawDate = data[key] as string | undefined;

  if (!rawDate) {
    return t("N/A");
  }

  const dateParts = rawDate.split("-");
  const date = new Date(Date.UTC(
    parseInt(dateParts[0], 10),
    parseInt(dateParts[1], 10) - 1,
    parseInt(dateParts[2], 10)
  ));

  if (isNaN(date.getTime())) {
    console.warn(`Invalid date detected for key "${key}":`, rawDate);
    return t("INVALID_DATE");
  }

  return DateTimeUtils.formatDate(date, "dd-mm-yyyy");
};

export const renderTransactionTypeChip = (
  type: "EXPENSE" | "INCOME",
  t: TFunction
): React.ReactNode => {
  const isExpense = type === "EXPENSE";

  return (
    <Chip
      label={t(isExpense ? "EXPENSE" : "INCOME")}
      icon={isExpense ? <ArrowDownward /> : <ArrowUpward />}
      color={isExpense ? "error" : "success"} // Rojo para gastos, verde para ingresos
      variant="outlined"
      sx={{
        textTransform: "uppercase",
        fontWeight: "bold",
        fontSize: "0.875rem",
      }}
    />
  );
};

const renderAmountCurrency = (amount: number): React.ReactNode => {
  return ` USD: $${amount.toFixed(2)}`;
}


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
    loadingStateType: "medium-text"
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
    renderLogic: (data) => renderFormattedDate(data, "birthdate"),
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
    renderLogic: (data) => renderFormattedDate(data.user as Record<string, unknown>, "created_at"),
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
  /**
   * Budget columns
   */
  {
    id: "budget_id",
    titleKey: "ID",
    dataType: "Number",
    filterId: "budget_id",
    filterType: "search",
    width: 100,
    loadingStateType: "medium-text",
  },
  {
    id: "amount",
    titleKey: "AMOUNT",
    dataType: "Number",
    filterId: "amount",
    filterType: "search",
    width: 100,
    loadingStateType: "medium-text",
    renderType: "custom",
    renderLogic: (data) => renderAmountCurrency(data.amount as number),
  },
  {
    id: "start_date",
    titleKey: "START_DATE",
    dataType: "Date",
    filterId: "start_date",
    filterType: "search",
    width: 150,
    loadingStateType: "medium-text",
    renderLogic: (data) => renderFormattedDate(data, "start_date"),
  },
  {
    id: "end_date",
    titleKey: "END_DATE",
    dataType: "Date",
    filterId: "end_date",
    filterType: "search",
    width: 150,
    loadingStateType: "medium-text",
    renderLogic: (data) => renderFormattedDate(data, "end_date"),
  },
  /**
   * Transaction columns
   */
  {
    id: "type",
    titleKey: "TYPE",
    dataType: "Custom",
    filterId: "type",
    filterType: "dropdown",
    renderLogic: (data, titleKey, t) => renderTransactionTypeChip(data.type as "EXPENSE" | "INCOME", t),
    width: 150,
    loadingStateType: "medium-text",
  },
  {
    id: "date",
    titleKey: "DATE",
    dataType: "Date",
    filterId: "date",
    filterType: "search",
    width: 150,
    loadingStateType: "medium-text",
    renderLogic: (data) => renderFormattedDate(data, "date"),
  },
  {
    id: "category.name",
    titleKey: "CATEGORY",
    dataType: "String",
    filterId: "category_name",
    filterType: "search",
    width: 150,
    loadingStateType: "medium-text",
    renderLogic: (data) => (data.category as { name: string }).name,
  },
  {
    id: "subcategory.name",
    titleKey: "SUBCATEGORY",
    dataType: "String",
    filterId: "subcategory_name",
    filterType: "search",
    width: 150,
    loadingStateType: "medium-text",
    renderLogic: (data) => (data.subcategory as { name: string }).name,
  },
  {
    id: "classification.name",
    titleKey: "CLASSIFICATION",
    dataType: "String",
    filterId: "classification_name",
    filterType: "search",
    width: 150,
    loadingStateType: "medium-text",
    renderLogic: (data) => (data.classification as { name: string }).name,
  },
  {
    id: "created_at",
    titleKey: "CREATED_AT",
    dataType: "Date",
    filterId: "created_at",
    filterType: "search",
    width: 150,
    loadingStateType: "medium-text",
    renderLogic: (data) => renderFormattedDate(data, "created_at"),
  },
  {
    id: "classification_id",
    titleKey: "CLASSIFICATION_ID",
    dataType: "Number",
    filterId: "classification_id",
    filterType: "search",
    width: 100,
    loadingStateType: "medium-text",
  },
  {
    id: "due_date",
    titleKey: "DUE_DATE",
    dataType: "Date",
    filterId: "due_date",
    filterType: "search",
    width: 150,
    loadingStateType: "medium-text",
    renderLogic: (data) => renderFormattedDate(data, "due_date"),
  },
  {
    id: "goal_id",
    titleKey: "GOAL_ID",
    dataType: "Number",
    filterId: "goal_id",
    filterType: "search",
    width: 100,
    loadingStateType: "medium-text",
  },
  {
    id: "description",
    titleKey: "DESCRIPTION",
    dataType: "String",
    filterId: "description",
    filterType: "search",
    width: 200,
    loadingStateType: "medium-text",
  },
  {
    id: "target_amount",
    titleKey: "TARGET_AMOUNT",
    dataType: "Number",
    filterId: "target_amount",
    filterType: "search",
    width: 150,
    loadingStateType: "medium-text",
    renderType: "custom",
    renderLogic: (data) => renderAmountCurrency(data.target_amount as number),
  },
  {
    id: "current_amount",
    titleKey: "CURRENT_AMOUNT",
    dataType: "Number",
    filterId: "current_amount",
    filterType: "search",
    width: 150,
    loadingStateType: "medium-text",
    renderType: "custom",
    renderLogic: (data) => renderAmountCurrency(data.current_amount as number),
  },
  {
    id: "deadline",
    titleKey: "DEADLINE",
    dataType: "Date",
    filterId: "deadline",
    filterType: "search",
    width: 150,
    loadingStateType: "medium-text",
    renderLogic: (data) => renderFormattedDate(data, "deadline"),
  },
  {
    id: "updated_at",
    titleKey: "UPDATED_AT",
    dataType: "Date",
    filterId: "updated_at",
    filterType: "search",
    width: 150,
    loadingStateType: "medium-text",
    renderLogic: (data) => renderFormattedDate(data, "updated_at"),
  },
  {
    id: "session_id",
    titleKey: "SESSION_ID",
    dataType: "Number",
    filterId: "session_id",
    filterType: "search",
    width: 100,
    loadingStateType: "medium-text",
  },
  {
    id: "device",
    titleKey: "DEVICE",
    dataType: "String",
    filterId: "device",
    filterType: "search",
    width: 150,
    loadingStateType: "medium-text",
  },
  {
    id: "ip",
    titleKey: "IP",
    dataType: "String",
    filterId: "ip",
    filterType: "search",
    width: 150,
    loadingStateType: "medium-text",
  },
  {
    id: "location",
    titleKey: "LOCATION",
    dataType: "String",
    filterId: "location",
    filterType: "search",
    width: 200,
    loadingStateType: "medium-text",
  },
  {
    id: "start_time",
    titleKey: "START_TIME",
    dataType: "Date",
    filterId: "start_time",
    filterType: "search",
    width: 150,
    loadingStateType: "medium-text",
    renderLogic: (data) => renderFormattedDate(data, "start_time"),
  },
  {
    id: "end_time",
    titleKey: "END_TIME",
    dataType: "Date",
    filterId: "end_time",
    filterType: "search",
    width: 150,
    loadingStateType: "medium-text",
    renderLogic: (data) => renderFormattedDate(data, "end_time"),
  }
];

validateUniqueIds(columnConfig);

export default columnConfig;
