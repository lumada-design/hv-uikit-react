import React, { useState } from "react";

import { makeStyles, useTheme } from "@material-ui/core/styles";

import { HvCheckBox, HvBaseCheckBox, HvGrid } from "../..";

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
  title: "Inputs/Checkbox",
  parameters: {
    componentSubtitle: null,
    usage: 'import { HvCheckBox } from "@hitachivantara/uikit-react-core"',
    dsVersion: "3.6.0",
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

export const Required = () => <HvCheckBox required defaultChecked label="Checkbox 1" />;

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

export const ExternalErrorMessage = () => {
  const theme = useTheme();

  const [firstCheckboxErrorMessage, setFirstCheckboxErrorMessage] = useState(null);
  const [secondCheckboxErrorMessage, setSecondCheckboxErrorMessage] = useState(
    "No way for the second checkbox to be valid!"
  );

  return (
    <HvGrid container>
      <HvGrid item xs={5} container>
        <HvGrid item xs={12}>
          <HvCheckBox
            required
            defaultChecked
            aria-errormessage="firstCheckbox-error"
            onChange={(_e, checked) => {
              if (checked) {
                setFirstCheckboxErrorMessage(null);
              } else if (!checked) {
                setFirstCheckboxErrorMessage("You must check the first checkbox");
              }
            }}
            label="First Checkbox"
          />
        </HvGrid>
        <HvGrid item xs={12}>
          <HvCheckBox
            status="invalid"
            aria-errormessage="secondCheckbox-error"
            onChange={() => {
              setSecondCheckboxErrorMessage(
                "No way for the second checkbox to be valid! I told you!"
              );
            }}
            label="Second Checkbox"
          />
        </HvGrid>
      </HvGrid>
      <HvGrid
        item
        xs={7}
        style={{
          backgroundColor: theme.hv.palette.semantic.sema9,
          color: theme.hv.palette.base.base2,
        }}
      >
        <h4>Form errors:</h4>
        <ul>
          {firstCheckboxErrorMessage && (
            <li id="firstCheckbox-error" aria-live="polite">
              {firstCheckboxErrorMessage}
            </li>
          )}
          {secondCheckboxErrorMessage && (
            <li id="secondCheckbox-error" aria-live="polite">
              {secondCheckboxErrorMessage}
            </li>
          )}
        </ul>
      </HvGrid>
    </HvGrid>
  );
};

ExternalErrorMessage.parameters = {
  docs: {
    description: {
      story:
        "A form element can be invalid but render its error message elsewhere. For instance if a business rule error relates to the combination of two or more fields, or if we want to display all the form errors together in a summary section. The [aria-errormessage](https://w3c.github.io/aria/#aria-errormessage) property should reference another element that contains error message text. It can be used when controlling the validation status or when relying on the built-in validations, but the message text computation is reponsability of the app.",
    },
  },
};
