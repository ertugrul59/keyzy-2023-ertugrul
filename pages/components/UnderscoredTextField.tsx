import React from 'react';
import { Theme, createStyles } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        // margin: theme.spacing(1),
        width: 200,
      },
    },
  })
);

interface Props {
  label: string;
  type?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const UnderscoredTextField: React.FC<Props> = ({ label, type = 'text', value, onChange }) => {
  const classes: any = useStyles();

  return (
    <div className={classes.root}>
      <TextField
        label={label}
        type={type}
        value={value}
        onChange={onChange}
        variant="outlined"
      />
    </div>
  );
};

export default UnderscoredTextField;
