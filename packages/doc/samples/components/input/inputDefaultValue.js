import React from "react";
import HvInput from "@hv/uikit-react-core/dist/Input";

const labels = {
  placeholder: "example@domain.com",
  infoText: "Enter your email",
  inputLabel: "Email",
  warningText:
    "please add the right email format: your.name@hitachivantara.com",
  maxCharQuantityWarningText: "Max characters exceeded"
};

export default (
  <HvInput
    labels={labels}
    validationType="email"
    initialValue="example@exam.com"
  />
);
