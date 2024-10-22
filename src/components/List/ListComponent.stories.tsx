import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import ListComponent, { ListComponentProps } from ".";
import StarIcon from "@mui/icons-material/Star";
import MailIcon from "@mui/icons-material/Mail";
import { Box } from "@mui/material";
import CenteredTemplate from "../../stories/CenteredTemplate";

export default {
  title: "Components/ListComponent",
  component: ListComponent,
  argTypes: {
    items: {
      control: { type: "object" },
      description:
        "Array de objetos con el texto e íconos opcionales para la lista.",
      table: {
        type: { summary: "Array<{ text: string; icon?: React.ReactNode }>" },
        defaultValue: { summary: "[]" },
      },
    },
    dense: {
      control: { type: "boolean" },
      description: "Si `true`, la lista es más compacta.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    variant: {
      control: { type: "select" },
      options: [
        "default",
        "outlined",
        "compact",
        "custom",
        "danger",
        "succes",
        "warning",
        "info",
        "outlinedAndCompact",
      ],
      description: "Selecciona el estilo predefinido para la lista.",
      table: {
        type: {
          summary: `"default" | "outlined" | "compact" | "custom" | "danger" | "succes" | "warning" | "info" | "outlinedAndCompact"`,
        },
        defaultValue: { summary: "default" },
      },
    },
  },
} as Meta<ListComponentProps>;

const Template: StoryFn<ListComponentProps> = (args) => (
  <Box sx={{ width: "300px" }}>
    <CenteredTemplate>
      <ListComponent {...args} />
    </CenteredTemplate>
  </Box>
);

// Historias para cada variante

export const ListaEstiloDefault = Template.bind({});
ListaEstiloDefault.args = {
  items: [
    { text: "Elemento 1", icon: <StarIcon /> },
    { text: "Elemento 2", icon: <StarIcon /> },
    { text: "Elemento 3", icon: <StarIcon /> },
  ],
  variant: "default",
};
ListaEstiloDefault.storyName = "Lista con Estilo Default";

export const ListaEstiloOutlined = Template.bind({});
ListaEstiloOutlined.args = {
  items: [
    { text: "Correo 1", icon: <MailIcon /> },
    { text: "Correo 2", icon: <MailIcon /> },
    { text: "Correo 3", icon: <MailIcon /> },
  ],
  variant: "outlined",
};
ListaEstiloOutlined.storyName = "Lista con Estilo Outlined";

export const ListaEstiloCompacto = Template.bind({});
ListaEstiloCompacto.args = {
  items: [
    { text: "Elemento 1", icon: <StarIcon /> },
    { text: "Elemento 2", icon: <StarIcon /> },
    { text: "Elemento 3", icon: <StarIcon /> },
  ],
  dense: true,
  variant: "compact",
};
ListaEstiloCompacto.storyName = "Lista con Estilo Compacto";

export const ListaEstiloDanger = Template.bind({});
ListaEstiloDanger.args = {
  items: [
    { text: "Elemento Peligroso 1", icon: <StarIcon /> },
    { text: "Elemento Peligroso 2", icon: <StarIcon /> },
    { text: "Elemento Peligroso 3", icon: <StarIcon /> },
  ],
  variant: "danger",
};
ListaEstiloDanger.storyName = "Lista con Estilo Peligro (Danger)";

export const ListaEstiloSucces = Template.bind({});
ListaEstiloSucces.args = {
  items: [
    { text: "Tarea Completada 1", icon: <StarIcon /> },
    { text: "Tarea Completada 2", icon: <StarIcon /> },
    { text: "Tarea Completada 3", icon: <StarIcon /> },
  ],
  variant: "succes",
};
ListaEstiloSucces.storyName = "Lista con Estilo Éxito (Success)";

export const ListaEstiloWarning = Template.bind({});
ListaEstiloWarning.args = {
  items: [
    { text: "Elemento Crítico 1", icon: <StarIcon /> },
    { text: "Elemento Crítico 2", icon: <StarIcon /> },
    { text: "Elemento Crítico 3", icon: <StarIcon /> },
  ],
  variant: "warning",
};
ListaEstiloWarning.storyName = "Lista con Estilo Advertencia (Warning)";

export const ListaEstiloInfo = Template.bind({});
ListaEstiloInfo.args = {
  items: [
    { text: "Dato Informativo 1", icon: <StarIcon /> },
    { text: "Dato Informativo 2", icon: <StarIcon /> },
    { text: "Dato Informativo 3", icon: <StarIcon /> },
  ],
  variant: "info",
};
ListaEstiloInfo.storyName = "Lista con Estilo Informativo (Info)";

export const ListaEstiloOutlinedAndCompact = Template.bind({});
ListaEstiloOutlinedAndCompact.args = {
  items: [
    { text: "Elemento 1", icon: <MailIcon /> },
    { text: "Elemento 2", icon: <MailIcon /> },
    { text: "Elemento 3", icon: <MailIcon /> },
  ],
  dense: true,
  variant: "outlinedAndCompact",
};
ListaEstiloOutlinedAndCompact.storyName =
  "Lista con Estilo Outlined y Compacto";

export const ListaEstiloPersonalizado = Template.bind({});
ListaEstiloPersonalizado.args = {
  items: [
    { text: "Elemento A", icon: <StarIcon /> },
    { text: "Elemento B", icon: <StarIcon /> },
    { text: "Elemento C", icon: <StarIcon /> },
  ],
  variant: "custom",
};
ListaEstiloPersonalizado.storyName = "Lista con Estilo Personalizado";

export const ListaEstiloPersonalizadoConSx = Template.bind({});
ListaEstiloPersonalizadoConSx.args = {
  items: [
    { text: "Elemento A", icon: <StarIcon /> },
    { text: "Elemento B", icon: <StarIcon /> },
    { text: "Elemento C", icon: <StarIcon /> },
  ],
  variant: "custom",
  sx: {
    backgroundColor: "chocolate",
    borderRadius: 2,
    boxShadow: 3,
    p: 2,
  },
}; 
ListaEstiloPersonalizadoConSx.storyName = "Lista con Estilo Personalizado y sx";

// Historias para la lista con ítems sin íconos

export const ListaSinIconos = Template.bind({});
ListaSinIconos.args = {
  items: [
    { text: "Elemento 1" },
    { text: "Elemento 2" },
    { text: "Elemento 3" },
  ],
};
ListaSinIconos.storyName = "Lista sin Íconos";

export const ListaSinIconosEstiloOutlined = Template.bind({});
ListaSinIconosEstiloOutlined.args = {
  items: [
    { text: "Correo 1" },
    { text: "Correo 2" },
    { text: "Correo 3" },
  ],
  variant: "outlined",
};
ListaSinIconosEstiloOutlined.storyName = "Lista sin Íconos con Estilo Outlined";

export const ListaSinIconosEstiloCompacto = Template.bind({});
ListaSinIconosEstiloCompacto.args = {
  items: [
    { text: "Elemento 1" },
    { text: "Elemento 2" },
    { text: "Elemento 3" },
  ],
  dense: true,
  variant: "compact",
};
ListaSinIconosEstiloCompacto.storyName = "Lista sin Íconos con Estilo Compacto";

export const ListaSinIconosEstiloDanger = Template.bind({});
ListaSinIconosEstiloDanger.args = {
  items: [
    { text: "Elemento Peligroso 1" },
    { text: "Elemento Peligroso 2" },
    { text: "Elemento Peligroso 3" },
  ],
  variant: "danger",
};
ListaSinIconosEstiloDanger.storyName = "Lista sin Íconos con Estilo Peligro (Danger)";

export const ListaSinIconosEstiloSucces = Template.bind({});
ListaSinIconosEstiloSucces.args = {
  items: [
    { text: "Tarea Completada 1" },
    { text: "Tarea Completada 2" },
    { text: "Tarea Completada 3" },
  ],
  variant: "succes",
};
ListaSinIconosEstiloSucces.storyName = "Lista sin Íconos con Estilo Éxito (Success)";

export const ListaSinIconosEstiloWarning = Template.bind({});
ListaSinIconosEstiloWarning.args = {
  items: [
    { text: "Elemento Crítico 1" },
    { text: "Elemento Crítico 2" },
    { text: "Elemento Crítico 3" },
  ],
  variant: "warning",
};
ListaSinIconosEstiloWarning.storyName = "Lista sin Íconos con Estilo Advertencia (Warning)";

export const ListaSinIconosEstiloInfo = Template.bind({});
ListaSinIconosEstiloInfo.args = {
  items: [
    { text: "Dato Informativo 1" },
    { text: "Dato Informativo 2" },
    { text: "Dato Informativo 3" },
  ],
  variant: "info",
};
ListaSinIconosEstiloInfo.storyName = "Lista sin Íconos con Estilo Informativo (Info)";

export const ListaSinIconosEstiloOutlinedAndCompact = Template.bind({});
ListaSinIconosEstiloOutlinedAndCompact.args = {
  items: [
    { text: "Elemento 1" },
    { text: "Elemento 2" },
    { text: "Elemento 3" },
  ],
  dense: true,
  variant: "outlinedAndCompact",
};
ListaSinIconosEstiloOutlinedAndCompact.storyName =
  "Lista sin Íconos con Estilo Outlined y Compacto";