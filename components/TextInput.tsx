import * as React from "react";
import { TextField } from "@mui/material";
import axios from "axios";

interface TextInputProps {
  onChange: (value: string) => void;
  value: string;

  onChangeListingPrice: (value: string) => void;
  onChangePostCode: (value: string) => void;
}

const apiCallFunc = async (url: string) => {
  if (url) {
    const res = await axios.post("/api/get_page", { url });
    return res;
  }
};

const TextInput: React.FC<TextInputProps> = ({
  value,
  onChange,
  onChangeListingPrice,
  onChangePostCode,
}) => {
  const [displayError, setDisplayError] = React.useState<boolean>(false);

  const inputUrlValidator = (rawInputText: string) => {
    const inputText = rawInputText.replace(/^\s+|\s+$/gm, ""); // remove spaces
    return (
      inputText.startsWith("https://www.rightmove.co.uk/properties/") &&
      inputText.endsWith("#")
    );
  };

  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      if (inputUrlValidator(value)) {
        setDisplayError(false);
      } else {
        setDisplayError(true);
      }

      if (value) {
        apiCallFunc(value)
          .then((res) => {
            onChangeListingPrice(res?.data.price ? res.data.price : "");
            onChangePostCode(res?.data.postcode ? res.data.postcode : "");
          })
          .catch(() => {
            console.log("Error occured when fetching webpage");
            onChangeListingPrice("");
            onChangePostCode("");
          });
      }

      onChange(value);
    },
    [onChange]
  );

  return (
    <TextField
      className="text-sm desktop:text-base"
      id="TextField"
      type="text"
      color="secondary"
      onChange={handleChange}
      value={value}
      size="small"
      placeholder="Please enter"
      error={displayError}
      inputProps={{ className: "text-sm desktop:text-base" }}
    />
  );
};

export default TextInput;
