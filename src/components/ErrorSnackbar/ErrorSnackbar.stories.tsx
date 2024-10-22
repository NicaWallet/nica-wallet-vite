import React, { useState } from "react";
import { Meta, StoryFn } from "@storybook/react";
import ErrorSnackbar, { ErrorSnackbarProps } from ".";
import CenteredTemplate from "../../stories/CenteredTemplate";

export default {
  title: "Components/ErrorSnackbar",
  component: ErrorSnackbar,
  argTypes: {
    message: {
      control: "text",
      defaultValue: "Ocurrió un error inesperado",
    },
    severity: {
      control: { type: "select" },
      options: ["error", "warning", "info", "success"],
      defaultValue: "error",
    },
    autoHideDuration: {
      control: "number",
      defaultValue: 6000,
    },
    anchorOrigin: {
      control: "object",
      defaultValue: { vertical: "bottom", horizontal: "center" },
    },
    dismissOnClickAway: {
      control: "boolean",
      defaultValue: true,
    },
  },
} as Meta<ErrorSnackbarProps>;

const Template: StoryFn<ErrorSnackbarProps> = (args) => {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <CenteredTemplate>
      {open && <ErrorSnackbar {...args} onClose={handleClose} />}
      <button onClick={() => setOpen(true)}>Mostrar Snackbar</button>
    </CenteredTemplate>
  );
};

// Historias

export const DefaultSnackbar = Template.bind({});
DefaultSnackbar.args = {
  message: "Ocurrió un error inesperado",
  severity: "error",
};
DefaultSnackbar.storyName = "Default Snackbar";

export const SuccessSnackbar = Template.bind({});
SuccessSnackbar.args = {
  message: "Operación exitosa",
  severity: "success",
  autoHideDuration: 3000,
};
SuccessSnackbar.storyName = "Success Snackbar";

export const WarningSnackbar = Template.bind({});
WarningSnackbar.args = {
  message: "Advertencia importante",
  severity: "warning",
  anchorOrigin: { vertical: "top", horizontal: "right" },
};
WarningSnackbar.storyName = "Warning Snackbar";

export const InfoSnackbar = Template.bind({});
InfoSnackbar.args = {
  message: "Información importante",
  severity: "info",
  dismissOnClickAway: false,
};
InfoSnackbar.storyName = "Info Snackbar";
