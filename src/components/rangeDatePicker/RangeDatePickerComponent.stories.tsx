import { useState } from "react";
import { Meta, StoryFn } from "@storybook/react";
import CenteredTemplate from "../../stories/CenteredTemplate";
import { RangeDatePicker, RangeDatePickerProps } from ".";

export default {
  title: "Components/RangeDatePicker",
  component: RangeDatePicker,
  argTypes: {
    labelStart: {
      control: "text",
      description: "Etiqueta para el campo de fecha de inicio.",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "Fecha de Inicio" },
      },
    },
    labelEnd: {
      control: "text",
      description: "Etiqueta para el campo de fecha de finalización.",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "Fecha de Fin" },
      },
    },
    startDate: {
      control: "text",
      description: "Fecha de inicio seleccionada.",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "" },
      },
    },
    endDate: {
      control: "text",
      description: "Fecha de finalización seleccionada.",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "" },
      },
    },
    disablePast: {
      control: "boolean",
      description: "Deshabilita la selección de fechas pasadas.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    disableFuture: {
      control: "boolean",
      description: "Deshabilita la selección de fechas futuras.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    size: {
      control: { type: "select" },
      options: ["small", "medium"],
      description: "Tamaño del selector de fecha.",
      table: {
        type: { summary: `"small" | "medium"` },
        defaultValue: { summary: "medium" },
      },
    },
    disabledStart: {
      control: "boolean",
      description: "Deshabilita el campo de fecha de inicio.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    disabledEnd: {
      control: "boolean",
      description: "Deshabilita el campo de fecha de finalización.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    isLoading: {
      control: "boolean",
      description:
        "Muestra un skeleton cuando el componente está en estado de carga.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    onStartDateChange: {
      action: "changed",
      description: "Función ejecutada al cambiar la fecha de inicio.",
    },
    onEndDateChange: {
      action: "changed",
      description: "Función ejecutada al cambiar la fecha de fin.",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Selector de rango de fechas que permite elegir una fecha de inicio y de finalización, con la posibilidad de deshabilitar fechas pasadas o futuras, deshabilitar campos individualmente y mostrar un skeleton en estado de carga.",
      },
    },
  },
} as Meta<RangeDatePickerProps>;

const Template: StoryFn<RangeDatePickerProps> = (args) => {
  const [startDate, setStartDate] = useState(args.startDate);
  const [endDate, setEndDate] = useState(args.endDate);

  return (
    <CenteredTemplate>
      <RangeDatePicker
        {...args}
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={(e) => {
          setStartDate(e.target.value);
          args.onStartDateChange(e);
        }}
        onEndDateChange={(e) => {
          setEndDate(e.target.value);
          args.onEndDateChange(e);
        }}
      />
    </CenteredTemplate>
  );
};

// Historias

export const DisablePastDates = Template.bind({});
DisablePastDates.args = {
  labelStart: "Fecha de Inicio",
  labelEnd: "Fecha de Fin",
  startDate: "",
  endDate: "",
  disablePast: true,
  size: "medium",
  disabledStart: false,
  disabledEnd: false,
  isLoading: false,
  widthPercent: 30,
};
DisablePastDates.storyName = "Disable Past Dates";

export const DisableFutureDates = Template.bind({});
DisableFutureDates.args = {
  labelStart: "Fecha de Inicio",
  labelEnd: "Fecha de Fin",
  startDate: "",
  endDate: "",
  disableFuture: true,
  size: "medium",
  disabledStart: false,
  disabledEnd: false,
  isLoading: false,
  widthPercent: 30,
};
DisableFutureDates.storyName = "Disable Future Dates";

export const WithSkeleton = Template.bind({});
WithSkeleton.args = {
  labelStart: "Fecha de Inicio",
  labelEnd: "Fecha de Fin",
  startDate: "",
  endDate: "",
  size: "medium",
  isLoading: true,
  widthPercent: 30,
};
WithSkeleton.storyName = "With Skeleton";
WithSkeleton.parameters = {
  docs: {
    storyDescription:
      "Muestra un skeleton cuando el componente está en estado de carga.",
  },
};

export const DisabledIndividualFields = Template.bind({});
DisabledIndividualFields.args = {
  labelStart: "Fecha de Inicio",
  labelEnd: "Fecha de Fin",
  startDate: "",
  endDate: "",
  disabledStart: true,
  disabledEnd: false,
  widthPercent: 30,
};
DisabledIndividualFields.storyName = "Disabled Individual Fields";
DisabledIndividualFields.parameters = {
  docs: {
    storyDescription: "Deshabilita solo el campo de inicio.",
  },
};

export const DisabledRangeDatePicker = Template.bind({});
DisabledRangeDatePicker.args = {
  labelStart: "Fecha de Inicio",
  labelEnd: "Fecha de Fin",
  startDate: "",
  endDate: "",
  disabledStart: true,
  disabledEnd: true,
  widthPercent: 30,
};
DisabledRangeDatePicker.storyName = "Disabled Range Date Picker";
DisabledRangeDatePicker.parameters = {
  docs: {
    storyDescription: "Deshabilita ambos campos de fecha.",
  },
};

export const SmallRangeDatePicker = Template.bind({});
SmallRangeDatePicker.args = {
  labelStart: "Fecha de Inicio",
  labelEnd: "Fecha de Fin",
  startDate: "",
  endDate: "",
  size: "small",
  widthPercent: 30,
};
SmallRangeDatePicker.storyName = "Small Range Date Picker";
SmallRangeDatePicker.parameters = {
  docs: {
    storyDescription: "Muestra el componente en tamaño pequeño.",
  },
};

export const DisablePastAndFutureDates = Template.bind({});
DisablePastAndFutureDates.args = {
  labelStart: "Fecha de Inicio",
  labelEnd: "Fecha de Fin",
  startDate: "",
  endDate: "",
  disablePast: true,
  disableFuture: true,
  widthPercent: 30,
};
DisablePastAndFutureDates.storyName = "Disable Past and Future Dates";
DisablePastAndFutureDates.parameters = {
  docs: {
    storyDescription: "Deshabilita la selección de fechas pasadas y futuras.",
  },
};
