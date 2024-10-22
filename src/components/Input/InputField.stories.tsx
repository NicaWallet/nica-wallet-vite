import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import InputField, { InputFieldProps } from ".";
import SearchIcon from "@mui/icons-material/Search";
import EmailIcon from "@mui/icons-material/Email";
import CenteredTemplate from "../../stories/CenteredTemplate";

export default {
  title: "Components/InputField",
  component: InputField,
  argTypes: {
    label: {
      control: "text",
      defaultValue: "Nombre de Usuario",
    },
    errorText: {
      control: "text",
      defaultValue: "",
    },
    startIcon: {
      control: false,
    },
    endIcon: {
      control: false,
    },
    type: {
      control: { type: "select" },
      options: ["text", "password", "email", "number"],
    },
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
    },
  },
} as Meta<InputFieldProps>;

const Template: StoryFn<InputFieldProps> = (args) => (
  <CenteredTemplate>
    <InputField {...args} />
  </CenteredTemplate>
);

// Historias

export const DefaultInput = Template.bind({});
DefaultInput.args = {
  label: "Nombre de Usuario",
  sx: { width: "30%" },
};
DefaultInput.storyName = "Campo por Defecto";

export const InputWithError = Template.bind({});
InputWithError.args = {
  label: "Correo Electrónico",
  type: "email",
  errorText: "Por favor, ingresa un correo válido",
  sx: { width: "30%" },
};
InputWithError.storyName = "Campo con Error";

export const PasswordInput = Template.bind({});
PasswordInput.args = {
  label: "Contraseña",
  type: "password",
  sx: { width: "30%" },
};
PasswordInput.storyName = "Campo de Contraseña con Mostrar/Ocultar";

export const InputWithStartIcon = Template.bind({});
InputWithStartIcon.args = {
  label: "Buscar",
  startIcon: <SearchIcon />,
  sx: { width: "30%" },
};
InputWithStartIcon.storyName = "Campo con Ícono de Inicio";

export const InputWithEndIcon = Template.bind({});
InputWithEndIcon.args = {
  label: "Correo Electrónico",
  endIcon: <EmailIcon />,
  type: "email",
  sx: { width: "30%" },
};
InputWithEndIcon.storyName = "Campo con Ícono de Fin";

export const NumberInput = Template.bind({});
NumberInput.args = {
  label: "Edad",
  type: "number",
  sx: { width: "30%" },
};
NumberInput.storyName = "Campo Numérico";
