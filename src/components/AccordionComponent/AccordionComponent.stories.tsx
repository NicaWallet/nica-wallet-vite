import { Meta, StoryFn } from "@storybook/react";
import AccordionComponent, { AccordionComponentProps } from ".";
import CenteredTemplate from "../../stories/CenteredTemplate";

export default {
  title: "Components/AccordionComponent",
  component: AccordionComponent,
  argTypes: {
    title: {
      control: "text",
      description: "Título del acordeón.",
      defaultValue: "Título del Acordeón",
    },
    content: {
      control: "text",
      description: "Contenido dentro del acordeón.",
      defaultValue: "Este es el contenido del acordeón.",
    },
    isLoading: {
      control: "boolean",
      description: "Mostrar skeleton en lugar del contenido.",
      defaultValue: false,
    },
    defaultExpanded: {
      control: "boolean",
      description: "Indica si el acordeón está expandido por defecto.",
      defaultValue: false,
    },
    disabled: {
      control: "boolean",
      description: "Deshabilitar el acordeón.",
      defaultValue: false,
    },
    width: {
      control: "text",
      description: "Ancho del acordeón (porcentaje o px).",
      defaultValue: "40%",
    },
  },
} as Meta<AccordionComponentProps>;

const Template: StoryFn<AccordionComponentProps> = (args) => (
  <CenteredTemplate>
    <AccordionComponent {...args} />
  </CenteredTemplate>
);

/**
 * DefaultAccordion: Story for the default state of the AccordionComponent.
 */
export const DefaultAccordion = Template.bind({});
DefaultAccordion.args = {
  title: "Título del Acordeón",
  content: "Este es el contenido del acordeón.",
  isLoading: false,
  defaultExpanded: false,
  disabled: false,
  width: "40%",
};
DefaultAccordion.storyName = "Default Accordion";

/**
 * AccordionWithSkeleton: Story for the AccordionComponent with skeleton loading.
 */
export const AccordionWithSkeleton = Template.bind({});
AccordionWithSkeleton.args = {
  title: "Título del Acordeón",
  content: "Este es el contenido del acordeón.",
  isLoading: true,
  defaultExpanded: false,
  disabled: false,
  width: "40%",
};
AccordionWithSkeleton.storyName = "Accordion With Skeleton";

/**
 * DefaultExpandedAccordion: Story for the AccordionComponent with default expanded state.
 */
export const DefaultExpandedAccordion = Template.bind({});
DefaultExpandedAccordion.args = {
  title: "Título del Acordeón",
  content: "Este es el contenido del acordeón.",
  isLoading: false,
  defaultExpanded: true,
  disabled: false,
  width: "40%",
};
DefaultExpandedAccordion.storyName = "Default Expanded Accordion";

/**
 * DisabledAccordion: Story for the disabled state of the AccordionComponent.
 */
export const DisabledAccordion = Template.bind({});
DisabledAccordion.args = {
  title: "Título del Acordeón",
  content: "Este es el contenido del acordeón.",
  isLoading: false,
  defaultExpanded: false,
  disabled: true,
  width: "40%",
};
DisabledAccordion.storyName = "Disabled Accordion";

/**
 * CustomWidthAccordion: Story for the AccordionComponent with custom width.
 */
export const CustomWidthAccordion = Template.bind({});
CustomWidthAccordion.args = {
  title: "Título del Acordeón",
  content: "Este es el contenido del acordeón.",
  isLoading: false,
  defaultExpanded: false,
  disabled: false,
  width: "50%",
};
CustomWidthAccordion.storyName = "Custom Width Accordion";
