import React from "react";
import HvInput from "@hv/uikit-react-core/dist/Input";

const labels = {
  placeholder: "Insert a number",
  infoText: "Enter a numeric value",
  inputLabel: "Height",
  warningText: "Value is not a number",
  maxCharQuantityWarningText: "Number is too big",
  requiredWarningText: "The number is required"
};

export default <HvInput isRequired labels={labels} maxCharQuantity={5} validationType="number" />;
