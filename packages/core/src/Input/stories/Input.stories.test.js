import React, { useState } from "react";

import { HvButton, HvInput } from "../..";

export default {
  title: "Tests/Input",
  parameters: {
    docs: {
      disable: true,
      page: null
    }
  }
};

// __________________________________
// Extended robot test scenarios

export const ControlledState = () => {
  const [inputValidationState, setInputValidationState] = useState("empty");

  const labels = {
    placeholder: "input",
    inputLabel: "ex. us-east",
    warningText: "this field is required"
  };

  const handleDoneOnClick = () => setInputValidationState("invalid");
  const handleClearOnClick = () => setInputValidationState("empty");

  return (
    <>
      <HvButton
        onClick={() => {
          handleDoneOnClick();
        }}
      >
        Error
      </HvButton>
      <HvButton
        onClick={() => {
          handleClearOnClick();
        }}
      >
        Clear
      </HvButton>

      <HvInput id="validation" labels={labels} isRequired validationState={inputValidationState} />
    </>
  );
};
