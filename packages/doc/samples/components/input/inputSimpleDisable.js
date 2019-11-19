import React from "react";
import HvInput from "@hv/uikit-react-core/dist/Input";

const labels = {
  placeholder: "Insert address",
  infoText: "Provide your street address",
  inputLabel: "Address",
  warningText: "Error",
  maxCharQuantityWarningText: "Max characters exceeded"
};

export default (
  <HvInput labels={labels} disabled />
);
