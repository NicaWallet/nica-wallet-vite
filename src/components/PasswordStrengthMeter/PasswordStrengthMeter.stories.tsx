import { useState } from "react";
import { Meta, StoryFn } from "@storybook/react";
import PasswordStrengthMeter, { PasswordStrengthMeterProps } from ".";
import CenteredTemplate from "../../stories/CenteredTemplate";

/**
 * Storybook configuration for the PasswordStrengthMeter component.
 */
export default {
  title: "Components/PasswordStrengthMeter",
  component: PasswordStrengthMeter,
  argTypes: {
    strength: {
      control: "number",
      description: "Nivel de fuerza de la contraseña (0-100).",
      defaultValue: 50,
    },
    variant: {
      control: { type: "select" },
      options: ["default", "compact", "minimal"],
      description: "Estilo predefinido del componente.",
      defaultValue: "default",
    },
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
      description: "Tamaño del indicador de fuerza.",
      defaultValue: "medium",
    },
    sx: {
      control: false,
      description: "Estilos personalizados adicionales.",
    },
  },
} as Meta<PasswordStrengthMeterProps>;

/**
 * Template for rendering the PasswordStrengthMeter component in Storybook.
 * @param args - The props for the PasswordStrengthMeter component.
 */
const Template: StoryFn<PasswordStrengthMeterProps> = (args) => {
  const [strength] = useState(args.strength);

  return (
    <CenteredTemplate>
      <PasswordStrengthMeter {...args} strength={strength} />
    </CenteredTemplate>
  );
};

/**
 * Story for a weak password strength.
 */
export const WeakPassword = Template.bind({});
WeakPassword.args = {
  strength: 25,
};

/**
 * Story for a moderate password strength.
 */
export const ModeratePassword = Template.bind({});
ModeratePassword.args = {
  strength: 50,
};

/**
 * Story for a strong password strength.
 */
export const StrongPassword = Template.bind({});
StrongPassword.args = {
  strength: 100,
};
