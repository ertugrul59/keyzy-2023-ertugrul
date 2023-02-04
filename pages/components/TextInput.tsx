import * as React from 'react';
import { TextField } from '@mui/material';
import axios from 'axios'

interface TextInputProps {
  onChange: (value: string) => void;
  value:  string;

  onChangeListingPrice: (value: string) => void;
  onChangePostCode: (value: string) => void;
}

const apiCallFunc = async (url: string) => {
    if(url){
        const res = await axios.post('/api/get_page', { url } )
        return res;
    }
};

// const checkPricePostcodeCondition = (res: any) => {
//     return res?.data.price && res?.data.price.length && res?.data.postcode && res?.data.postcode.length;
// };


const TextInput: React.FC<TextInputProps> = ({ value, onChange, onChangeListingPrice, onChangePostCode}) => {
  const [displayError, setDisplayError] = React.useState<boolean>(false);

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
       } else {
        setDisplayError(true);
       }

       if(value) {
        apiCallFunc(value)
        .then((res) => {
          console.log('price:', res?.data.price);
          console.log('postcode:', res?.data.postcode);
          onChangeListingPrice(res?.data.price ? res.data.price : '');
          onChangePostCode(res?.data.postcode ? res.data.postcode : '');
        })
        .catch(() => {
          console.log('Error occured when fetching webpage');
          onChangeListingPrice('');
          onChangePostCode('');
        });
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
