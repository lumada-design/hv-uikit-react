import React, { useState } from "react";

import { HvRadioGroup, HvRadio } from "../..";

export default {
  title: "Forms/Radio Button Group",
  parameters: {
    componentSubtitle: null,
    usage: 'import { HvRadioGroup } from "@hv/uikit-react-core"',
    maturityStatus: "stable",
    dsVersion: "3.4.0",
  },
  component: HvRadioGroup,
};

export const Main = () => (
  <HvRadioGroup label="Choose your favorite checkboxes" name="favorite">
    <HvRadio label="Radio 1" value="1" />
    <HvRadio label="Radio 2" value="2" checked />
    <HvRadio label="Radio 3" value="3" />
  </HvRadioGroup>
);

export const Horizontal = () => (
  <HvRadioGroup
    orientation="horizontal"
    label="Choose your favorite checkboxes"
    description="Horizontally, this time"
  >
    <HvRadio label="Radio 1" value="1" />
    <HvRadio label="Radio 2" value="2" checked />
    <HvRadio label="Radio 3" value="3" />
  </HvRadioGroup>
);

Horizontal.parameters = {
  docs: {
    description: { story: "Layout checkboxes horizontally." },
  },
};

export const Disabled = () => (
  <HvRadioGroup disabled label="No way to choose" description="They're all disabled">
    <HvRadio label="Radio 1" value="1" />
    <HvRadio label="Radio 2" value="2" checked />
    <HvRadio label="Radio 3" value="3" />
  </HvRadioGroup>
);

Disabled.parameters = {
  docs: {
    description: { story: "Disabled checkbox group." },
  },
};

export const ReadOnly = () => (
  <HvRadioGroup readOnly label="Can't change anything">
    <HvRadio label="Radio 1" value="1" />
    <HvRadio label="Radio 2" value="2" checked />
    <HvRadio label="Radio 3" value="3" />
  </HvRadioGroup>
);

ReadOnly.parameters = {
  docs: {
    description: { story: "Not editable checkbox group." },
  },
};

export const WithoutLabel = () => (
  <HvRadioGroup aria-label="Non-visible label sample">
    <HvRadio label="Radio 1" value="1" />
    <HvRadio label="Radio 2" value="2" checked />
    <HvRadio label="Radio 3" value="3" />
  </HvRadioGroup>
);

WithoutLabel.parameters = {
  docs: {
    description:
      "A checkbox group without label. The accessible name is provided via the `aria-label` property.",
  },
};

export const Controlled = () => {
  const [value, setValue] = useState("2");
  const [status, setStatus] = useState("standBy");

  const handleOnChange = (_evt, newValue) => {
    console.log(newValue);
    setValue(newValue);

    if (newValue === "none") {
      setStatus("invalid");
    } else {
      setStatus("valid");
    }
  };

  return (
    <HvRadioGroup
      label="Choose the best checkbox"
      value={value}
      onChange={handleOnChange}
      status={status}
      statusMessage={'Don\'t select "None"!'}
    >
      <HvRadio label="None" value="none" />
      <HvRadio label="Radio 1" value="1" />
      <HvRadio label="Radio 2" value="2" />
    </HvRadioGroup>
  );
};

Controlled.parameters = {
  docs: {
    description: { story: "Controlled checkbox group." },
  },
};

export const ErrorMessage = () => (
  <HvRadioGroup status="invalid" statusMessage="No way for this to be valid!" label="Choose">
    <HvRadio label="Radio 1" value="1" />
    <HvRadio label="Radio 2" value="2" checked />
    <HvRadio label="Radio 3" value="3" />
  </HvRadioGroup>
);
