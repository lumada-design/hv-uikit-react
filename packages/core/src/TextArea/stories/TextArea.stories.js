import React, { useEffect, useState } from "react";
import { HvTextArea, HvTypography } from "../..";

export default {
  title: "Components/Inputs/Text Area",
  parameters: {
    componentSubtitle: null,
    usage: 'import { HvTextArea } from "@hitachivantara/uikit-react-core"',
    dsVersion: "3.6.0",
  },
  component: HvTextArea,
  decorators: [(storyFn) => <div style={{ width: "600px" }}>{storyFn()}</div>],
};

export const Main = () => <HvTextArea id="main" label="Label" placeholder="Enter value" rows={5} />;

export const LimitedWithCustomLabels = () => {
  const validationMessages = {
    requiredError: "This text area can't be empty",
    maxCharError: "too many characters",
  };

  return (
    <HvTextArea
      id="limited-custom-label"
      rows={5}
      label="Label"
      description="You can write past the limit"
      placeholder="Enter value"
      middleCountLabel="of"
      validationMessages={validationMessages}
      required
      maxCharQuantity={10}
    />
  );
};

LimitedWithCustomLabels.parameters = {
  docs: {
    description: { story: "Text area char count with a custom labels." },
  },
};

export const LimitedBlocking = () => {
  const validationMessages = {
    requiredError: "This text area can't be empty",
    maxCharError: "too many characters",
  };

  const [textLength, setTextLength] = useState(0);

  const setCounter = (event, data) => {
    setTextLength(data.length);
    return data;
  };

  return (
    <HvTextArea
      id="limited-blocking"
      defaultValue="some text"
      rows={5}
      label="Label"
      placeholder="Enter value"
      maxCharQuantity={10}
      blockMax
      onChange={setCounter}
      validationMessages={validationMessages}
      countCharProps={{ "aria-label": `You have inserted ${textLength} characters` }}
    />
  );
};

LimitedBlocking.parameters = {
  docs: {
    description: {
      story:
        "Text area that limits the quantity of character that can be introduced in the text area.",
    },
  },
};

export const Resizable = () => (
  <HvTextArea
    id="resize"
    label="Label"
    placeholder="Enter value"
    rows={5}
    maxCharQuantity={1000}
    resizable
  />
);

Resizable.parameters = {
  docs: {
    story: "Text area that allow resizing.",
  },
};

export const Disabled = () => (
  <HvTextArea
    id="disabled"
    rows={5}
    label="Label"
    placeholder="Enter value"
    maxCharQuantity={1500}
    disabled
  />
);

Disabled.parameters = {
  docs: {
    description: { story: "Text area that does not allows any interaction." },
  },
};

export const ReadOnly = () => (
  <HvTextArea
    readOnly
    rows={5}
    label="Label"
    placeholder="Enter value"
    defaultValue="You can't change this..."
  />
);

ReadOnly.parameters = {
  docs: {
    story: "Not editable text area.",
  },
};

export const WithoutLabel = () => (
  <HvTextArea aria-label="The label" placeholder="Enter value" rows={5} />
);

WithoutLabel.parameters = {
  docs: {
    story:
      "Text area without label. The accessible name is provided via the `aria-label` property.",
  },
};

export const CustomValidation = () => {
  const validationMessages = {
    error: "This text area has a number",
    maxCharError: "too many characters",
  };

  const hasNumber = (value) => /\d/.test(value);
  return (
    <HvTextArea
      id="custom-validation"
      rows={5}
      label="Label"
      placeholder="Enter value"
      validationMessages={validationMessages}
      validation={(value) => !hasNumber(value)}
    />
  );
};

CustomValidation.parameters = {
  docs: {
    description: { story: "Text area value that can't contain numbers." },
  },
};

export const AutoScroll = () => {
  const [value, setValue] = useState("");

  useEffect(() => {
    let idx = 1;
    let newline;
    const id = setInterval(() => {
      newline = idx === 1 ? "" : "\n";
      setValue((val) => `${val}${newline}${idx}: ${Math.random()}`);
      idx += 1;
    }, 2000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <HvTypography variant="xxsTitle">Description:</HvTypography>
      <HvTypography>
        Autoscrolling textarea. It should be automatically scrolled down until the user scrolls up
        at which point the automatic scrolling stops. It will resume as soon as the user scrolls
        fully to the bottom again.
      </HvTypography>
      <br />
      <HvTypography variant="xxsTitle">Example:</HvTypography>
      <br />
      <HvTextArea
        id="custom-validation"
        rows={5}
        label="Logs"
        placeholder="Enter value"
        autoScroll
        value={value}
      />
    </>
  );
};

AutoScroll.parameters = {
  docs: {
    description: { story: "Text area with autoscroll." },
  },
  eyes: { include: false },
};
