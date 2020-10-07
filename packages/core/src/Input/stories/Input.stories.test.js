import React, { useState } from "react";

import { HvButton, HvInput } from "../..";

export default {
  title: "Tests/Input",
  parameters: {
    docs: {
      disable: true,
      page: null,
    },
  },
};

// __________________________________
// Extended robot test scenarios

export const Limited = () => {
  const validationMessages = {
    maxCharError: "Max characters exceeded",
  };

  return (
    <HvInput
      id="limited-input"
      label="Postal code"
      description="Group of letters and numbers added to your address to assist the sorting of mail"
      placeholder="Insert your postal code"
      validationMessages={validationMessages}
      maxCharQuantity={5}
      showValidationIcon
    />
  );
};

export const ControlledState = () => {
  const [inputValidationState, setInputValidationState] = useState("standBy");

  const handleDoneOnClick = () => setInputValidationState("invalid");
  const handleClearOnClick = () => setInputValidationState("standBy");

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

      <HvInput
        id="validation"
        required
        label="ex. us-east"
        placeholder="input"
        status={inputValidationState}
        statusMessage="this field is required"
      />
    </>
  );
};
