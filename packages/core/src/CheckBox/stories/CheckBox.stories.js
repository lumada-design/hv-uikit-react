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
  title: "Components/Forms/Checkbox",
  parameters: {
    componentSubtitle: null,
    usage: "import { HvCheckBox } from '@hv/uikit-react-core/dist'",
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

Main.story = {
  parameters: {
    v3: true,
  },
};

export const Disabled = () => (
  <>
    <HvCheckBox disabled label="Checkbox 1" />
    <HvCheckBox defaultChecked disabled label="Checkbox 2" />
    <HvCheckBox indeterminate disabled label="Checkbox 3" />
  </>
);

Disabled.story = {
  parameters: {
    docs: {
      storyDescription: "Disabled checkboxes.",
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

export const ReadOnly = () => (
  <>
    <HvCheckBox readOnly label="Checkbox 1" />
    <HvCheckBox defaultChecked readOnly label="Checkbox 2" />
    <HvCheckBox indeterminate readOnly label="Checkbox 3" />
  </>
);

ReadOnly.story = {
  parameters: {
    docs: {
      storyDescription: "Not editable checkboxes.",
    },
    v3: true,
  },
};

export const WithoutLabel = () => (
  <>
    <HvCheckBox inputProps={{ "aria-label": "Checkbox 1" }} />
    <HvCheckBox defaultChecked inputProps={{ "aria-label": "Checkbox 2" }} />
    <HvCheckBox indeterminate inputProps={{ "aria-label": "Checkbox 3" }} />
  </>
);

WithoutLabel.story = {
  parameters: {
    docs: {
      storyDescription:
        "A checkboxes without labels. The accessible name is provided via the `aria-label` property in `inputProps`.",
    },
    v3: true,
  },
};

export const Required = () => (
  <>
    <HvCheckBox required defaultChecked label="Checkbox 1" />
  </>
);

Required.story = {
  parameters: {
    docs: {
      storyDescription: "Required checkbox. Uncheck to show default error message.",
    },
    v3: true,
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

Controlled.story = {
  parameters: {
    docs: {
      storyDescription:
        "Controlled checkbox. Clicking the Checkbox 1 does nothing, while clicking Checkbox 2 changes both inputs.",
    },
    v3: true,
  },
};

export const ErrorMessage = () => (
  <HvCheckBox status="invalid" statusMessage="No way for this to be valid!" label="Checkbox 1" />
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
