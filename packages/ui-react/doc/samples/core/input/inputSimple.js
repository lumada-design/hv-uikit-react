import React from "react";
import HvInput from "@hv-ui/react/core/Input";

const inputTextConfiguration = {
  placeholder: "Insert text",
  infoText: "Info",
  inputLabel: "Label",
  warningText: "Error",
  maxCharQuantityWarningText: "Max characters exceeded"
};

export default <HvInput inputTextConfiguration={inputTextConfiguration} />;
