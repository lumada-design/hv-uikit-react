import React from "react";
import HvInput from "@hv/uikit-react-core/dist/Input";

const labels = {
  placeholder: "Insert a number",
  infoText: "Enter a number",
  inputLabel: "Number",
  warningText: "This is not a number",
  maxCharQuantityWarningText: "Number is too big",
  requiredWarningText: "the number is required"
};

export default (
  <HvInput
    labels={labels}
    maxCharQuantity={5}
    validationType="number"
  />
);
