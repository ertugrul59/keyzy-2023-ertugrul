import * as React from "react";
import TextField from "@mui/material/TextField";

interface DecimalInputProps {
  onChange: (value: number) => void;
  value: number;
}

const DecimalInput: React.FC<DecimalInputProps> = ({ value, onChange }) => {
  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseFloat(event.target.value);
      if (value >= 4.5 && value <= 9) {
        onChange(value);
      }

      if (!value || value.toString().length > 3) {
        onChange(4.5);
      }
    },
    [onChange]
  );

  return (
    <TextField
      id="TextFieldNumber"
      type="number"
      inputProps={{ step: 0.1, className: "text-sm desktop:text-base" }}
      color="secondary"
      onChange={handleChange}
      value={value}
      size="small"
    />
  );
};

export default DecimalInput;
