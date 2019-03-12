import React from "react";
import HvInput from "@hv-ui/react/core/Input";

const emailInputTextConfiguration = {
  placeholder: "example@domain.com",
  infoText: "Enter your email",
  inputLabel: "Email",
  warningText:
    "please add the right email format: your.name@hitachivantara.com",
  maxCharQuantityWarningText: "Max characters exceeded"
};

export default (
  <HvInput
    inputTextConfiguration={emailInputTextConfiguration}
    validationType="email"
    validationState="invalid"
    value="wrong"
  />
);
