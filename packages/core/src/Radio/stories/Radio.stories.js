import React, { useState } from "react";

import { makeStyles, useTheme } from "@material-ui/core/styles";

import { HvRadio, HvBaseRadio } from "../..";
import HvGrid from "../../Grid";

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

export const ExternalErrorMessage = () => {
  const theme = useTheme();

  const [secondRadioStatus, setSecondRadioStatus] = useState("standBy");
  const [firstRadioErrorMessage, setFirstRadioErrorMessage] = useState();

  const [secondRadioErrorMessage, setSecondRadioErrorMessage] = useState(
    "No way for the second radio to be valid!"
  );

  return (
    <HvGrid container>
      <HvGrid item xs={5} container>
        <HvGrid item xs={12}>
          <HvRadio
            status={secondRadioStatus}
            aria-errormessage="firstRadio-error"
            onChange={(_e, checked) => {
              if (checked) {
                setSecondRadioStatus("invalid");
                setFirstRadioErrorMessage("Don't choose the first radio.");
              } else if (!checked) {
                setSecondRadioStatus("valid");
                setFirstRadioErrorMessage(null);
              }
            }}
            label="First Radio"
          />
        </HvGrid>
        <HvGrid item xs={12}>
          <HvRadio
            status="invalid"
            aria-errormessage="secondRadio-error"
            onChange={() => {
              setSecondRadioErrorMessage("No way for the second radio to be valid! I told you!");
            }}
            label="Second Radio"
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
          {firstRadioErrorMessage && (
            <li id="firstRadio-error" aria-live="polite">
              {firstRadioErrorMessage}
            </li>
          )}
          {secondRadioErrorMessage && (
            <li id="secondRadio-error" aria-live="polite">
              {secondRadioErrorMessage}
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
