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
    validation={value => value.includes("hello")}
  />
);
