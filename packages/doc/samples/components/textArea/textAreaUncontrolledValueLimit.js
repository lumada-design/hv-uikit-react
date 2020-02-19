import React, { useState } from "react";
import HvTextArea from "@hv/uikit-react-core/dist/TextArea";
import Button from "@hv/uikit-react-core/dist/Button";
import Input from "@hv/uikit-react-core/dist/Input";

const labels = {
  inputLabel: "Label",
  placeholder: "Enter value"
};

const btnStyle = {
  width: "130px",
  height: "32px",
  margin: "0 10px 30px 0"
};

const inpStyle = {
  marginBottom: "30px"
};

const inputLabels = {
  inputLabel: "Limit"
};

function WrapperComp() {
  const [value, setValue] = useState();
  const [maxChar, setMaxChar] = useState(10);

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

      <Input
        style={inpStyle}
        initialValue={maxChar.toString()}
        onChange={value => setMaxChar(parseInt(value))}
        labels={inputLabels}
      />

      <HvTextArea
        initialValue={"Initial State"}
        value={value}
        rows={5}
        labels={labels}
        onChange={setterValue}
        maxCharQuantity={maxChar}
      />
    </>
  );
}

export default <WrapperComp />;
