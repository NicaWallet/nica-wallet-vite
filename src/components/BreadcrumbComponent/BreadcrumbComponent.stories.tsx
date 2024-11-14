import { Meta, StoryFn } from "@storybook/react";
import BreadcrumbComponent, { BreadcrumbComponentProps } from ".";
import CenteredTemplate from "../../stories/CenteredTemplate"; // Asegúrate de tener este componente

export default {
  title: "Components/BreadcrumbComponent",
  component: BreadcrumbComponent,
  argTypes: {
    links: {
      control: "object",
      description: "Lista de enlaces para las rutas del breadcrumb.",
      table: {
        type: { summary: "Array<{ label: string, href: string }>" },
        defaultValue: { summary: "[]" },
      },
    },
    current: {
      control: "text",
      description: "Texto de la página actual en el breadcrumb.",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "Current Page" },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Componente de breadcrumb que muestra la ruta de navegación con enlaces interactivos y una página actual resaltada.",
      },
    },
  },
} as Meta<BreadcrumbComponentProps>;

const Template: StoryFn<BreadcrumbComponentProps> = (args) => (
  <CenteredTemplate>
    <BreadcrumbComponent {...args} />
  </CenteredTemplate>
);

// Historias

// 1. Breadcrumb con Varios Enlaces
export const WithLinks = Template.bind({});
WithLinks.args = {
  links: [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Electronics", href: "/products/electronics" },
  ],
  current: "Laptops",
};
WithLinks.storyName = "With Links";
WithLinks.parameters = {
  docs: {
    storyDescription:
      "Breadcrumb que muestra varios enlaces con la ruta hacia la página actual.",
  },
};

// 2. Breadcrumb Simple
export const SimpleBreadcrumb = Template.bind({});
SimpleBreadcrumb.args = {
  links: [{ label: "Home", href: "/" }],
  current: "Dashboard",
};
SimpleBreadcrumb.storyName = "Simple Breadcrumb";
SimpleBreadcrumb.parameters = {
  docs: {
    storyDescription: "Breadcrumb simple con un solo enlace hacia el home.",
  },
};
