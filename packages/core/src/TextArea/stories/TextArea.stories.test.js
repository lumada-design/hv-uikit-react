import React, { useState } from "react";
import { HvTextArea, HvButton, HvInput } from "../..";

export default {
  title: "Tests/Text Area",
  parameters: {
    docs: {
      disable: true,
      page: null,
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: "600px", height: "400px" }}>
        <Story />
      </div>
    ),
  ],
};

export const ControlledLimited = () => {
  const [value, setValue] = useState("Initial State");
  const [maxChar, setMaxChar] = useState(10);

  const btnStyle = {
    width: 120,
    marginRight: 20,
  };

  return (
    <>
      <HvButton style={btnStyle} onClick={() => setValue("First value")}>
        First value
      </HvButton>
      <HvButton style={btnStyle} onClick={() => setValue("Second value")}>
        Second value
      </HvButton>
      <HvButton style={btnStyle} onClick={() => setValue("Third value")}>
        Third value
      </HvButton>

      <p />

      <HvInput
        style={{ marginBottom: 30 }}
        value={String(maxChar)}
        onChange={(e, newLimit) => setMaxChar(Number(newLimit))}
        labels={{ inputLabel: "Limit" }}
      />

      <HvTextArea
        id="controlled-limited"
        value={value}
        rows={5}
        labels={{
          inputLabel: "Label",
          placeholder: "Enter value",
          maxCharQuantityWarningText: "too many characters",
        }}
        onChange={(e, newValue) => setValue(newValue)}
        maxCharQuantity={maxChar}
      />
    </>
  );
};

ControlledLimited.story = {
  parameters: {
    v3: true,
    docs: {
      storyDescription: "Text area value altered from an outside component.",
    },
  },
};

export const ControlledValidation = () => {
  const [value, setValue] = useState("Initial State");
  const [validationState, setValidationState] = useState("standBy");

  const btnStyle = {
    width: 120,
    marginRight: 20,
  };

  return (
    <>
      <HvButton style={btnStyle} onClick={() => setValidationState("standBy")}>
        stand by
      </HvButton>
      <HvButton style={btnStyle} onClick={() => setValidationState("invalid")}>
        invalid
      </HvButton>

      <p />

      <HvTextArea
        id="controlled-validation"
        value={value}
        rows={5}
        validationState={validationState}
        labels={{
          inputLabel: "Label",
          placeholder: "Enter value",
          warningText: "This text area is invalid",
          maxCharQuantityWarningText: "too many characters",
        }}
        onChange={(e, newValue) => setValue(newValue)}
      />
    </>
  );
};

ControlledValidation.story = {
  parameters: {
    v3: true,
    docs: {
      storyDescription: "Text area value altered from an outside component.",
    },
  },
};
