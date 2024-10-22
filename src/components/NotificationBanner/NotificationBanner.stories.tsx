import React, { useState } from "react";
import { Meta, StoryFn } from "@storybook/react";
import NotificationBanner, { NotificationBannerProps } from ".";
import { Button } from "@mui/material";
import CenteredTemplate from "../../stories/CenteredTemplate";

export default {
  title: "Components/NotificationBanner",
  component: NotificationBanner,
  argTypes: {
    message: {
      control: "text",
      description: "Mensaje que se mostrará en la notificación.",
      defaultValue: "This is a notification",
    },
    severity: {
      control: { type: "select" },
      options: ["error", "warning", "info", "success"],
      description: "El nivel de severidad de la notificación.",
      defaultValue: "info",
    },
    variant: {
      control: { type: "select" },
      options: [
        "default",
        "topRight",
        "topLeft",
        "bottomRight",
        "bottomLeft",
        "longDuration",
      ],
      description: "Ubicación y duración predefinidas de la notificación.",
      defaultValue: "default",
    },
  },
} as Meta;

/**
 * Template for rendering the NotificationBanner component in Storybook.
 * @param args - The props for the NotificationBanner component.
 * @returns A React component.
 */
const Template: StoryFn<NotificationBannerProps> = (args) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason !== "clickaway") {
      setOpen(false);
    }
  };

  return (
    <CenteredTemplate>
      <Button variant="contained" onClick={handleOpen}>
        Show Notification
      </Button>
      <NotificationBanner {...args} open={open} onClose={handleClose} />
    </CenteredTemplate>
  );
};

// Default notification variant
export const Default = Template.bind({});
Default.args = {
  message: "This is a default notification",
  severity: "info",
  variant: "default",
};

// Success notification variant
export const SuccessNotification = Template.bind({});
SuccessNotification.args = {
  message: "Operation successful!",
  severity: "success",
  variant: "topRight",
};

// Warning notification variant
export const WarningNotification = Template.bind({});
WarningNotification.args = {
  message: "This is a warning.",
  severity: "warning",
  variant: "bottomRight",
};

// Error notification variant
export const ErrorNotification = Template.bind({});
ErrorNotification.args = {
  message: "An error occurred!",
  severity: "error",
  variant: "bottomLeft",
};

// Long duration notification variant
export const LongDurationNotification = Template.bind({});
LongDurationNotification.args = {
  message: "This notification will stay longer.",
  severity: "info",
  variant: "longDuration",
};
