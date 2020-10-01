import React, { useState } from "react";
import { HvTextArea, HvButton, HvInput } from "../..";

export default {
  title: "Forms/Text Area",
  parameters: {
    componentSubtitle: null,
    usage: "import { HvTextArea } from '@hv/uikit-react-core/dist'",

    dsVersion: "3.2.0",
  },
  component: HvTextArea,
  decorators: [(storyFn) => <div style={{ width: "600px", height: "400px" }}>{storyFn()}</div>],
};

export const Main = () => {
  const labels = {
    inputLabel: "Label",
    placeholder: "Enter value",
  };

  return <HvTextArea labels={labels} id="main" rows={5} />;
};

export const Resizable = () => {
  const labels = {
    inputLabel: "Label",
    placeholder: "Enter value",
  };

  return <HvTextArea labels={labels} id="resize" rows={5} maxCharQuantity={1000} resizable />;
};

Resizable.story = {
  parameters: {
    docs: {
      storyDescription: "Text area that allow resizing.",
    },
  },
};

export const LimitedBlocking = () => {
  const [textLength, setTextLength] = useState(0);

  const labels = {
    inputLabel: "Label",
    placeholder: "Enter value",
    maxCharQuantityWarningText: "too many characters",
  };

  const setCounter = (event, data) => {
    setTextLength(data.length);
    return data;
  };

  return (
    <HvTextArea
      id="limited-blocking"
      initialValue="some text"
      rows={5}
      labels={labels}
      maxCharQuantity={10}
      blockMax
      onChange={setCounter}
      countCharProps={{ "aria-label": `You have inserted ${textLength} characters` }}
    />
  );
};

LimitedBlocking.story = {
  parameters: {
    docs: {
      storyDescription:
        "Text area that limits the quantity of character that can be introduced in the text area.",
    },
  },
};

export const LimitedWithCustomLabels = () => {
  const labels = {
    inputLabel: "Label",
    placeholder: "Enter value",
    middleCount: "of",
    maxCharQuantityWarningText: "too many characters",
    requiredWarningText: "This text area can't be empty",
  };

  return (
    <HvTextArea
      id="limited-custom-label"
      rows={5}
      labels={labels}
      isRequired
      maxCharQuantity={10}
    />
  );
};

LimitedWithCustomLabels.story = {
  parameters: {
    docs: {
      storyDescription: "Text area char count with a custom labels.",
    },
  },
};

export const Disabled = () => {
  const labels = {
    inputLabel: "Label",
    placeholder: "Enter value",
    maxCharQuantityWarningText: "too many characters",
  };

  return <HvTextArea id="disabled" rows={5} labels={labels} maxCharQuantity={1500} disabled />;
};

Disabled.story = {
  parameters: {
    docs: {
      storyDescription: "Text area that does not allows any interaction.",
    },
  },
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
    docs: {
      storyDescription: "Text area value altered from an outside component.",
    },
  },
};

export const customValidation = () => {
  const hasNumber = (value) => /\d/.test(value);
  return (
    <>
      <HvTextArea
        id="custom-validation"
        rows={5}
        labels={{
          inputLabel: "Label",
          placeholder: "Enter value",
          warningText: "This text area has a number",
          maxCharQuantityWarningText: "too many characters",
        }}
        validation={(value) => !hasNumber(value)}
      />
    </>
  );
};

customValidation.story = {
  parameters: {
    docs: {
      storyDescription: "Text area value that can't contain numbers.",
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
    docs: {
      storyDescription: "Text area value altered from an outside component.",
    },
  },
};
