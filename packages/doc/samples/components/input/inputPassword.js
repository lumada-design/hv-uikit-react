import React from "react";
import HvInput from "@hv/uikit-react-core/dist/Input";

const labels = {
  placeholder: "Must have at least 6 character",
  infoText: "Enter your password",
  inputLabel: "Password",
  warningText: "Wrong password",
  maxCharQuantityWarningText: "Your password has more than 12 characters",
  minCharQuantityWarningText: "Your password has less than 6 characters",
  requiredWarningText: "Your password is required"
};

export default (
  <HvInput
    labels={labels}
    validation={value => value === "password"}
    password
    isRequired
    maxCharQuantity={12}
    minCharQuantity={6}
  />
);
