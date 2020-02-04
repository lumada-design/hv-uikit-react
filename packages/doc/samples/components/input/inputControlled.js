import React, { useState } from "react";
import HvInput from "@hv/uikit-react-core/dist/Input";

const labels = {
  inputLabel: "Label",
  placeholder: "Enter value"
};

function WrapperComp() {
  const [value, setValue] = useState("Initial value");

  return (
    <HvInput
      id="inputControlled"
      labels={labels}
      inputValue={value}
      onChange={value => setValue(value)}
    />
  );
}

export default <WrapperComp />;
