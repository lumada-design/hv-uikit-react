import React from "react";
import HvInput from "@hv/uikit-react-core/dist/Input";

const labels = {
  placeholder: "Insert text",
  infoText: "Look at the browser's developer console to see the event handlers output",
  inputLabel: "Text I will modify"
};

export default (
  <HvInput
    labels={labels}
    onFocus={value => {
      console.log(`my value is ${value}`);
    }}
    onBlur={(value, validationState) => {
      console.log(
        `my value is ${value} and my validation state is ${validationState}`
      );
    }}
    onChange={value => `${value}.`}
  />
);
