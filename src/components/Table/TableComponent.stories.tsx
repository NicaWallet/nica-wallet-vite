import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import TableComponent, { TableComponentProps } from ".";
import columnConfig from "./columnConfig";
import CenteredTemplate from "../../stories/CenteredTemplate";
import { Box } from "@mui/material";
import tableDataSample from "./tableDataSample.json";
import { JSX } from "react/jsx-runtime";

/**
 * Storybook configuration for TableComponent.
 */
export default {
  title: "Components/TableComponent",
  component: TableComponent,
  argTypes: {
    columns: {
      control: { type: "object" },
      description: "Configuración de las columnas de la tabla.",
    },
    rows: {
      control: { type: "object" },
      description: "Filas de datos de la tabla.",
    },
    variant: {
      control: { type: "select" },
      options: ["default", "compact", "striped", "bordered"],
      description: "Estilos predefinidos para la tabla.",
      defaultValue: "default",
    },
    size: {
      control: { type: "select" },
      options: ["small", "medium"],
      description: "Tamaño de la tabla.",
      defaultValue: "medium",
    },
    stickyHeader: {
      control: "boolean",
      description: "Si el encabezado debe permanecer fijo.",
      defaultValue: false,
    },
    columnOrder: {
      control: { type: "object" },
      description: "Orden de las columnas por sus IDs.",
    },
    rowsPerPage: {
      control: { type: "number" },
      description: "Número de filas por página.",
      defaultValue: 10,
    },
    showRowNumber: {
      control: "boolean",
      description: "Mostrar columna de número de fila.",
      defaultValue: true,
    },
  },
} as Meta<TableComponentProps<Record<string, unknown>>>;

/**
 * Template for rendering TableComponent stories.
 * @param args - Arguments for TableComponent.
 */
const Template: StoryFn<TableComponentProps<Record<string, unknown>>> = (args: JSX.IntrinsicAttributes & TableComponentProps<Record<string, unknown>>) => (
  <CenteredTemplate>
    <Box sx={{ maxWidth: "90%" }}>
      <TableComponent {...args} />
    </Box>
  </CenteredTemplate>
);

/**
 * Default story for TableComponent.
 */
export const Default = Template.bind({});
Default.args = {
  columns: columnConfig,
  rows: tableDataSample,
  variant: "default",
  showRowNumber: true,
};

/**
 * Story for TableComponent with custom rows per page.
 */
export const CustomRowsPerPage = Template.bind({});
CustomRowsPerPage.args = {
  ...Default.args,
  rowsPerPage: 5,
  rowsPerPageOptions: [5, 10, 15],
};

/**
 * Story for TableComponent without row numbers.
 */
export const NoRowNumber = Template.bind({});
NoRowNumber.args = {
  ...Default.args,
  showRowNumber: false,
};

/**
 * Story for TableComponent with custom column order.
 */
export const CustomColumnOrder = Template.bind({});
CustomColumnOrder.args = {
  ...Default.args,
  columnOrder: ["status", "name", "age", "rating"],
};

/**
 * Story for TableComponent with striped variant.
 */
export const Striped = Template.bind({});
Striped.args = {
  ...Default.args,
  variant: "striped",
};

/**
 * Story for TableComponent with bordered variant.
 */
export const Bordered = Template.bind({});
Bordered.args = {
  ...Default.args,
  variant: "bordered",
};

/**
 * Story for TableComponent with compact variant.
 */
export const Compact = Template.bind({});
Compact.args = {
  ...Default.args,
  variant: "compact",
  size: "small",
};

/**
 * Story for TableComponent with custom filters.
 */
export const CustomFilters = Template.bind({});
CustomFilters.args = {
  ...Default.args,
  columns: [
    ...columnConfig,
    {
      id: "phoneNumber",
      titleKey: "Phone Number",
      dataType: "String",
      filterId: "phoneNumber",
      filterType: "search",
      renderType: "text",
      width: 200,
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
    },
    {
      id: "phoneNumber",
      titleKey: "Phone Number",
      dataType: "String",
      filterId: "phoneNumber",
      filterType: "search",
      renderType: "text",
      width: 200,
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
    },
    {
      id: "phoneNumber",
      titleKey: "Phone Number",
      dataType: "String",
      filterId: "phoneNumber",
      filterType: "search",
      renderType: "text",
      width: 200,
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
    },
    {
      id: "phoneNumber",
      titleKey: "Phone Number",
      dataType: "String",
      filterId: "phoneNumber",
      filterType: "search",
      renderType: "text",
      width: 200,
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
    },
  ],
  rowsPerPage: 5,
};
