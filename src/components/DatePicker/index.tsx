import React from "react";
import { TextField } from "@mui/material";

interface DatePickerComponentProps {
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const DatePickerComponent: React.FC<DatePickerComponentProps> = ({
  label,
  value,
  onChange,
}) => {
  return (
    <TextField
      label={label}
      type="date"
      value={value}
      onChange={onChange}
      InputLabelProps={{ shrink: true }}
    />
  );
};

export default DatePickerComponent;
