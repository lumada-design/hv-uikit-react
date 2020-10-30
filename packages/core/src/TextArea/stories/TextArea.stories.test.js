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
  const validationMessages = {
    maxCharError: "too many characters",
  };

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
        label="Limit"
        value={String(maxChar)}
        onChange={(_e, newLimit) => setMaxChar(Number(newLimit))}
      />

      <HvTextArea
        id="controlled-limited"
        value={value}
        rows={5}
        label="Label"
        placeholder="Enter value"
        validationMessages={validationMessages}
        onChange={(_e, newValue) => setValue(newValue)}
        maxCharQuantity={maxChar}
      />
    </>
  );
};

ControlledLimited.story = {
  parameters: {
    docs: {
      storyDescription: "Text area value altered from an outside component.",
    },
  },
};

export const ControlledValidation = () => {
  const [value, setValue] = useState("Initial State");
  const [validationState, setvalidationState] = useState("standBy");

  const btnStyle = {
    width: 120,
    marginRight: 20,
  };

  return (
    <>
      <HvButton style={btnStyle} onClick={() => setvalidationState("standBy")}>
        stand by
      </HvButton>
      <HvButton style={btnStyle} onClick={() => setvalidationState("invalid")}>
        invalid
      </HvButton>

      <p />

      <HvTextArea
        id="controlled-validation"
        value={value}
        rows={5}
        label="Label"
        placeholder="Enter value"
        status={validationState}
        statusMessage="This text area is invalid"
        onChange={(_e, newValue) => setValue(newValue)}
      />
    </>
  );
};

ControlledValidation.story = {
  parameters: {
    docs: {
      storyDescription: "Text area value altered from an outside component.",
    },
  },
};
