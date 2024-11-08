import React, { useState } from "react";
import { Meta, StoryFn } from "@storybook/react";
import RadioButtonComponent, { RadioButtonComponentProps } from ".";
import CenteredTemplate from "../../stories/CenteredTemplate";

export default {
  title: "Components/RadioButtonComponent",
  component: RadioButtonComponent,
  argTypes: {
    label: {
      control: "text",
      description: "Etiqueta para el radio button.",
      defaultValue: "Opción 1",
    },
    value: {
      control: "text",
      description: "Valor del radio button.",
      defaultValue: "option1",
    },
    checked: {
      control: "boolean",
      description: "Si el botón está seleccionado.",
      defaultValue: false,
    },
    color: {
      control: { type: "select" },
      options: ["primary", "secondary", "error", "info", "success", "warning"],
      description: "Color del radio button.",
      defaultValue: "primary",
    },
    size: {
      control: { type: "select" },
      options: ["small", "medium"],
      description: "Tamaño del radio button.",
      defaultValue: "medium",
    },
    disabled: {
      control: "boolean",
      description: "Deshabilitar el radio button.",
      defaultValue: false,
    },
    variant: {
      control: { type: "select" },
      options: ["default", "compact", "outlined"],
      description: "Variantes predefinidas del estilo.",
      defaultValue: "default",
    },
  },
} as Meta<RadioButtonComponentProps>;

/**
 * Template para crear historias del RadioButtonComponent.
 * @param args - Propiedades del RadioButtonComponent.
 * @returns Componente RadioButtonComponent dentro de un template centrado.
 */
const Template: StoryFn<RadioButtonComponentProps> = (args) => {
  const [selected, setSelected] = useState(args.checked);

  return (
    <CenteredTemplate>
      <RadioButtonComponent
        {...args}
        checked={selected}
        onChange={() => setSelected(!selected)}
      />
    </CenteredTemplate>
  );
};

/**
 * Historia por defecto del RadioButtonComponent.
 */
export const Default = Template.bind({});
Default.args = {
  label: "Opción 1",
  value: "option1",
  checked: false,
  color: "primary",
  size: "medium",
  disabled: false,
  variant: "default",
};

/**
 * Historia del RadioButtonComponent en su variante compacta.
 */
export const Compact = Template.bind({});
Compact.args = {
  label: "Opción compacta",
  value: "optionCompact",
  checked: false,
  color: "secondary",
  size: "small",
  variant: "compact",
};

/**
 * Historia del RadioButtonComponent en su variante con borde.
 */
export const Outlined = Template.bind({});
Outlined.args = {
  label: "Opción con borde",
  value: "optionOutlined",
  checked: true,
  color: "success",
  size: "medium",
  variant: "outlined",
};
