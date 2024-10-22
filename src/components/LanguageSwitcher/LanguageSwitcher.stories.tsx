import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import LanguageSwitcher, { LanguageSwitcherProps } from ".";
import CenteredTemplate from "../../stories/CenteredTemplate";

export default {
  title: "Components/LanguageSwitcher",
  component: LanguageSwitcher,
  argTypes: {
    sx: {
      control: "object",
      description: "Estilos personalizados para el IconButton.",
    },
    iconButtonProps: {
      control: "object",
      description: "Props personalizados para el IconButton.",
    },
    menuProps: {
      control: "object",
      description: "Props personalizados para el Menu.",
    },
    menuItemProps: {
      control: "object",
      description: "Props personalizados para los MenuItems.",
    },
    languages: {
      control: "object",
      description: "Lista de idiomas disponibles para seleccionar.",
      defaultValue: [
        { code: "es", name: "Español" },
        { code: "en", name: "English" },
      ],
    },
  },
} as Meta<LanguageSwitcherProps>;

const Template: StoryFn<LanguageSwitcherProps> = (args) => (
  <CenteredTemplate>
    <LanguageSwitcher {...args} />
  </CenteredTemplate>
);

// Historias

export const Default = Template.bind({});
Default.args = {};
Default.storyName = "Switch de Idioma por Defecto";

export const CustomIconButton = Template.bind({});
CustomIconButton.args = {
  iconButtonProps: {
    color: "primary",
    size: "large",
  },
};
CustomIconButton.storyName = "Switch de Idioma con Botón Personalizado";

export const CustomMenuItems = Template.bind({});
CustomMenuItems.args = {
  menuItemProps: {
    dense: true,
  },
};
CustomMenuItems.storyName = "Switch de Idioma con Ítems de Menú Compactos";

export const CustomLanguages = Template.bind({});
CustomLanguages.args = {
  languages: [
    { code: "es", name: "Español" },
    { code: "fr", name: "Français" },
    { code: "de", name: "Deutsch" },
  ],
};
CustomLanguages.storyName = "Switch de Idioma con Idiomas Personalizados";
