import React, { useState } from "react";
import HvTextArea from "@hv/uikit-react-core/dist/TextArea";
import Button from "@hv/uikit-react-core/dist/Button";

const labels = {
  inputLabel: "Label",
  placeholder: "Enter value"
};

const btnStyle = {
  width: "130px",
  height: "32px",
  margin: "0 10px 30px 0"
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
        value={value}
        rows={5}
        labels={labels}
        onChange={setterValue}
      />
    </>
  );
}

export default <WrapperComp />;
