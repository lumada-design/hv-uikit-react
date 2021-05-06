import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";

import { HvCheckBox, HvBaseCheckBox } from "../..";

// eslint-disable-next-line react/prop-types
const FlexDecorator = ({ children }) => {
  const useStyles = makeStyles({
    root: {
      display: "flex",
      alignItems: "center",
      flexWrap: "wrap",
      "& > *": {
        margin: "0 10px 5px 0",
      },
    },
  });

  const classes = useStyles();

  return <div className={classes.root}>{children}</div>;
};

export default {
  title: "Forms/Checkbox",
  parameters: {
    componentSubtitle: null,
    usage: 'import { HvCheckBox } from "@hv/uikit-react-core"',
    maturityStatus: "stable",
    dsVersion: "3.4.0",
  },
  component: HvCheckBox,
  subcomponents: { HvBaseCheckBox },
  decorators: [
    (Story) => (
      <FlexDecorator>
        <Story />
      </FlexDecorator>
    ),
  ],
};

export const Main = () => {
  return (
    <>
      <HvCheckBox label="Checkbox 1" />
      <HvCheckBox defaultChecked label="Checkbox 2" />
      <HvCheckBox indeterminate label="Checkbox 3" />
    </>
  );
};

export const Disabled = () => (
  <>
    <HvCheckBox disabled label="Checkbox 1" />
    <HvCheckBox defaultChecked disabled label="Checkbox 2" />
    <HvCheckBox indeterminate disabled label="Checkbox 3" />
  </>
);

Disabled.parameters = {
  docs: {
    description: { story: "Disabled checkboxes." },
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
  <>
    <HvCheckBox readOnly label="Checkbox 1" />
    <HvCheckBox defaultChecked readOnly label="Checkbox 2" />
    <HvCheckBox indeterminate readOnly label="Checkbox 3" />
  </>
);

ReadOnly.parameters = {
  docs: {
    description: { story: "Not editable checkboxes." },
  },
};

export const WithoutLabel = () => (
  <>
    <HvCheckBox aria-label="Checkbox 1" />
    <HvCheckBox defaultChecked aria-label="Checkbox 2" />
    <HvCheckBox indeterminate aria-label="Checkbox 3" />
  </>
);

WithoutLabel.parameters = {
  docs: {
    description:
      "Checkboxes without labels. The accessible name is provided via the `aria-label` property.",
  },
};

export const Required = () => (
  <>
    <HvCheckBox required defaultChecked label="Checkbox 1" />
  </>
);

Required.parameters = {
  docs: {
    description: { story: "Required checkbox. Uncheck to show default error message." },
  },
};

export const Controlled = () => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <>
      <HvCheckBox checked={isChecked} label="Checkbox 1" />
      <HvCheckBox
        checked={isChecked}
        onChange={(_evt, checked) => setIsChecked(checked)}
        label="Checkbox 2"
      />
    </>
  );
};

Controlled.parameters = {
  docs: {
    description:
      "Controlled checkbox. Clicking the Checkbox 1 does nothing, while clicking Checkbox 2 changes both inputs.",
  },
};

export const ErrorMessage = () => (
  <HvCheckBox status="invalid" statusMessage="No way for this to be valid!" label="Checkbox 1" />
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
