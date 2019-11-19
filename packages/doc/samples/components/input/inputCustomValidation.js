import React from "react";
import HvInput from "@hv/uikit-react-core/dist/Input";

const labels = {
  placeholder: "Insert 'hello'",
  infoText: "You must input the text 'hello'",
  inputLabel: "Compliment me",
  warningText: "You didn't write 'hello'"
};

export default (
  <HvInput
    labels={labels} infoIcon
    validation={value => value.includes("hello")}
  />
);
