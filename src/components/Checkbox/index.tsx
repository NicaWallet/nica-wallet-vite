import React from "react";
import { Checkbox, FormControlLabel } from "@mui/material";

export interface CheckboxComponentProps {
  label: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CheckboxComponent: React.FC<CheckboxComponentProps> = ({
  label,
  checked,
  onChange,
}) => {
  return (
    <FormControlLabel
      control={<Checkbox checked={checked} onChange={onChange} />}
      label={label}
    />
  );
};

export default CheckboxComponent;
