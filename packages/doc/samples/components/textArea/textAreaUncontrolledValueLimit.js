import React, { useState } from "react";
import HvTextArea from "@hv/uikit-react-core/dist/TextArea";
import Button from "@hv/uikit-react-core/dist/Button";
import Input from "@hv/uikit-react-core/dist/Input";

const btnStyle = {
  width: "130px",
  height: "32px",
  margin: "0 10px 30px 0"
};

function WrapperComp() {
  const [value, setValue] = useState("Initial State");
  const [maxChar, setMaxChar] = useState(10);

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
        style={{ marginBottom: 30 }}
        value={String(maxChar)}
        onChange={(e, newLimit) => setMaxChar(Number(newLimit))}
        labels={{ inputLabel: "Limit" }}
      />

      <HvTextArea
        value={value}
        rows={5}
        labels={{ inputLabel: "Label", placeholder: "Enter value" }}
        onChange={(e, newValue) => setValue(newValue)}
        maxCharQuantity={maxChar}
      />
    </>
  );
}

export default <WrapperComp />;
