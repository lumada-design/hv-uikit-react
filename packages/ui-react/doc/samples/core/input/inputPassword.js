import React from "react";
import HvInput from "@hv-ui/react/core/Input";

const passwordInputTextConfiguration = {
  placeholder: "Must have at least 6 character",
  infoText: "Enter your password",
  inputLabel: "password",
  warningText: "wrong password",
  maxCharQuantityWarningText: "Your password has more than 12 characters",
  minCharQuantityWarningText: "Your password has less than 6 characters",
  requiredWarningText: "Your password is required"
};

export default (
  <HvInput
    inputTextConfiguration={passwordInputTextConfiguration}
    validation={value => value === "password"}
    password
    isRequired
    maxCharQuantity={12}
    minCharQuantity={6}
  />
);
