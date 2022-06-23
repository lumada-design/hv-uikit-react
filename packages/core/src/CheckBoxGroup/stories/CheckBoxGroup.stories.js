import React, { useState } from "react";

import { HvCheckBoxGroup, HvCheckBox } from "../..";

export default {
  title: "Inputs/Checkbox Group",
  parameters: {
    componentSubtitle: null,
    usage: 'import { HvCheckBoxGroup } from "@hitachivantara/uikit-react-core"',
    dsVersion: "3.6.0",
  },
  component: HvCheckBoxGroup,
};

export const Main = () => (
  <HvCheckBoxGroup id="main" showSelectAll label="Choose your favorite checkboxes" name="favorite">
    <HvCheckBox label="Checkbox 1" value="1" />
    <HvCheckBox label="Checkbox 2" value="2" checked />
    <HvCheckBox label="Checkbox 3" value="3" />
  </HvCheckBoxGroup>
);

export const Horizontal = () => (
  <HvCheckBoxGroup
    orientation="horizontal"
    label="Choose your favorite checkboxes"
    description="Horizontally, this time"
  >
    <HvCheckBox label="Checkbox 1" value="1" />
    <HvCheckBox label="Checkbox 2" value="2" checked />
    <HvCheckBox label="Checkbox 3" value="3" />
  </HvCheckBoxGroup>
);

Horizontal.parameters = {
  docs: {
    description: { story: "Layout checkboxes horizontally." },
  },
};

export const Disabled = () => (
  <HvCheckBoxGroup
    showSelectAll
    disabled
    label="No way to choose"
    description="They're all disabled"
  >
    <HvCheckBox label="Checkbox 1" value="1" />
    <HvCheckBox label="Checkbox 2" value="2" checked />
    <HvCheckBox label="Checkbox 3" value="3" />
  </HvCheckBoxGroup>
);

Disabled.parameters = {
  docs: {
    description: { story: "Disabled checkbox group." },
  },
};

export const ReadOnly = () => (
  <HvCheckBoxGroup id="readonly" showSelectAll readOnly label="Can't change anything">
    <HvCheckBox label="Checkbox 1" value="1" />
    <HvCheckBox label="Checkbox 2" value="2" checked />
    <HvCheckBox label="Checkbox 3" value="3" />
  </HvCheckBoxGroup>
);

ReadOnly.parameters = {
  docs: {
    description: { story: "Not editable checkbox group." },
  },
};

export const WithoutLabel = () => (
  <HvCheckBoxGroup aria-label="Non-visible label sample">
    <HvCheckBox label="Checkbox 1" value="1" />
    <HvCheckBox label="Checkbox 2" value="2" checked />
    <HvCheckBox label="Checkbox 3" value="3" />
  </HvCheckBoxGroup>
);

WithoutLabel.parameters = {
  docs: {
    description:
      "A checkbox group without label. The accessible name is provided via the `aria-label` property.",
  },
};

export const Required = () => (
  <HvCheckBoxGroup orientation="horizontal" label="Select at least one" required>
    <HvCheckBox label="Checkbox 1" value="1" />
    <HvCheckBox label="Checkbox 2" value="2" checked />
    <HvCheckBox label="Checkbox 3" value="3" />
  </HvCheckBoxGroup>
);

Required.parameters = {
  docs: {
    description: {
      story: "Required checkbox group. Uncheck all checkboxes to show default error message.",
    },
  },
};

export const Controlled = () => {
  const [value, setValue] = useState(["2"]);

  const handleOnChange = (_evt, newValue) => {
    console.log(newValue);
    setValue(newValue);
  };

  return (
    <HvCheckBoxGroup
      label="Choose the best checkbox"
      value={value}
      onChange={handleOnChange}
      showSelectAll
    >
      <HvCheckBox label="Checkbox 1" value="1" />
      <HvCheckBox label="Checkbox 2" value="2" />
      <HvCheckBox label="Checkbox 3" value="3" />
    </HvCheckBoxGroup>
  );
};

Controlled.parameters = {
  docs: {
    description: { story: "Controlled checkbox group." },
  },
};

export const ErrorMessage = () => (
  <HvCheckBoxGroup status="invalid" statusMessage="No way for this to be valid!" label="Choose">
    <HvCheckBox label="Checkbox 1" value="1" />
    <HvCheckBox label="Checkbox 2" value="2" checked />
    <HvCheckBox label="Checkbox 3" value="3" />
  </HvCheckBoxGroup>
);

export const ShiftSelect = () => {
  return (
    <HvCheckBoxGroup label="Choose the best checkbox">
      <HvCheckBox label="Checkbox 1" value="1" />
      <HvCheckBox label="Checkbox 2" value="2" />
      <HvCheckBox label="Checkbox 3" value="3" />
      <HvCheckBox label="Checkbox 4" value="4" />
      <HvCheckBox label="Checkbox 5" value="5" />
      <HvCheckBox label="Checkbox 6" value="6" />
    </HvCheckBoxGroup>
  );
};
