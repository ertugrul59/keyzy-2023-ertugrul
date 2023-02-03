import * as React from 'react';
import { TextField } from '@mui/material';

interface DecimalInputProps {
  onChange: (value: number | string) => void;
  value:  number | string;
}

const DecimalInput: React.FC<DecimalInputProps> = ({ value, onChange }) => {
  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      if ((parseFloat(value) >= 4.5 && parseFloat(value) <= 9)) {
        onChange(value);
      } 

      if(!value || value.toString().length > 3 ){
        onChange(4.5);
      }
    },
    [onChange]
  );

  return (
    <TextField
      type="number"
      // color="#ff0000"
      inputProps={{ step: 0.1,
        // style: {
        //   color: '#F39237'
        // }
      }}
      color="secondary"
      onChange={handleChange}
      value={value}
      size="small"
      // color="secondary"
    />
  );
};

export default DecimalInput;
