import React, { useState } from "react";

import { HvCheckBoxGroup, HvCheckBox } from "../..";

export default {
  title: "Forms/Checkbox Group",
  parameters: {
    componentSubtitle: null,
    usage: "import { HvCheckBoxGroup } from '@hv/uikit-react-core/dist'",
    dsVersion: "3.2.1",
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
    description: "Layout checkboxes horizontally.",
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
    description: "Disabled checkbox group.",
  },
  pa11y: {
    ignore: [
      "region",
      // Text or images of text that are part of an inactive user interface component have no contrast requirement.
      // https://github.com/lumada-design/hv-uikit-react/issues/775#issuecomment-557167364
      "WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Fail",
      "color-contrast",
    ],
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
    description: "Not editable checkbox group.",
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
  <>
    <HvCheckBoxGroup orientation="horizontal" label="Select at least one" required>
      <HvCheckBox label="Checkbox 1" value="1" />
      <HvCheckBox label="Checkbox 2" value="2" checked />
      <HvCheckBox label="Checkbox 3" value="3" />
    </HvCheckBoxGroup>
  </>
);

Required.parameters = {
  docs: {
    description: "Required checkbox group. Uncheck all checkboxes to show default error message.",
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
    description: "Controlled checkbox group.",
  },
};

export const ErrorMessage = () => (
  <HvCheckBoxGroup status="invalid" statusMessage="No way for this to be valid!" label="Choose">
    <HvCheckBox label="Checkbox 1" value="1" />
    <HvCheckBox label="Checkbox 2" value="2" checked />
    <HvCheckBox label="Checkbox 3" value="3" />
  </HvCheckBoxGroup>
);

ErrorMessage.parameters = {
  pa11y: {
    ignore: [
      "region",
      // aria-errormessage value is being reported as invalid because axe-core forces
      // the referenced error element to have aria-live="assertive", when the spec does not
      // https://github.com/dequelabs/axe-core/pull/2590
      "aria-valid-attr-value",
    ],
  },
};
