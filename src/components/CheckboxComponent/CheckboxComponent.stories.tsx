import { Meta, StoryFn } from "@storybook/react";
import CenteredTemplate from "../../stories/CenteredTemplate";
import { action } from "@storybook/addon-actions";
import CheckboxComponent, { CheckboxComponentProps } from ".";

export default {
  title: "Components/CheckboxComponent",
  component: CheckboxComponent,
  argTypes: {
    label: {
      control: "text",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "Label" },
      },
    },
    checked: {
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    onChange: {
      action: "checkbox-changed",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Componente de checkbox reutilizable construido con Material-UI que muestra una etiqueta y gestiona su estado de selección.",
      },
    },
  },
} as Meta<CheckboxComponentProps>;

const Template: StoryFn<CheckboxComponentProps> = (args) => (
  <CenteredTemplate>
    <CheckboxComponent {...args} />
  </CenteredTemplate>
);

// Historias

export const Default = Template.bind({});
Default.args = {
  label: "Default Checkbox",
  checked: false,
  onChange: action("Checkbox desmarcado/marcado"),
};
Default.storyName = "Default";
Default.parameters = {
  docs: {
    storyDescription: "Checkbox en su estado predeterminado (desmarcado).",
  },
};

export const Checked = Template.bind({});
Checked.args = {
  label: "Checked Checkbox",
  checked: true,
  onChange: action("Checkbox desmarcado/marcado"),
};
Checked.storyName = "Checked";
Checked.parameters = {
  docs: {
    storyDescription: "Checkbox en estado marcado.",
  },
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: "Disabled Checkbox",
  checked: false,
  onChange: action("Checkbox desmarcado/marcado"),
};
Disabled.decorators = [
  (Story) => (
    <div style={{ opacity: 0.5 }}>
      <Story />
    </div>
  ),
];
Disabled.storyName = "Disabled";
Disabled.parameters = {
  docs: {
    storyDescription: "Checkbox deshabilitado y no interactivo.",
  },
};

export const WithLongLabel = Template.bind({});
WithLongLabel.args = {
  label:
    "Este es un checkbox con una etiqueta muy larga para demostrar cómo se comporta el componente cuando la etiqueta excede el espacio disponible.",
  checked: false,
  onChange: action("Checkbox desmarcado/marcado"),
};
WithLongLabel.storyName = "With Long Label";
WithLongLabel.parameters = {
  docs: {
    storyDescription:
      "Checkbox con una etiqueta larga para demostrar la capacidad de manejo de texto extenso.",
  },
};

export const Interactive = Template.bind({});
Interactive.args = {
  label: "Interactive Checkbox",
  checked: false,
  onChange: action("Checkbox desmarcado/marcado"),
};
Interactive.storyName = "Interactive";
Interactive.parameters = {
  docs: {
    storyDescription:
      "Checkbox que permite interactuar con sus propiedades mediante controles de Storybook.",
  },
};
