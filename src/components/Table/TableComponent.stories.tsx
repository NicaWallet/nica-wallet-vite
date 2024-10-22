import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import TableComponent, { TableComponentProps } from ".";
import columnConfig from "./columnConfig";
import CenteredTemplate from "../../stories/CenteredTemplate";
import { Box } from "@mui/material";

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
} as Meta<TableComponentProps>;

/**
 * Template for rendering TableComponent stories.
 * @param args - Arguments for TableComponent.
 */
const Template: StoryFn<TableComponentProps> = (args) => (
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
  rows: [
    {
      name: "John",
      age: 30,
      phoneNumber: "555-1234",
      status: "active",
      rating: 4.5,
    },
    {
      name: "Jane",
      age: 25,
      phoneNumber: "555-5678",
      status: "inactive",
      rating: 3.8,
    },
    {
      name: "Mike",
      age: 40,
      phoneNumber: "555-9012",
      status: "active",
      rating: 4.2,
    },
    {
      name: "Lisa",
      age: 28,
      phoneNumber: "555-3456",
      status: "active",
      rating: 4.9,
    },
    {
      name: "Tom",
      age: 35,
      phoneNumber: "555-7890",
      status: "inactive",
      rating: 3.2,
    },
    {
      name: "Alice",
      age: 32,
      phoneNumber: "555-2345",
      status: "active",
      rating: 4.1,
    },
    {
      name: "Bob",
      age: 29,
      phoneNumber: "555-6789",
      status: "inactive",
      rating: 3.7,
    },
    {
      name: "Charlie",
      age: 45,
      phoneNumber: "555-3456",
      status: "active",
      rating: 4.6,
    },
    {
      name: "Diana",
      age: 22,
      phoneNumber: "555-7890",
      status: "inactive",
      rating: 3.5,
    },
    {
      name: "Eve",
      age: 38,
      phoneNumber: "555-1234",
      status: "active",
      rating: 4.3,
    },
    {
      name: "Frank",
      age: 27,
      phoneNumber: "555-5678",
      status: "inactive",
      rating: 3.9,
    },
    {
      name: "Grace",
      age: 33,
      phoneNumber: "555-9012",
      status: "active",
      rating: 4.4,
    },
    {
      name: "Hank",
      age: 41,
      phoneNumber: "555-3456",
      status: "active",
      rating: 4.7,
    },
    {
      name: "Ivy",
      age: 26,
      phoneNumber: "555-7890",
      status: "inactive",
      rating: 3.6,
    },
    {
      name: "Jack",
      age: 36,
      phoneNumber: "555-2345",
      status: "active",
      rating: 4.0,
    },
    {
      name: "Karen",
      age: 31,
      phoneNumber: "555-6789",
      status: "inactive",
      rating: 3.8,
    },
    {
      name: "Leo",
      age: 39,
      phoneNumber: "555-3456",
      status: "active",
      rating: 4.5,
    },
    {
      name: "Mona",
      age: 24,
      phoneNumber: "555-7890",
      status: "inactive",
      rating: 3.7,
    },
    {
      name: "Nina",
      age: 37,
      phoneNumber: "555-1234",
      status: "active",
      rating: 4.2,
    },
    {
      name: "Oscar",
      age: 34,
      phoneNumber: "555-5678",
      status: "inactive",
      rating: 3.9,
    },
    {
      name: "Paul",
      age: 42,
      phoneNumber: "555-9012",
      status: "active",
      rating: 4.6,
    },
    {
      name: "Quinn",
      age: 23,
      phoneNumber: "555-3456",
      status: "inactive",
      rating: 3.5,
    },
    {
      name: "Rose",
      age: 29,
      phoneNumber: "555-7890",
      status: "active",
      rating: 4.3,
    },
    {
      name: "Sam",
      age: 35,
      phoneNumber: "555-2345",
      status: "inactive",
      rating: 3.8,
    },
    {
      name: "Tina",
      age: 28,
      phoneNumber: "555-6789",
      status: "active",
      rating: 4.1,
    },
    {
      name: "Uma",
      age: 30,
      phoneNumber: "555-3456",
      status: "inactive",
      rating: 3.7,
    },
    {
      name: "Vince",
      age: 44,
      phoneNumber: "555-7890",
      status: "active",
      rating: 4.4,
    },
    {
      name: "Wendy",
      age: 27,
      phoneNumber: "555-1234",
      status: "inactive",
      rating: 3.6,
    },
    {
      name: "Xander",
      age: 32,
      phoneNumber: "555-5678",
      status: "active",
      rating: 4.0,
    },
    {
      name: "Yara",
      age: 39,
      phoneNumber: "555-9012",
      status: "inactive",
      rating: 3.9,
    },
    {
      name: "John",
      age: 30,
      phoneNumber: "555-1234",
      status: "active",
      rating: 4.5,
    },
    {
      name: "Jane",
      age: 25,
      phoneNumber: "555-5678",
      status: "inactive",
      rating: 3.8,
    },
    {
      name: "Mike",
      age: 40,
      phoneNumber: "555-9012",
      status: "active",
      rating: 4.2,
    },
    {
      name: "Lisa",
      age: 28,
      phoneNumber: "555-3456",
      status: "active",
      rating: 4.9,
    },
    {
      name: "Tom",
      age: 35,
      phoneNumber: "555-7890",
      status: "inactive",
      rating: 3.2,
    },
    {
      name: "Alice",
      age: 32,
      phoneNumber: "555-2345",
      status: "active",
      rating: 4.1,
    },
    {
      name: "Bob",
      age: 29,
      phoneNumber: "555-6789",
      status: "inactive",
      rating: 3.7,
    },
    {
      name: "Charlie",
      age: 45,
      phoneNumber: "555-3456",
      status: "active",
      rating: 4.6,
    },
    {
      name: "Diana",
      age: 22,
      phoneNumber: "555-7890",
      status: "inactive",
      rating: 3.5,
    },
    {
      name: "Eve",
      age: 38,
      phoneNumber: "555-1234",
      status: "active",
      rating: 4.3,
    },
    {
      name: "Frank",
      age: 27,
      phoneNumber: "555-5678",
      status: "inactive",
      rating: 3.9,
    },
    {
      name: "Grace",
      age: 33,
      phoneNumber: "555-9012",
      status: "active",
      rating: 4.4,
    },
    {
      name: "Hank",
      age: 41,
      phoneNumber: "555-3456",
      status: "active",
      rating: 4.7,
    },
    {
      name: "Ivy",
      age: 26,
      phoneNumber: "555-7890",
      status: "inactive",
      rating: 3.6,
    },
    {
      name: "Jack",
      age: 36,
      phoneNumber: "555-2345",
      status: "active",
      rating: 4.0,
    },
    {
      name: "Karen",
      age: 31,
      phoneNumber: "555-6789",
      status: "inactive",
      rating: 3.8,
    },
    {
      name: "Leo",
      age: 39,
      phoneNumber: "555-3456",
      status: "active",
      rating: 4.5,
    },
    {
      name: "Mona",
      age: 24,
      phoneNumber: "555-7890",
      status: "inactive",
      rating: 3.7,
    },
    {
      name: "Nina",
      age: 37,
      phoneNumber: "555-1234",
      status: "active",
      rating: 4.2,
    },
    {
      name: "Oscar",
      age: 34,
      phoneNumber: "555-5678",
      status: "inactive",
      rating: 3.9,
    },
    {
      name: "Paul",
      age: 42,
      phoneNumber: "555-9012",
      status: "active",
      rating: 4.6,
    },
    {
      name: "Quinn",
      age: 23,
      phoneNumber: "555-3456",
      status: "inactive",
      rating: 3.5,
    },
    {
      name: "Rose",
      age: 29,
      phoneNumber: "555-7890",
      status: "active",
      rating: 4.3,
    },
    {
      name: "Sam",
      age: 35,
      phoneNumber: "555-2345",
      status: "inactive",
      rating: 3.8,
    },
    {
      name: "Tina",
      age: 28,
      phoneNumber: "555-6789",
      status: "active",
      rating: 4.1,
    },
    {
      name: "Uma",
      age: 30,
      phoneNumber: "555-3456",
      status: "inactive",
      rating: 3.7,
    },
    {
      name: "Vince",
      age: 44,
      phoneNumber: "555-7890",
      status: "active",
      rating: 4.4,
    },
    {
      name: "Wendy",
      age: 27,
      phoneNumber: "555-1234",
      status: "inactive",
      rating: 3.6,
    },
    {
      name: "Xander",
      age: 32,
      phoneNumber: "555-5678",
      status: "active",
      rating: 4.0,
    },
    {
      name: "Yara",
      age: 39,
      phoneNumber: "555-9012",
      status: "inactive",
      rating: 3.9,
    },
    {
      name: "John",
      age: 30,
      phoneNumber: "555-1234",
      status: "active",
      rating: 4.5,
    },
    {
      name: "Jane",
      age: 25,
      phoneNumber: "555-5678",
      status: "inactive",
      rating: 3.8,
    },
    {
      name: "Mike",
      age: 40,
      phoneNumber: "555-9012",
      status: "active",
      rating: 4.2,
    },
    {
      name: "Lisa",
      age: 28,
      phoneNumber: "555-3456",
      status: "active",
      rating: 4.9,
    },
    {
      name: "Tom",
      age: 35,
      phoneNumber: "555-7890",
      status: "inactive",
      rating: 3.2,
    },
    {
      name: "Alice",
      age: 32,
      phoneNumber: "555-2345",
      status: "active",
      rating: 4.1,
    },
    {
      name: "Bob",
      age: 29,
      phoneNumber: "555-6789",
      status: "inactive",
      rating: 3.7,
    },
    {
      name: "Charlie",
      age: 45,
      phoneNumber: "555-3456",
      status: "active",
      rating: 4.6,
    },
    {
      name: "Diana",
      age: 22,
      phoneNumber: "555-7890",
      status: "inactive",
      rating: 3.5,
    },
    {
      name: "Eve",
      age: 38,
      phoneNumber: "555-1234",
      status: "active",
      rating: 4.3,
    },
    {
      name: "Frank",
      age: 27,
      phoneNumber: "555-5678",
      status: "inactive",
      rating: 3.9,
    },
    {
      name: "Grace",
      age: 33,
      phoneNumber: "555-9012",
      status: "active",
      rating: 4.4,
    },
    {
      name: "Hank",
      age: 41,
      phoneNumber: "555-3456",
      status: "active",
      rating: 4.7,
    },
    {
      name: "Ivy",
      age: 26,
      phoneNumber: "555-7890",
      status: "inactive",
      rating: 3.6,
    },
    {
      name: "Jack",
      age: 36,
      phoneNumber: "555-2345",
      status: "active",
      rating: 4.0,
    },
    {
      name: "Karen",
      age: 31,
      phoneNumber: "555-6789",
      status: "inactive",
      rating: 3.8,
    },
    {
      name: "Leo",
      age: 39,
      phoneNumber: "555-3456",
      status: "active",
      rating: 4.5,
    },
    {
      name: "Mona",
      age: 24,
      phoneNumber: "555-7890",
      status: "inactive",
      rating: 3.7,
    },
    {
      name: "Nina",
      age: 37,
      phoneNumber: "555-1234",
      status: "active",
      rating: 4.2,
    },
    {
      name: "Oscar",
      age: 34,
      phoneNumber: "555-5678",
      status: "inactive",
      rating: 3.9,
    },
    {
      name: "Paul",
      age: 42,
      phoneNumber: "555-9012",
      status: "active",
      rating: 4.6,
    },
    {
      name: "Quinn",
      age: 23,
      phoneNumber: "555-3456",
      status: "inactive",
      rating: 3.5,
    },
    {
      name: "Rose",
      age: 29,
      phoneNumber: "555-7890",
      status: "active",
      rating: 4.3,
    },
    {
      name: "Sam",
      age: 35,
      phoneNumber: "555-2345",
      status: "inactive",
      rating: 3.8,
    },
    {
      name: "Tina",
      age: 28,
      phoneNumber: "555-6789",
      status: "active",
      rating: 4.1,
    },
    {
      name: "Uma",
      age: 30,
      phoneNumber: "555-3456",
      status: "inactive",
      rating: 3.7,
    },
    {
      name: "Vince",
      age: 44,
      phoneNumber: "555-7890",
      status: "active",
      rating: 4.4,
    },
    {
      name: "Wendy",
      age: 27,
      phoneNumber: "555-1234",
      status: "inactive",
      rating: 3.6,
    },
    {
      name: "Xander",
      age: 32,
      phoneNumber: "555-5678",
      status: "active",
      rating: 4.0,
    },
    {
      name: "Yara",
      age: 39,
      phoneNumber: "555-9012",
      status: "inactive",
      rating: 3.9,
    },
    {
      name: "John",
      age: 30,
      phoneNumber: "555-1234",
      status: "active",
      rating: 4.5,
    },
    {
      name: "Jane",
      age: 25,
      phoneNumber: "555-5678",
      status: "inactive",
      rating: 3.8,
    },
    {
      name: "Mike",
      age: 40,
      phoneNumber: "555-9012",
      status: "active",
      rating: 4.2,
    },
    {
      name: "Lisa",
      age: 28,
      phoneNumber: "555-3456",
      status: "active",
      rating: 4.9,
    },
    {
      name: "Tom",
      age: 35,
      phoneNumber: "555-7890",
      status: "inactive",
      rating: 3.2,
    },
    {
      name: "Alice",
      age: 32,
      phoneNumber: "555-2345",
      status: "active",
      rating: 4.1,
    },
    {
      name: "Bob",
      age: 29,
      phoneNumber: "555-6789",
      status: "inactive",
      rating: 3.7,
    },
    {
      name: "Charlie",
      age: 45,
      phoneNumber: "555-3456",
      status: "active",
      rating: 4.6,
    },
    {
      name: "Diana",
      age: 22,
      phoneNumber: "555-7890",
      status: "inactive",
      rating: 3.5,
    },
    {
      name: "Eve",
      age: 38,
      phoneNumber: "555-1234",
      status: "active",
      rating: 4.3,
    },
    {
      name: "Frank",
      age: 27,
      phoneNumber: "555-5678",
      status: "inactive",
      rating: 3.9,
    },
    {
      name: "Grace",
      age: 33,
      phoneNumber: "555-9012",
      status: "active",
      rating: 4.4,
    },
    {
      name: "Hank",
      age: 41,
      phoneNumber: "555-3456",
      status: "active",
      rating: 4.7,
    },
    {
      name: "Ivy",
      age: 26,
      phoneNumber: "555-7890",
      status: "inactive",
      rating: 3.6,
    },
    {
      name: "Jack",
      age: 36,
      phoneNumber: "555-2345",
      status: "active",
      rating: 4.0,
    },
    {
      name: "Karen",
      age: 31,
      phoneNumber: "555-6789",
      status: "inactive",
      rating: 3.8,
    },
    {
      name: "Leo",
      age: 39,
      phoneNumber: "555-3456",
      status: "active",
      rating: 4.5,
    },
    {
      name: "Mona",
      age: 24,
      phoneNumber: "555-7890",
      status: "inactive",
      rating: 3.7,
    },
    {
      name: "Nina",
      age: 37,
      phoneNumber: "555-1234",
      status: "active",
      rating: 4.2,
    },
    {
      name: "Oscar",
      age: 34,
      phoneNumber: "555-5678",
      status: "inactive",
      rating: 3.9,
    },
    {
      name: "Paul",
      age: 42,
      phoneNumber: "555-9012",
      status: "active",
      rating: 4.6,
    },
    {
      name: "Quinn",
      age: 23,
      phoneNumber: "555-3456",
      status: "inactive",
      rating: 3.5,
    },
    {
      name: "Rose",
      age: 29,
      phoneNumber: "555-7890",
      status: "active",
      rating: 4.3,
    },
    {
      name: "Sam",
      age: 35,
      phoneNumber: "555-2345",
      status: "inactive",
      rating: 3.8,
    },
    {
      name: "Tina",
      age: 28,
      phoneNumber: "555-6789",
      status: "active",
      rating: 4.1,
    },
    {
      name: "Uma",
      age: 30,
      phoneNumber: "555-3456",
      status: "inactive",
      rating: 3.7,
    },
    {
      name: "Vince",
      age: 44,
      phoneNumber: "555-7890",
      status: "active",
      rating: 4.4,
    },
    {
      name: "Wendy",
      age: 27,
      phoneNumber: "555-1234",
      status: "inactive",
      rating: 3.6,
    },
    {
      name: "Xander",
      age: 32,
      phoneNumber: "555-5678",
      status: "active",
      rating: 4.0,
    },
    {
      name: "Yara",
      age: 39,
      phoneNumber: "555-9012",
      status: "inactive",
      rating: 3.9,
    },
  ],
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
