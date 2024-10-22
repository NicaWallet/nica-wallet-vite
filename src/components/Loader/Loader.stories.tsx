import { Meta, StoryFn } from "@storybook/react";
import Loader, { LoaderProps } from ".";
import CenteredTemplate from "../../stories/CenteredTemplate";

// Meta configuration for Storybook
export default {
  title: "Components/Loader",
  component: Loader,
  argTypes: {
    color: {
      control: { type: "select" },
      options: [
        "inherit",
        "primary",
        "secondary",
        "error",
        "info",
        "success",
        "warning",
      ],
      description: "Color del Loader.",
    },
    size: {
      control: { type: "number" },
      description: "Tamaño del Loader.",
    },
    overlayVariant: {
      control: { type: "select" },
      options: ["default", "transparent", "blur", "dark", "light"],
      description: "Variante de estilo predefinido para el overlay.",
    },
    overlaySx: {
      control: { type: "object" },
      description: "Estilos adicionales para el overlay.",
    },
  },
} as Meta<LoaderProps>;

const Template: StoryFn<LoaderProps> = (args) => (
  <CenteredTemplate>
    <Loader {...args} />
  </CenteredTemplate>
);

// Historias

export const DefaultLoader = Template.bind({});
DefaultLoader.args = {
  color: "primary",
  size: 40,
  overlayVariant: "default",
};
DefaultLoader.storyName = "Loader Default";

export const TransparentLoader = Template.bind({});
TransparentLoader.args = {
  color: "secondary",
  size: 50,
  overlayVariant: "transparent",
};
TransparentLoader.storyName = "Loader Transparente";

export const BlurLoader = Template.bind({});
BlurLoader.args = {
  color: "info",
  size: 60,
  overlayVariant: "blur",
};
BlurLoader.storyName = "Loader con Blur";

export const DarkLoader = Template.bind({});
DarkLoader.args = {
  color: "error",
  size: 70,
  overlayVariant: "dark",
};
DarkLoader.storyName = "Loader Fondo Oscuro";

export const LightLoader = Template.bind({});
LightLoader.args = {
  color: "success",
  size: 80,
  overlayVariant: "light",
};
LightLoader.storyName = "Loader Fondo Claro";
