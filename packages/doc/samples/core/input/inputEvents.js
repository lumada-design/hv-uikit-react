import React from "react";
import HvInput from "@hv/uikit-react-core/dist/Input";

const labels = {
  placeholder: "Insert text",
  infoText: "Info",
  inputLabel: "Label",
  warningText: "Error",
  maxCharQuantityWarningText: "Max characters exceeded"
};

export default (
  <HvInput
    labels={labels}
    onFocus={value => {
      console.log(`my value is ${value}`);
    }}
    onBlur={(value, validationState) => {
      console.log(
        `my value is ${value} and my validation state is ${validationState}`
      );
    }}
    onChange={value => `${value}.`}
  />
);
