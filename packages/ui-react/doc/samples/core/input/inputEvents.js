import React from "react";
import HvInput from "@hv-ui/react/core/Input";

const inputTextConfiguration = {
  placeholder: "Insert text",
  infoText: "Info",
  inputLabel: "Label",
  warningText: "Error",
  maxCharQuantityWarningText: "Max characters exceeded"
};

export default (
  <HvInput
    inputTextConfiguration={inputTextConfiguration}
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
