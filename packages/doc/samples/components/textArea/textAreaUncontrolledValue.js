import React, { useState } from "react";
import HvTextArea from "@hv/uikit-react-core/dist/TextArea";
import Button from "@hv/uikit-react-core/dist/Button";

const labels = {
  inputLabel: "Label",
  placeholder: "Enter value"
};

const btnStyle = {
  width: "50px",
  height: "50px",
  margin: "10px"
};

function WrapperComp() {
  const [value, setValue] = useState();

  // to be possible to change the input value by user action
  const setterValue = value => {
    setValue(value);
    return value;
  };

  return (
    <>
      <Button style={btnStyle} onClick={() => setValue("First value")}>
        First value
      </Button>
      <Button style={btnStyle} onClick={() => setValue("Second value")}>
        Second value
      </Button>
      <Button style={btnStyle} onClick={() => setValue("Third value")}>
        Third value
      </Button>

      <HvTextArea
        initialValue="Initial State"
        inputValue={value}
        rows={5}
        labels={labels}
        onChange={setterValue}
      />
    </>
  );
}

export default <WrapperComp />;
