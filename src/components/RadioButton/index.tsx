import React from "react";
import { Radio, FormControlLabel } from "@mui/material";

interface RadioButtonComponentProps {
  label: string;
  value: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const RadioButtonComponent: React.FC<RadioButtonComponentProps> = ({
  label,
  value,
  checked,
  onChange,
}) => {
  return (
    <FormControlLabel
      control={<Radio checked={checked} onChange={onChange} value={value} />}
      label={label}
    />
  );
};

export default RadioButtonComponent;
