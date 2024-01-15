import React, { useState } from "react";
import { HvTextArea, HvButton, HvInput } from "../..";

export default {
  title: "Components/Text Area",
  parameters: {
    componentSubtitle: null,
    usage: 'import { HvTextArea } from "@hitachivantara/uikit-react-core";',
  },
  component: HvTextArea,
};

export const Main = () => {
  const labels = {
    inputLabel: "Label",
    placeholder: "Enter value",
  };

  return <HvTextArea label="Text Area" labels={labels} id="test" width={610} />;
};

export const Resizable = () => {
  const labels = {
    inputLabel: "Label",
    placeholder: "Enter value",
  };

  return <HvTextArea label="Text Area" labels={labels} id="test" rows={5} resizable />;
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
  };

  const setCounter = (event, data) => {
    setTextLength(data.length);
    return data;
  };

  return (
    <HvTextArea
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
    startCount: "Inserted",
    middleCount: "of",
    endCount: "allowed",
    maxCharQuantityWarningText: "Character quantity exceeded",
  };

  return <HvTextArea rows={5} labels={labels} maxCharQuantity={40} />;
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
  };

  return <HvTextArea label="Text Area" rows={5} labels={labels} maxCharQuantity={1500} disabled />;
};

Disabled.story = {
  parameters: {
    docs: {
      storyDescription: "Text area that does not allows any interaction.",
    },
  },
};

export const Controlled = () => {
  const [value, setValue] = useState("Initial State");

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

      <HvTextArea
        value={value}
        rows={5}
        labels={{ inputLabel: "Label", placeholder: "Enter value" }}
        onChange={(e, newValue) => setValue(newValue)}
      />
    </>
  );
};

Controlled.story = {
  parameters: {
    docs: {
      storyDescription: "Text area value altered from an outside component.",
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
        value={value}
        rows={5}
        labels={{ inputLabel: "Label", placeholder: "Enter value" }}
        onChange={(e, newValue) => setValue(newValue)}
        maxCharQuantity={maxChar}
        blockMax
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

export const RequiredTextArea = () => {
  const labels = {
    inputLabel: "Label",
    placeholder: "Enter value",
    startCount: "Inserted",
    middleCount: "of",
    endCount: "allowed",
  };

  return <HvTextArea rows={5} labels={labels} maxCharQuantity={10} isRequired />;
};

RequiredTextArea.story = {
  parameters: {
    docs: {
      storyDescription: "Text area char count with a custom labels and required input.",
    },
  },
};

export const LimitedOnChange = () => {
  const [value, setValue] = useState("");
  const [validationState, setValidationState] = useState("valid");
  const maxCharQuantity = 10;

  const labels = {
    inputLabel: "Limited area",
    placeholder: "Enter value",
    warningText: "Character limit reached",
  };

  const onChangeHandler = (event, newValue) => {
    newValue.length > maxCharQuantity ? setValidationState("invalid") : setValidationState("valid");
    setValue(newValue);
  };

  return (
    <>
      <HvTextArea
        value={value}
        rows={5}
        labels={labels}
        onChange={onChangeHandler}
        validationState={validationState}
        maxCharQuantity={maxCharQuantity}
      />
    </>
  );
};

LimitedOnChange.story = {
  parameters: {
    docs: {
      storyDescription: "Text area state being controlled from outside.",
    },
  },
};
