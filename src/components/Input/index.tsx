import React from "react";
import { TextField, TextFieldProps } from "@mui/material";

interface InputFieldProps extends Omit<TextFieldProps, "label"> {
  label: string;
  errorText?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  errorText,
  ...props
}) => {
  return (
    <TextField
      label={label}
      error={!!errorText}
      helperText={errorText}
      fullWidth
      {...props} // Esto permite que el componente acepte cualquier prop del componente TextField
    />
  );
};

export default InputField;
