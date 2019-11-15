import React from "react";
import HvInput from "@hv/uikit-react-core/dist/Input";

const labels = {
  placeholder: "Insert text",
  infoText: "Try to write more than 25 characters",
  inputLabel: "Short story of your life"
};

export default (
  <HvInput
    labels={labels}
    inputProps={{
      maxLength: 25
    }}
  />
);
