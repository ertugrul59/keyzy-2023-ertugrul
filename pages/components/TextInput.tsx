import * as React from 'react';
import { TextField } from '@mui/material';
import axios from 'axios'

interface TextInputProps {
  onChange: (value: string) => void;
  value:  string;
}

const apiCallFunc = async (url: string) => {
    if(url){
        const res = await axios.post('/api/get_page', { url } )

        return res;
    }


}

const TextInput: React.FC<TextInputProps> = ({ value, onChange }) => {
  const [displayError, setDisplayError] = React.useState<boolean>(false);


    React.useEffect(() => {
        // await async "fetchBooks()" function
        if(value) {
            apiCallFunc(value)
            .then((res) => {
              console.log('res:', res);
            })
            .catch(() => {
              console.log('Error occured when fetching books');
            });
        }
      }, [value]);

  const inputUrlValidator = (rawInputText: string) => {
    const inputText = rawInputText.replace(/^\s+|\s+$/gm,''); // remove spaces
    return inputText.startsWith("https://www.rightmove.co.uk/properties/") && inputText.endsWith('#');
  };

  const handleChange = React.useCallback( 
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      console.log('value:', value);
      if(inputUrlValidator(value)){
        setDisplayError(false);
        // const response = apiCallFunc(value);
        // apiCallFunc(value).then((res) => {
        //       console.log('res:');
        //     })
        //     .catch(() => {
        //       console.log('Error occured when fetching books');
        //     });
        // // console.log('response:', response);
       } else {
        setDisplayError(true);
       }

      console.log('inputUrlValidator:', inputUrlValidator(value));

      onChange(value);
    },
    [onChange]
  );

  return (
    <TextField
      id="TextField"
      type="text"
      color="secondary"
      onChange={handleChange}
      value={value}
      size="small"
      placeholder="Please enter"
      error={displayError}
    />
  );
};

export default TextInput;
