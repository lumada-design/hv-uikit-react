import React, { useState } from "react";
import HvInput from "@hv/uikit-react-core/dist/Input";
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
  const [value, setValue] = useState("Initial value");

  // to be possible to change the input value by user action
  const setterValue = value => {
    setValue(value);
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
      <Button style={btnStyle} onClick={() => setValue("")}>
        Clear value
      </Button>
      <HvInput labels={labels} value={value} onChange={setterValue} />
    </>
  );
}

export default <WrapperComp />;
