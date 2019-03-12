import React from "react";
import HvInput from "@hv-ui/react/core/Input";

const numberInputTextConfiguration = {
  placeholder: "Insert a number",
  infoText: "Enter a number",
  inputLabel: "Number",
  warningText: "This is not a number",
  maxCharQuantityWarningText: "Number is too big",
  requiredWarningText: "the number is required"
};

export default (
  <HvInput
    isRequired
    inputTextConfiguration={numberInputTextConfiguration}
    maxCharQuantity={40}
    validationType="number"
  />
);
