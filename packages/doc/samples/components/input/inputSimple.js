import React from "react";
import HvInput from "@hv/uikit-react-core/dist/Input";

const labels = {
  placeholder: "Insert first name",
  infoText: "Please enter your first name",
  inputLabel: "First name",
  warningText: "Error",
  maxCharQuantityWarningText: "Max characters exceeded"
};

export default <HvInput labels={labels} id="input-simple-sample" />;
