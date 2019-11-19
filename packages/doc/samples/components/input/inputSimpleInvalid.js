import React from "react";
import HvInput from "@hv/uikit-react-core/dist/Input";

const labels = {
  placeholder: "Insert last name",
  infoText: "Please enter your last name",
  inputLabel: "Last name",
  warningText: "This is invalid just because I said so",
  maxCharQuantityWarningText: "Max characters exceeded"
};

export default <HvInput labels={labels} initialValue="Not a name!" validationState="invalid" />;
