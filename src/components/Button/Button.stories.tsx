import { Meta, StoryFn } from "@storybook/react";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import CenteredTemplate from "../../stories/CenteredTemplate";
import Button, { ButtonProps } from ".";

export default {
  title: "Components/Button",
  component: Button,
  argTypes: {
    label: {
      control: "text",
      description: "Texto que se mostrará dentro del botón",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "Button" },
      },
    },
    onClick: {
      action: "clicked",
      description: "Función que se ejecuta al hacer clic",
    },
    color: {
      control: { type: "select" },
      options: ["primary", "secondary", "error", "warning"],
      description: "Color del botón",
      table: {
        type: { summary: `"primary" | "secondary" | "error" | "warning"` },
        defaultValue: { summary: `"primary"` },
      },
    },
    variant: {
      control: { type: "select" },
      options: ["contained", "outlined", "text"],
      description: "Variante del botón",
      table: {
        type: { summary: `"contained" | "outlined" | "text"` },
        defaultValue: { summary: `"contained"` },
      },
    },
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
      description: "Tamaño del botón",
      table: {
        type: { summary: `"small" | "medium" | "large"` },
        defaultValue: { summary: `"medium"` },
      },
    },
    isLoading: {
      control: { type: "boolean" },
      description: "Muestra un indicador de carga y deshabilita el botón",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" }, // Cambiado a cadena de texto
      },
    },
    startIcon: {
      control: false,
      description: "Ícono que se muestra al inicio del botón",
      table: {
        type: { summary: "React.ReactNode" },
      },
    },
    endIcon: {
      control: false,
      description: "Ícono que se muestra al final del botón",
      table: {
        type: { summary: "React.ReactNode" },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Botón reutilizable construido con Material-UI que soporta múltiples variantes, tamaños, colores, y estados de carga.",
      },
    },
  },
} as Meta<ButtonProps>;

const Template: StoryFn<ButtonProps> = (args) => (
  <CenteredTemplate>
    <Button {...args} />
  </CenteredTemplate>
);

// Variantes Básicas
export const Primary = Template.bind({});
Primary.args = {
  label: "Primary Button",
  color: "primary",
  variant: "contained",
  size: "medium",
  isLoading: false,
};
Primary.storyName = "Primary";
Primary.parameters = {
  docs: {
    storyDescription:
      "Botón principal con variante `contained` y color `primary`.",
  },
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: "Secondary Button",
  color: "secondary",
  variant: "outlined",
  size: "medium",
  isLoading: false,
};
Secondary.storyName = "Secondary";
Secondary.parameters = {
  docs: {
    storyDescription:
      "Botón secundario con variante `outlined` y color `secondary`.",
  },
};

export const Error = Template.bind({});
Error.args = {
  label: "Error Button",
  color: "error",
  variant: "contained",
  size: "medium",
  isLoading: false,
};
Error.storyName = "Error";
Error.parameters = {
  docs: {
    storyDescription:
      "Botón de error con variante `contained` y color `error`.",
  },
};

export const Warning = Template.bind({});
Warning.args = {
  label: "Warning Button",
  color: "warning",
  variant: "text",
  size: "medium",
  isLoading: false,
};
Warning.storyName = "Warning";
Warning.parameters = {
  docs: {
    storyDescription:
      "Botón de advertencia con variante `text` y color `warning`.",
  },
};

// Tamaños
export const Small = Template.bind({});
Small.args = {
  label: "Small Button",
  size: "small",
};
Small.storyName = "Small";
Small.parameters = {
  docs: {
    storyDescription: "Botón de tamaño pequeño.",
  },
};

export const Large = Template.bind({});
Large.args = {
  label: "Large Button",
  size: "large",
};
Large.storyName = "Large";
Large.parameters = {
  docs: {
    storyDescription: "Botón de tamaño grande.",
  },
};

// Estado de Carga
export const Loading = Template.bind({});
Loading.args = {
  label: "Loading Button",
  isLoading: true,
};
Loading.storyName = "Loading";
Loading.parameters = {
  docs: {
    storyDescription:
      "Botón en estado de carga, muestra un indicador y está deshabilitado.",
  },
};

// Íconos
export const WithStartIcon = Template.bind({});
WithStartIcon.args = {
  label: "Save",
  startIcon: <SaveIcon />,
};
WithStartIcon.storyName = "With Start Icon";
WithStartIcon.parameters = {
  docs: {
    storyDescription: "Botón con un ícono al inicio (SaveIcon).",
  },
};

export const WithEndIcon = Template.bind({});
WithEndIcon.args = {
  label: "Delete",
  endIcon: <DeleteIcon />,
};
WithEndIcon.storyName = "With End Icon";
WithEndIcon.parameters = {
  docs: {
    storyDescription: "Botón con un ícono al final (DeleteIcon).",
  },
};

export const WithBothIcons = Template.bind({});
WithBothIcons.args = {
  label: "Add & Save",
  startIcon: <AddIcon />,
  endIcon: <SaveIcon />,
};
WithBothIcons.storyName = "With Both Icons";
WithBothIcons.parameters = {
  docs: {
    storyDescription:
      "Botón con íconos al inicio (AddIcon) y al final (SaveIcon).",
  },
};

// Variantes Combinadas
export const ContainedPrimaryLarge = Template.bind({});
ContainedPrimaryLarge.args = {
  label: "Contained Primary Large",
  color: "primary",
  variant: "contained",
  size: "large",
};
ContainedPrimaryLarge.storyName = "Contained Primary Large";
ContainedPrimaryLarge.parameters = {
  docs: {
    storyDescription: "Botón `contained` de color `primary` y tamaño `large`.",
  },
};

export const OutlinedSecondarySmall = Template.bind({});
OutlinedSecondarySmall.args = {
  label: "Outlined Secondary Small",
  color: "secondary",
  variant: "outlined",
  size: "small",
};
OutlinedSecondarySmall.storyName = "Outlined Secondary Small";
OutlinedSecondarySmall.parameters = {
  docs: {
    storyDescription: "Botón `outlined` de color `secondary` y tamaño `small`.",
  },
};

export const TextWarningLoading = Template.bind({});
TextWarningLoading.args = {
  label: "Text Warning Loading",
  color: "warning",
  variant: "text",
  isLoading: true,
};
TextWarningLoading.storyName = "Text Warning Loading";
TextWarningLoading.parameters = {
  docs: {
    storyDescription: "Botón `text` de color `warning` en estado de carga.",
  },
};
