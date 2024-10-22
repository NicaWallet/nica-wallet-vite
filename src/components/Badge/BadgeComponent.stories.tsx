import { Meta, StoryFn } from "@storybook/react";
import BadgeComponent, { BadgeComponentProps } from ".";
import CenteredTemplate from "../../stories/CenteredTemplate"; // Asegúrate de tener este componente

export default {
  title: "Components/BadgeComponent",
  component: BadgeComponent,
  argTypes: {
    count: {
      control: "number",
      description: "Número de elementos a mostrar en el badge.",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "0" },
      },
    },
    maxCount: {
      control: "number",
      description:
        "Máximo número de elementos que se muestran antes de ser truncado.",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "99" },
      },
    },
    sx: {
      control: false,
      description: "Estilos personalizados adicionales aplicados al Badge.",
      table: {
        type: { summary: "SxProps<Theme>" },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Componente Badge reutilizable que muestra un número de elementos con un estilo mejorado, incluyendo límites máximos y personalización de estilos.",
      },
    },
  },
} as Meta<BadgeComponentProps>;

const Template: StoryFn<BadgeComponentProps> = (args) => (
  <CenteredTemplate>
    <BadgeComponent {...args} />
  </CenteredTemplate>
);

/**
 * WithCount: Story showing the badge with a count of notifications.
 */
export const WithCount = Template.bind({});
WithCount.args = {
  count: 42,
};
WithCount.storyName = "With Count";
WithCount.parameters = {
  docs: {
    storyDescription:
      "Badge que muestra un número de notificaciones (42 en este caso).",
  },
};

/**
 * WithMaxCount: Story demonstrating the badge with a maximum count limit.
 */
export const WithMaxCount = Template.bind({});
WithMaxCount.args = {
  count: 150,
  maxCount: 99,
};
WithMaxCount.storyName = "With Max Count";
WithMaxCount.parameters = {
  docs: {
    storyDescription:
      "Badge que muestra `99+` cuando el número excede el límite de `99`.",
  },
};

/**
 * WithCustomStyles: Story for the badge demonstrating custom styles.
 */
export const WithCustomStyles = Template.bind({});
WithCustomStyles.args = {
  count: 5,
  sx: {
    "& .MuiBadge-badge": {
      backgroundColor: "#4caf50", // Color verde para notificaciones de éxito
      color: "#fff",
    },
  },
};
WithCustomStyles.storyName = "With Custom Styles";
WithCustomStyles.parameters = {
  docs: {
    storyDescription:
      "Badge que muestra un estilo personalizado con un fondo verde.",
  },
};
