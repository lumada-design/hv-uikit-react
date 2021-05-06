import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";

import { HvRadio, HvBaseRadio } from "../..";

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
  title: "Forms/Radio Button",
  parameters: {
    componentSubtitle: null,
    usage: 'import { HvRadio } from "@hv/uikit-react-core"',
    maturityStatus: "stable",
    dsVersion: "3.4.0",
  },
  component: HvRadio,
  subcomponents: { HvBaseRadio },
  decorators: [
    (Story) => (
      <FlexDecorator>
        <Story />
      </FlexDecorator>
    ),
  ],
};

export const Main = () => {
  const [checkedValue, setCheckedValue] = useState(null);

  return (
    <>
      <HvRadio
        name="main"
        label="Radio 1"
        value="1"
        checked={checkedValue === "1"}
        onChange={(_evt, _checked, value) => setCheckedValue(value)}
      />
      <HvRadio
        name="main"
        label="Radio 2"
        value="2"
        checked={checkedValue === "2"}
        onChange={(_evt, _checked, value) => setCheckedValue(value)}
      />
    </>
  );
};

export const Disabled = () => {
  const [checkedValue, setCheckedValue] = useState("1");

  return (
    <>
      <HvRadio
        disabled
        name="disabled"
        label="Radio 1"
        value="1"
        checked={checkedValue === "1"}
        onChange={(_evt, _checked, value) => setCheckedValue(value)}
      />
      <HvRadio
        disabled
        name="disabled"
        label="Radio 2"
        value="2"
        checked={checkedValue === "2"}
        onChange={(_evt, _checked, value) => setCheckedValue(value)}
      />
    </>
  );
};

Disabled.parameters = {
  docs: {
    description: { story: "Disabled radio buttons." },
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

export const ReadOnly = () => {
  const [checkedValue, setCheckedValue] = useState("2");

  return (
    <>
      <HvRadio
        readOnly
        name="readonly"
        label="Radio 1"
        value="1"
        checked={checkedValue === "1"}
        onChange={(_evt, _checked, value) => setCheckedValue(value)}
      />
      <HvRadio
        readOnly
        name="readonly"
        label="Radio 2"
        value="2"
        checked={checkedValue === "2"}
        onChange={(_evt, _checked, value) => setCheckedValue(value)}
      />
    </>
  );
};

ReadOnly.parameters = {
  docs: {
    description: { story: "Not editable radio buttons." },
  },
};

export const WithoutLabel = () => {
  const [checkedValue, setCheckedValue] = useState("2");

  return (
    <>
      <HvRadio
        name="nolabel"
        aria-label="Radio 1"
        value="1"
        checked={checkedValue === "1"}
        onChange={(_evt, _checked, value) => setCheckedValue(value)}
      />
      <HvRadio
        name="nolabel"
        aria-label="Radio 2"
        value="2"
        checked={checkedValue === "2"}
        onChange={(_evt, _checked, value) => setCheckedValue(value)}
      />
    </>
  );
};

WithoutLabel.parameters = {
  docs: {
    description:
      "Radio buttons without labels. The accessible name is provided via the `aria-label` property.",
  },
};

export const ErrorMessage = () => (
  <HvRadio status="invalid" statusMessage="No way for this to be valid!" label="Radio 1" />
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
