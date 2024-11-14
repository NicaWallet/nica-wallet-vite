import { Meta, StoryFn } from "@storybook/react";
import AvatarComponent, { AvatarComponentProps } from ".";
import CenteredTemplate from "../../stories/CenteredTemplate";

export default {
  title: "Components/AvatarComponent",
  component: AvatarComponent,
  argTypes: {
    src: {
      control: "text",
      description: "URL de la imagen que se mostrará en el avatar.",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
      },
    },
    alt: {
      control: "text",
      description: "Texto alternativo para la imagen del avatar.",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "Avatar" },
      },
    },
    fallbackText: {
      control: "text",
      description: "Texto que se mostrará si no hay imagen disponible.",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "A" },
      },
    },
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
      description: "Tamaño del avatar (small, medium, large).",
      table: {
        type: { summary: `"small" | "medium" | "large"` },
        defaultValue: { summary: `"medium"` },
      },
    },
    backgroundColor: {
      control: "color",
      description: "Color de fondo del avatar si no se proporciona una imagen.",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "deepOrange[500]" },
      },
    },
    textColor: {
      control: "color",
      description: "Color del texto de respaldo.",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "#fff" },
      },
    },
    border: {
      control: "text",
      description: "Borde personalizado alrededor del avatar.",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "none" },
      },
    },
    isLoading: {
      control: "boolean",
      description: "Muestra un indicador de carga en lugar de la imagen.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    disabled: {
      control: "boolean",
      description: "Deshabilita el avatar (sin interacciones).",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    menuOptions: {
      control: false,
      description:
        "Opciones para el menú desplegable que se muestra al hacer clic.",
      table: {
        type: { summary: "Array<{ label: string; onClick: () => void }>" },
        defaultValue: { summary: "[]" },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Componente Avatar reutilizable construido con Material-UI. Soporta imagen, texto de respaldo, colores, tamaños, y también puede desplegar un menú al hacer clic.",
      },
    },
  },
} as Meta<AvatarComponentProps>;

const Template: StoryFn<AvatarComponentProps> = (args) => (
  <CenteredTemplate>
    <AvatarComponent {...args} />
  </CenteredTemplate>
);

export const WithImage = Template.bind({});
WithImage.args = {
  src: "https://i.pravatar.cc/300",
  alt: "Avatar Image",
  size: "large",
  fallbackText: "A",
};
WithImage.storyName = "With Image";
WithImage.parameters = {
  docs: {
    storyDescription: "Avatar con una imagen proporcionada.",
  },
};

export const WithoutImage = Template.bind({});
WithoutImage.args = {
  src: "",
  alt: "No Image",
  fallbackText: "J",
  size: "medium",
  backgroundColor: "#3f51b5",
  textColor: "#fff",
};
WithoutImage.storyName = "Without Image";
WithoutImage.parameters = {
  docs: {
    storyDescription:
      "Avatar sin imagen, mostrando texto de respaldo (iniciales) y color de fondo personalizado.",
  },
};

export const WithMenu = Template.bind({});
WithMenu.args = {
  src: "https://i.pravatar.cc/300",
  alt: "User Avatar",
  size: "large",
  menuOptions: [
    { label: "Profile", onClick: () => alert("Profile clicked") },
    { label: "Logout", onClick: () => alert("Logout clicked") },
  ],
};
WithMenu.storyName = "With Menu";
WithMenu.parameters = {
  docs: {
    storyDescription:
      "Avatar que muestra un menú desplegable con opciones al hacer clic.",
  },
};

export const Loading = Template.bind({});
Loading.args = {
  src: "",
  alt: "Loading Avatar",
  fallbackText: "L",
  size: "large",
  isLoading: true,
};
Loading.storyName = "Loading";
Loading.parameters = {
  docs: {
    storyDescription:
      "Avatar mostrando un estado de carga (spinner) en lugar de la imagen o el texto de respaldo.",
  },
};

export const Disabled = Template.bind({});
Disabled.args = {
  src: "",
  alt: "Disabled Avatar",
  fallbackText: "D",
  size: "medium",
  disabled: true,
};
Disabled.storyName = "Disabled";
Disabled.parameters = {
  docs: {
    storyDescription:
      "Avatar deshabilitado que no responde a clics ni interacciones.",
  },
};
