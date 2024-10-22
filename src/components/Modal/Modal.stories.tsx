import React, { useState } from "react";
import { Meta, StoryFn } from "@storybook/react";
import Modal, { ModalProps } from ".";
import { Button, Typography } from "@mui/material";
import CenteredTemplate from "../../stories/CenteredTemplate";

/**
 * Storybook configuration for the Modal component.
 *
 * @title Components/Modal
 * @component Modal
 *
 * @argTypes
 * @property {string} title - Title of the modal. Default: "Modal Title".
 * @property {string} content - Content of the modal. Default: "This is the modal content".
 * @property {string} confirmText - Text for the confirm button. Default: "Confirm".
 * @property {string} cancelText - Text for the cancel button. Default: "Cancel".
 * @property {"default" | "success" | "warning" | "error" | "info"} variant - Modal variant. Default: "default".
 * @property {boolean} importantAction - Require confirmation before closing the modal. Default: false.
 * @property {boolean} open - Determines if the modal is open or closed. Default: true.
 */
export default {
  title: "Components/Modal",
  component: Modal,
  argTypes: {
    title: {
      control: "text",
      description: "Title of the modal.",
      defaultValue: "Modal Title",
    },
    content: {
      control: "text",
      description: "Content of the modal.",
      defaultValue: "This is the modal content.",
    },
    confirmText: {
      control: "text",
      description: "Text for the confirm button.",
      defaultValue: "Confirm",
    },
    cancelText: {
      control: "text",
      description: "Text for the cancel button.",
      defaultValue: "Cancel",
    },
    variant: {
      control: { type: "select" },
      options: ["default", "success", "warning", "error", "info"],
      description: "Modal variant.",
      defaultValue: "default",
    },
    importantAction: {
      control: "boolean",
      description: "Require confirmation before closing the modal.",
      defaultValue: false,
    },
    open: {
      control: "boolean",
      description: "Determines if the modal is open or closed.",
      defaultValue: true,
    },
  },
} as Meta;

const Template: StoryFn<ModalProps> = (args) => {
  const [open, setOpen] = useState(args.isOpen);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <CenteredTemplate>
      <Button variant="contained" onClick={handleOpen}>
        Open Modal
      </Button>
      <Modal
        {...args}
        isOpen={open}
        onClose={handleClose}
        onConfirm={() => {
          alert("Action confirmed!");
          handleClose();
        }}
      />
    </CenteredTemplate>
  );
};

export const Default = Template.bind({});
Default.args = {
  title: "Default Modal",
  content: (
    <Typography>
      This is the default modal content. You can customize the modal content and
      actions.
    </Typography>
  ),
  variant: "default",
  importantAction: false,
};

export const SuccessModal = Template.bind({});
SuccessModal.args = {
  title: "Success Modal",
  content: <Typography>Operation successful.</Typography>,
  variant: "success",
  importantAction: true,
};

export const WarningModal = Template.bind({});
WarningModal.args = {
  title: "Warning Modal",
  content: <Typography>Please pay attention before proceeding.</Typography>,
  variant: "warning",
  importantAction: true,
};

export const ErrorModal = Template.bind({});
ErrorModal.args = {
  title: "Error Modal",
  content: <Typography>An error occurred.</Typography>,
  variant: "error",
  importantAction: true,
};

export const InfoModal = Template.bind({});
InfoModal.args = {
  title: "Information Modal",
  content: <Typography>This is an informational message.</Typography>,
  variant: "info",
  importantAction: false,
};
