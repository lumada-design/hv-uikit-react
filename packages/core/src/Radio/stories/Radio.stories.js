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
  title: "Components/Forms/Radio Button",
  parameters: {
    componentSubtitle: null,
    usage: "import { HvRadio } from '@hv/uikit-react-core/dist'",
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

Main.story = {
  parameters: {
    v3: true,
  },
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

Disabled.story = {
  parameters: {
    docs: {
      storyDescription: "Disabled radio buttons.",
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
    v3: true,
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

ReadOnly.story = {
  parameters: {
    docs: {
      storyDescription: "Not editable radio buttons.",
    },
    v3: true,
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

WithoutLabel.story = {
  parameters: {
    docs: {
      storyDescription:
        "Radio buttons without labels. The accessible name is provided via the `aria-label` property.",
    },
    v3: true,
  },
};

export const ErrorMessage = () => (
  <HvRadio status="invalid" statusMessage="No way for this to be valid!" label="Radio 1" />
);

ErrorMessage.story = {
  parameters: {
    pa11y: {
      ignore: [
        "region",
        // aria-errormessage value is being reported as invalid, but the references an existing ID
        "aria-valid-attr-value",
      ],
    },
    v3: true,
  },
};
