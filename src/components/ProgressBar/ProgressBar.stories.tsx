import React, { useState } from "react";
import { Meta, StoryFn } from "@storybook/react";
import ProgressBar, { ProgressBarProps } from ".";
import CenteredTemplate from "../../stories/CenteredTemplate";

export default {
  title: "Components/ProgressBar",
  component: ProgressBar,
  argTypes: {
    value: {
      control: "number",
      description: "Nivel de progreso (0-100).",
      defaultValue: 50,
    },
    label: {
      control: "text",
      description: "Etiqueta opcional para la barra de progreso.",
      defaultValue: "Progress",
    },
    showPercentage: {
      control: "boolean",
      description: "Mostrar o no el porcentaje al lado de la barra.",
      defaultValue: true,
    },
    color: {
      control: { type: "select" },
      options: ["primary", "secondary", "error", "info", "success", "warning"],
      description: "Color de la barra de progreso.",
      defaultValue: "primary",
    },
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
      description: "Tamaño (altura) de la barra de progreso.",
      defaultValue: "medium",
    },
    variant: {
      control: { type: "select" },
      options: ["default", "compact", "custom"],
      description: "Estilos predefinidos del componente.",
      defaultValue: "default",
    },
  },
} as Meta<ProgressBarProps>;

/**
 * Template for rendering the ProgressBar component within a centered template.
 * @param args - The properties passed to the ProgressBar component.
 * @returns A JSX element containing the ProgressBar component.
 */
const Template: StoryFn<ProgressBarProps> = (args) => {
  const [progress] = useState(args.value);

  return (
    <CenteredTemplate>
      <ProgressBar {...args} value={progress} />
    </CenteredTemplate>
  );
};

/**
 * Default variant of the ProgressBar component.
 */
export const Default = Template.bind({});
Default.args = {
  value: 50,
  label: "Progress",
  showPercentage: true,
  color: "primary",
  size: "medium",
  variant: "default",
  sx: { width: "30%" },
};

/**
 * Compact variant of the ProgressBar component.
 */
export const Compact = Template.bind({});
Compact.args = {
  value: 75,
  label: "Loading",
  showPercentage: true,
  color: "secondary",
  size: "small",
  variant: "compact",
  sx: { width: "30%" },
};

/**
 * Custom variant of the ProgressBar component.
 */
export const Custom = Template.bind({});
Custom.args = {
  value: 90,
  label: "Uploading",
  showPercentage: false,
  color: "success",
  size: "large",
  variant: "custom",
  sx: { width: "30%" },
};
