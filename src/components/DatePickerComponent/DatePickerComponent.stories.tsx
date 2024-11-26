import React, { useState } from "react";
import { Meta, StoryFn } from "@storybook/react";
import DatePickerComponent, { DatePickerComponentProps } from ".";
import CenteredTemplate from "../../stories/CenteredTemplate";

export default {
  title: "Components/DatePickerComponent",
  component: DatePickerComponent,
  argTypes: {
    label: {
      control: "text",
      defaultValue: "Fecha",
    },
    value: {
      control: "text",
      defaultValue: "",
    },
    disablePast: {
      control: "boolean",
      defaultValue: false,
    },
    disableFuture: {
      control: "boolean",
      defaultValue: false,
    },
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
      defaultValue: "medium",
    },
    isLoading: {
      control: "boolean",
      defaultValue: false,
    },
    width: {
      control: "text",
      description:
        "Ancho personalizado para el componente (en porcentaje o px).",
      defaultValue: "100%",
    },
  },
} as Meta<DatePickerComponentProps>;

const Template: StoryFn<DatePickerComponentProps> = (args) => {
  const [value, setValue] = useState(args.value);

  return (
    <CenteredTemplate>
      <DatePickerComponent
        {...args}
        value={value}
        onChange={(date: string) => setValue(date)}
      />
    </CenteredTemplate>
  );
};

// Historias

export const SmallDatePicker = Template.bind({});
SmallDatePicker.args = {
  label: "Fecha de Inicio",
  value: "",
  size: "small",
  width: "20%",
};
SmallDatePicker.storyName = "Small Date Picker";

export const MediumDatePicker = Template.bind({});
MediumDatePicker.args = {
  label: "Fecha de Inicio",
  value: "",
  size: "medium",
  width: "20%",
};
MediumDatePicker.storyName = "Medium Date Picker";

export const LargeDatePicker = Template.bind({});
LargeDatePicker.args = {
  label: "Fecha de Inicio",
  value: "",
  size: "large",
  width: "20%",
};
LargeDatePicker.storyName = "Large Date Picker";

export const WithSkeleton = Template.bind({});
WithSkeleton.args = {
  label: "Fecha de Inicio",
  value: "",
  size: "medium",
  isLoading: true,
  width: "20%",
};
WithSkeleton.storyName = "With Skeleton";

export const CustomWidth = Template.bind({});
CustomWidth.args = {
  label: "Fecha de Inicio",
  value: "",
  size: "medium",
  width: "80%",
};
CustomWidth.storyName = "Custom Width";
